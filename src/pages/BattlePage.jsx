'use client'
import React, {useEffect, useState} from "react";
import BattleContainer from "@/components/BattleComponents/BattleContainer/BattleContainer";
import { startBattle } from "@/services/battleLogic";

const BattlePage = ({pokemonData, pokemonAttacks, rivalPokemonData, setPokemonData, setRivalPokemonData }) => {

    const [text, setText] = useState('')

    const beginBattleSequence = () => {
        setText('Battle started')
        startBattle(pokemonData, pokemonAttacks, setPokemonData, rivalPokemonData, setRivalPokemonData, setText)
    }

    useEffect(()=>{
        beginBattleSequence()
    },[])

    return(
        <BattleContainer pokemonData={pokemonData} rivalPokemonData={rivalPokemonData} battleText={text} />
    )
}
export default BattlePage