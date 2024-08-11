'use client'
import React, {useEffect, useState} from "react";
import BattleContainer from "@/components/BattleComponents/BattleContainer/BattleContainer";
import { startBattle } from "@/services/battleLogic";
import ConfirmButton from "./ConfirmButton/ConfirmButton";

const battlePageStyles = {
    wrapper: {
        width: '100%'
    },
}

const BattlePage = ({nextPage, pokemonData, pokemonAttacks, rivalPokemonData, setPokemonData, setRivalPokemonData, setWakeLock }) => {

    const [text, setText] = useState()
    const [isBattleOver, setIsBattleOver] = useState(false)

    const beginBattleSequence = () => {
        startBattle(pokemonData, pokemonAttacks, setPokemonData, rivalPokemonData, setRivalPokemonData, setText, setIsBattleOver)
    }

    useEffect(()=>{
        // Setting the WakeLock API
        if('wakeLock' in navigator){
            try{
                navigator.wakeLock.request().then(res => {
                    setWakeLock(res)
                })
            }
            catch(e){
                console.error(e)
            }
        }
        beginBattleSequence()
    },[])

    return(
        <div style={battlePageStyles.wrapper}>
            <BattleContainer pokemonData={pokemonData} rivalPokemonData={rivalPokemonData} battleText={text} />
            {
                isBattleOver &&
                <ConfirmButton confirmText="New game" route={nextPage} ready={true} />
            }
        </div>
    )
}
export default BattlePage