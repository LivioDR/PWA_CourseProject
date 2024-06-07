const setPokemonStats = (data, team = 'myTeam') => {
    
    let statsContainer
    let statsPlaceholder
    
    if(team == 'myTeam'){
        statsContainer = document.getElementById('stats')
        statsPlaceholder = document.getElementById('statsPlaceholder')   
    }
    else{
        statsContainer = document.getElementById('rivalStats')
        statsPlaceholder = document.getElementById('rivalStatsPlaceholder')
    }
    statsContainer.hidden = false
    statsPlaceholder.hidden = true
    
    let statsToStore = {

    }

    let maxStat = Math.max(...data.map(stat => stat.base_stat))
    
    statsContainer.innerHTML = ''
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

        statsContainer.innerHTML += `<div style="display:flex;flex-direction:row;justify-content:space-between;align-items:center;">
        <p style="font-size: 0.5em; width:10%;">${name}</p>
        <div style="width:80%;">
        <div style="height:0.5em;width:${(100*value)/maxStat}%;background-color:hsl(${(value/maxStat)*100}deg 60% 45%);"></div>
        </div>
        <p style="width: 5%; font-size: 0.5em;">${value}</p>
        </div>`
    }
    statsToStore.MaxHp = statsToStore.Hp
    localStorage.setItem(team == 'myTeam' ? 'stats' : 'rivalStats',JSON.stringify(statsToStore))
}

const getAttackInfo = async(atkUrl, lang = 'en') => {
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

const clearPokemonAttacks = (team = 'myTeam', initialClear = false) => {
    let arrayOfDropdowns = []
    if(team == 'myTeam'){
        arrayOfDropdowns = document.querySelectorAll('.attack-dropdown')
    }
    else{
        arrayOfDropdowns = document.querySelectorAll('.rival-attack-dropdown')
    }
    for(let i=0; i<arrayOfDropdowns.length; i++){
        if(initialClear){
            arrayOfDropdowns[i].innerHTML = ''    
        }
        else{
            arrayOfDropdowns[i].innerHTML = '<option>Loading...</option>'
        }
        arrayOfDropdowns[i].disabled = true
    }
}

const setPokemonAttacks = async(moves, team = 'myTeam') => {
    let arrayOfDropdowns
    if(team == 'myTeam'){
        arrayOfDropdowns = document.querySelectorAll('.attack-dropdown')
    }
    else{
        arrayOfDropdowns = document.querySelectorAll('.rival-attack-dropdown')
    }
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
                label: `${attackData.damage == 'physical' ? '&#128165;' : '&#127744;'} ${attackData.name[0].name} (POW: ${attackData.power})`,
            })
        }
    }
    attacks.sort((a,b) => a.name < b.name ? -1 : 1)

    localStorage.setItem(team == 'myTeam' ? 'attacks' : 'rivalAttacks',JSON.stringify(attacks))
    
    let options = attacks.map(atk => `<option key=${atk.id} id=${atk.id} value=${atk.power}>${atk.label}</option>`)

    for(let i=0; i<arrayOfDropdowns.length; i++){
        arrayOfDropdowns[i].innerHTML = options
        arrayOfDropdowns[i].disabled = false
        if(arrayOfDropdowns[i].options.length > 0){
            arrayOfDropdowns[i].options[Math.floor(Math.random()*arrayOfDropdowns[i].options.length)].selected = true
        }
        else{
            enableBattleButton(false)
            const errorLabel = document.getElementById('errorLabel')
            errorLabel.innerText = "Pokemon Not Available"
        }
    }
}


const getPokemonData = async() => {

    const errorLabel = document.getElementById('errorLabel')
    errorLabel.innerText = ''

    clearPokemonAttacks()
    enableBattleButton(false)

    const pokemonName = document.getElementById('pokemon').value
    localStorage.setItem('pokemon',pokemonName)
    let result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`).then(res => res.json())
    localStorage.setItem('pokemonData',JSON.stringify(result))
    const placeholder = document.getElementById('spritePlaceholder')
    placeholder.hidden = true
    const img = document.getElementById('pokeSprite')
    img.src = result.sprites.other.showdown.front_default
    img.hidden = false
    img.alt = pokemonName


    const cry = new Audio(result.cries.latest)
    cry.play()

    setPokemonStats(result.stats)
    await setPokemonAttacks(result.moves)
    if(!(!result.moves) && result.moves.length > 0 && errorLabel.innerText == ''){
        enableBattleButton(true)
    }
    else{
        enableBattleButton(false)
        errorLabel.innerText = "Pokemon Not Available"
    }
}

const getRivalPokemonData = async() => {

    clearPokemonAttacks('rivalTeam')
    enableBattleButton(false)

    const pokemonName = document.getElementById('rivalPokemon').value
    localStorage.setItem('rivalPokemon',pokemonName)
    let result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`).then(res => res.json())
    localStorage.setItem('rivalPokemonData',JSON.stringify(result))
    const placeholder = document.getElementById('spriteRivalPlaceholder')
    placeholder.hidden = true
    const img = document.getElementById('rivalPokeSprite')
    img.src = result.sprites.other.showdown.front_default
    img.hidden = false
    img.alt = pokemonName


    const cry = new Audio(result.cries.latest)
    cry.play()

    setPokemonStats(result.stats, 'rivalTeam')
    await setPokemonAttacks(result.moves, 'rivalTeam')
    enableBattleButton(true)
}

const enableBattleButton = (enable) => {
    if(enable){
        if(localStorage.getItem('pokemon').length > 0 && localStorage.getItem('rivalPokemon').length > 0 && JSON.parse(localStorage.getItem('attacks')).length > 0  && JSON.parse(localStorage.getItem('rivalAttacks')).length > 0 ){
            document.getElementById('startBattleBtn').disabled = false
        }
    }
    else{
        document.getElementById('startBattleBtn').disabled = true
        document.getElementById('errorLabel').innerHTML = ''
    }
}

export {getPokemonData, getRivalPokemonData, clearPokemonAttacks}