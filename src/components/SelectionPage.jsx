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

        // releasing the wakeLock
        if('wakeLock' in navigator){
            try{
                navigator.wakeLock.request().then(sentinel => {
                    sentinel.release().then(res => {
                        console.log(`Sentinel released successfully`)
                        console.log(res)
                    }).catch(err => {
                        console.error(`An error occurred while releasing the sentinel`)
                        console.error(err)
                    })
                })
            }
            catch(e){
                console.error(e)
            }
        }
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