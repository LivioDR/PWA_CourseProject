'use client'
import React, {useEffect, useState} from "react";
import BattleContainer from "@/components/BattleComponents/BattleContainer/BattleContainer";
import { startBattle } from "@/services/battleLogic";

const BattlePage = ({pokemonData, rivalPokemonData, setPokemonData, setRivalPokemonData }) => {

    const [text, setText] = useState('')

    useEffect(()=>{
        setText('Battle started')
        startBattle(pokemonData, setPokemonData, rivalPokemonData, setRivalPokemonData, setText)
    },[])

    return(
        <BattleContainer pokemonData={pokemonData} rivalPokemonData={rivalPokemonData} battleText={text} />
    )
}
export default BattlePage