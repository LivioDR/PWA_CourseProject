'use client'
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton"
import PokeCardContainer from "@/components/PokeCardContainer/PokeCardContainer"
import React, { useEffect, useState } from "react"

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
        id: 496,
        name: 'servine',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/496.gif',
        level: 25,
        exp: 12000,
    },
    {
        id: 256,
        name: 'combusken',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/256.gif',
        level: 25,
        exp: 12000,
    },
    {
        id: 259,
        name: 'marshtomp',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/259.gif',
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
        id: 10100,
        name: 'raichu-alola',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/10100.gif',
        level: 25,
        exp: 12000,
    },
    {
        id: 133,
        name: 'eevee',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/133.gif',
        level: 25,
        exp: 12000,
    },
    {
        id: 471,
        name: 'glaceon',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/471.gif',
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


const SelectionPage = ({pokemonData, setPokemonData, nextPage}) => {
    const [selectedPokemon, setSelectedPokemon] = useState(0)
    const [isDataReady, setIsDataReady] = useState(false)
    const [fetchedPokemon, setFetchedPokemon] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        console.log("Selection page log of pokemon data:",pokemonData)
    },[pokemonData])

    useEffect(()=>{
        console.log("Simulating fetch from DB")
        setTimeout(()=>{
            setFetchedPokemon(placeholder)
            setLoading(false)
        },[1500])

    },[])

    if(!loading){
        return(
            <div style={{margin: '0 auto', width: '80%'}}>
                <PokeCardContainer selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} setIsDataReady={setIsDataReady} pokeList={fetchedPokemon} setPokemonData={setPokemonData}/>
                { 
                selectedPokemon !== 0 &&            
                <ConfirmButton route={nextPage} ready={isDataReady}/>
                }
            </div>
        )
    }
    else{
        return(
            <div style={{
                width: '100vw',
                height: '90vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <p style={{textAlign: 'center'}}>Loading...</p>
            </div>
        )
    }
}
export default SelectionPage