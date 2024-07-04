const getPokemonStats = (data) => {
    
    let statsToStore = {

    }

    for(let i=0; i<data.length; i++){
        let name = data[i].stat.name
        let value = data[i].base_stat
        switch(name){
            case 'hp': {
                name = 'Hp'
                break
            }
            case 'attack': {
                name = 'Atk'
                break
            }
            case 'defense' : {
                name = 'Def'
                break
            }
            case 'special-attack' : {
                name = 'SpA'
                break
            }
            case 'special-defense': {
                name = "SDf"
                break
            }
            case 'speed': {
                name = 'Spd'
                break
            }
        }
        statsToStore[name] = value
    }
    statsToStore.MaxHp = statsToStore.Hp
    
    return statsToStore

}

const getStatsForLevel = (baseStats, level) => {
    let newStats = {}
    for(const key of Object.keys(baseStats))[
        newStats[key] = Math.round((baseStats[key]) + (baseStats[key] * (level / 50)))
    ]
    return newStats
}

const getAttackInfo = async(atkUrl, lang = 'en') => {
    try{
        let data = await fetch(atkUrl).then(res => res.json())
        let attackData = {
            accuracy: data.accuracy == null ? 100 : data.accuracy,
            name: data.names.filter(names => names.language.name == lang),
            power: data.power,
            pp: data.pp,
            id: atkUrl.split("move/")[1].split("/")[0],
            damage: data.damage_class.name,
            type: data.type.name,
        }
        return attackData
    }
    catch(e){
        console.error(e)
        return {}
    }
}

const getPokemonAttacksFromAllMoves = async(moves) => {
    let attacks = []
    for(let i=0; i<moves.length; i++){
        const url = moves[i].move.url
        let attackData = await getAttackInfo(url)
        if(attackData.power > 0){
            attacks.push({
                id: attackData.id,
                accuracy: attackData.accuracy,
                name: attackData.name[0].name,
                power: attackData.power,
                pp: attackData.pp,
                maxPp: attackData.pp,
                damage: attackData.damage,
                type: attackData.type,
                label: `${attackData.name[0].name} | Type: ${attackData.damage == 'physical' ? String.fromCodePoint('0x1F4A5') : String.fromCodePoint('0x1F300')} | Power: ${attackData.power} | ${String.fromCodePoint('0x1F3AF')} ${attackData.accuracy}%`,
                minLevel: moves[i].version_group_details[0].level_learned_at,
            })
        }
    }
    attacks.sort((a,b) => a.name < b.name ? -1 : 1)

    return attacks
}

const getPokemonCry = async(id) => {
    let result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(res => res.json())
    return result.cries.latest

}


const getPokemonData = async(pokemonId) => {

    let result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`).then(res => res.json())
    const image = result.sprites.other.showdown.front_default
    const imageBack = result.sprites.other.showdown.back_default
    const cry = new Audio(result.cries.latest)

    const stats = getPokemonStats(result.stats)
    const moves = await getPokemonAttacksFromAllMoves(result.moves)

    const pokeData = {
        id: pokemonId,
        front_image: image,
        back_image: imageBack,
        cry: result.cries.latest,
        moves: moves,
        baseStats: stats,
        // level: Math.round(Math.random() * 100),
        // stats: getStatsForLevel(stats, Math.round(Math.random() * 100))
    }

    return pokeData
}

const filterPokemonMovesByLevel = (pokemonData, level) => {
    let moves = [...pokemonData.moves]
    moves.filter(move => move.minLevel <= level)
    pokemonData = {
        ...pokemonData,
        moves: moves}
    return pokemonData
}


export {getPokemonData, getPokemonStats, getPokemonAttacksFromAllMoves, getPokemonCry, filterPokemonMovesByLevel}