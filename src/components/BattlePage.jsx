'use client'
import React, {useEffect, useState} from "react";
import BattleContainer from "@/components/BattleComponents/BattleContainer/BattleContainer";
import { startBattle } from "@/services/battleLogic";
import ConfirmButton from "./ConfirmButton/ConfirmButton";

const BattlePage = ({nextPage, pokemonData, pokemonAttacks, rivalPokemonData, setPokemonData, setRivalPokemonData }) => {

    const [text, setText] = useState()
    const [isBattleOver, setIsBattleOver] = useState(false)

    const beginBattleSequence = () => {
        startBattle(pokemonData, pokemonAttacks, setPokemonData, rivalPokemonData, setRivalPokemonData, setText, setIsBattleOver)
    }

    useEffect(()=>{
        beginBattleSequence()
    },[])

    return(
        <>
            <BattleContainer pokemonData={pokemonData} rivalPokemonData={rivalPokemonData} battleText={text} />
            {
                isBattleOver &&
                <ConfirmButton confirmText="New game?" route={nextPage} ready={true} />
            }
        </>
    )
}
export default BattlePage