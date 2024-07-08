'use client'
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton"
import PokeCardContainer from "@/components/PokeCardContainer/PokeCardContainer"
import React, { useEffect, useState } from "react"

const SelectionPage = ({pokemonData, setPokemonData, nextPage}) => {
    const [selectedPokemon, setSelectedPokemon] = useState(0)
    const [isDataReady, setIsDataReady] = useState(false)

    useEffect(()=>{
        console.log("Selection page log of pokemon data:",pokemonData)
    },[pokemonData])


    const placeholder = [
        {
            id: 2,
            name: 'ivysaur',
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/2.gif',
            level: 25,
            exp: 12000,
        },
        {
            id: 5,
            name: 'charmeleon',
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/5.gif',
            level: 25,
            exp: 12000,
        },
        {
            id: 8,
            name: 'wartortle',
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/8.gif',
            level: 25,
            exp: 12000,
        },
        {
            id: 25,
            name: 'pikachu',
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif',
            level: 25,
            exp: 12000,
        },
        {
            id: 150,
            name: 'mewtwo',
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/150.gif',
            level: 50,
            exp: 125000,
        }
    ]



    return(
        <div style={{margin: '0 auto', width: '80%'}}>
            <PokeCardContainer selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} setIsDataReady={setIsDataReady} pokeList={placeholder} setPokemonData={setPokemonData}/>
            { 
            selectedPokemon !== 0 &&            
            <ConfirmButton route={nextPage} ready={isDataReady}/>
            }
        </div>
    )
}
export default SelectionPage