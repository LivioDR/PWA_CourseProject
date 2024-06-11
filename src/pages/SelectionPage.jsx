'use client'
import PokeCardContainer from "@/components/PokeCardContainer/PokeCardContainer"
import React, { useState } from "react"

const SelectionPage = () => {
    const [selectedPokemon, setSelectedPokemon] = useState(0)
    const [pokemonData, setPokemonData] = useState({})

    const placeholder = [
        {
            id: 1,
            name: 'bulbasaur',
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/1.gif',
            level: 15,
            exp: 2400,
        },
        {
            id: 4,
            name: 'charmander',
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/4.gif',
            level: 5,
            exp: 150,
        },
        {
            id: 7,
            name: 'squirtle',
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/7.gif',
            level: 17,
            exp: 3500,
        },
        {
            id: 25,
            name: 'pikachu',
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif',
            level: 25,
            exp: 12000,
        }
    ]



    return(
        <>
            <PokeCardContainer selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} pokeList={placeholder} setPokemonData={setPokemonData}/>
        </>
    )
}
export default SelectionPage