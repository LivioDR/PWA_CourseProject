import { filterPokemonMovesByLevel, getPokemonData, getStatsForLevel } from './getPokemonData'


const maxPokemonNumber = 151

const getRandomPokemonId = () => {
    let id = 132
    while(id == 132){
        id = Math.ceil(Math.random() * maxPokemonNumber)
    }
    return id
}

const getRivalPokemonData = async(level) => {
    const id = getRandomPokemonId()
    let pokemonData = await getPokemonData(id)
    pokemonData = filterPokemonMovesByLevel(pokemonData, level)
    pokemonData.baseStats = getStatsForLevel(pokemonData.baseStats, level)
    pokemonData.level = Math.floor(Math.random() * (level - 10)) + 10 // randomizing the enemy level to make it more accessible

    // Reducing the number of possible attacks to 4 or less
    if(pokemonData.moves.length > 4){
        let movesIndexes = []
        do{
            const index = Math.floor(Math.random() * pokemonData.moves.length)
            if(!movesIndexes.includes(index))
                movesIndexes.push(index)
        }
        while(movesIndexes.length < 4)
        pokemonData.moves = [pokemonData.moves[movesIndexes[0]], pokemonData.moves[movesIndexes[1]], pokemonData.moves[movesIndexes[2]], pokemonData.moves[movesIndexes[3]]]
    }
    // adding STAB to the rival moves
    for(let i=0; i<pokemonData.moves.length; i++){
        if(pokemonData.types.includes(pokemonData.moves[i].type)){
            pokemonData.moves[i].power *= 1.5
        }
    }

    return pokemonData
}
export default getRivalPokemonData