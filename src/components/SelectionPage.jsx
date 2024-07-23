'use client'
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton"
import PokeCardContainer from "@/components/PokeCardContainer/PokeCardContainer"
import React, { useEffect, useState } from "react"
import { getCollectionForUserId } from "@/database/firebaseFunctions"

const SelectionPage = ({setPokemonData, nextPage}) => {
    const [selectedPokemon, setSelectedPokemon] = useState(0)
    const [isDataReady, setIsDataReady] = useState(false)
    const [fetchedPokemon, setFetchedPokemon] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getPokemonData = async() => {
            let result
            if(typeof window != "undefined"){
                result = await getCollectionForUserId(localStorage.getItem("uid"))
            }
            setFetchedPokemon(result)
            setLoading(false)
        }
        getPokemonData()
    },[])

    if(!loading){
        return(
            <div style={{margin: '0 auto', width: '100%'}}>
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