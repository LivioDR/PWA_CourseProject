'use client'
import battleSequence from "./battleLogic.js"

const setImagesOnBattleground = () => {
    const myPokemonData = JSON.parse(localStorage.getItem('pokemonData'))
    const rivalPokemonData = JSON.parse(localStorage.getItem('rivalPokemonData'))

    const myPokeImg = document.getElementById('myPokeBattleImg')
    const rivalPokeImg = document.getElementById('rivalPokeBattleImg')

    myPokeImg.src = myPokemonData.sprites.other.showdown.back_default
    rivalPokeImg.src = rivalPokemonData.sprites.other.showdown.front_default
}

const hideSelectionAndShowBattle = () => {
    const selectScreen = document.getElementById('teamsContainer')
    const battleScreen = document.getElementById('battleScreen')

    selectScreen.style.display = 'none'
    battleScreen.style.display = 'block'
}

const getStatsAndMovesForBattle = () => {
    let myPokemonMoves = []
    let rivalPokemonMoves = []

    let myPokemonTypes = []
    let rivalPokemonTypes = []

    const myPokemonData = JSON.parse(localStorage.getItem('pokemonData')).types
    const rivalPokemonData = JSON.parse(localStorage.getItem('rivalPokemonData')).types
    
    for(let i=0; i<myPokemonData.length; i++){
        myPokemonTypes.push(myPokemonData[i].type.name)
    }
    for(let i=0; i<rivalPokemonData.length; i++){
        rivalPokemonTypes.push(rivalPokemonData[i].type.name)
    }

    const myMovesDropdowns = document.querySelectorAll('.attack-dropdown')
    const rivalMovesDropdowns = document.querySelectorAll('.rival-attack-dropdown')

    const myAvailableMoves = JSON.parse(localStorage.getItem('attacks'))
    const rivalAvailableMoves = JSON.parse(localStorage.getItem('rivalAttacks'))

    for(let i=0; i<myMovesDropdowns.length; i++){
        const myPokeMoveId = myMovesDropdowns[i].selectedOptions[0].id
        const rivalMoveId = rivalMovesDropdowns[i].selectedOptions[0].id

        myPokemonMoves.push(...myAvailableMoves.filter(move => move.id == myPokeMoveId))
        rivalPokemonMoves.push(...rivalAvailableMoves.filter(move => move.id == rivalMoveId))
        
        if(myPokemonTypes.includes(myPokemonMoves[i].type)){
            myPokemonMoves[i].stab = 1.5
        }
        else{
            myPokemonMoves[i].stab = 1
        }

        if(rivalPokemonTypes.includes(rivalPokemonMoves[i].type)){
            rivalPokemonMoves[i].stab = 1.5
        }
        else{
            rivalPokemonMoves[i].stab = 1
        }
    }
    localStorage.setItem('attacks',JSON.stringify(myPokemonMoves))
    localStorage.setItem('rivalAttacks',JSON.stringify(rivalPokemonMoves))
    
    setImagesOnBattleground()
    hideSelectionAndShowBattle()

    battleSequence()
    
}
export default getStatsAndMovesForBattle