'use client'
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton"
import PokeCardContainer from "@/components/PokeCardContainer/PokeCardContainer"
import React, { useEffect, useState } from "react"
import { getCollectionForUserId } from "@/database/firebaseFunctions"

const SelectionPage = ({setPokemonData, nextPage, wakeLock, setIsOnline}) => {
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
            if(result.length > 0){
                setFetchedPokemon(result)
                setLoading(false)
            }
            else{
                if(!navigator.onLine){
                    setIsOnline(false)
                }
            }
        }
        getPokemonData()

        // releasing the wakeLock
        if(wakeLock !== null){
            try{
                wakeLock.release().then(res => {
                        console.log(`Sentinel released successfully`)
                        console.log(res)
                    }).catch(err => {
                        console.error(`An error occurred while releasing the sentinel`)
                        console.error(err)
                    })
            }
            catch(e){
                console.error(e)
            }
        }
    },[])

    if(!loading){
        return(
            <div style={{margin: '0 auto', width: '100%', height: '90vh'}}>
                <PokeCardContainer selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} setIsDataReady={setIsDataReady} pokeList={fetchedPokemon} setPokemonData={setPokemonData}/>
                { 
                selectedPokemon !== 0 &&
                <div style={{maxWidth: '500px', margin: '0 auto', marginTop: '20px'}}>
                    <ConfirmButton route={nextPage} ready={isDataReady}/>
                </div>            
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