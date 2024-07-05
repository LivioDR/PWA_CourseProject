'use client'
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton";
import MovesList from "@/components/MovesList/MovesList";
import MovesSelected from "@/components/MovesList/MovesSelected/MovesSelected";
import PokeImage from "@/components/PokeImage/PokeImage";
import PokeStats from "@/components/PokeStats/PokeStats";
import getRivalPokemonData from "@/services/getRivalPokemon";
import React, { useState } from "react";

const MoveSelectionPage = ({pokemonData}) => {

    const [selectedMoves, setSelectedMoves] = useState([])
    const [movesNumberExceeded, setMovesNumberExceeded] = useState(false)
    const [noMovesSelected, setNoMovesSelected] = useState(false)
    const [areMovesOkay, setAreMovesOkay] = useState(false)

    const displayInfoOnConsole = async() => {
        console.log(pokemonData)
        console.log(selectedMoves)
        let rival = await getRivalPokemonData(pokemonData.level)
        console.warn(rival)
    }


    const addMove = (moveId) => {
        const moveToAppend = [...pokemonData.moves].filter(move => move.id == moveId)
        setSelectedMoves(prev => {
            // Alert message logic
            setNoMovesSelected(false)
            if(prev.length >= 4){
                setMovesNumberExceeded(true)
                setAreMovesOkay(false)
            }
            else{
                setMovesNumberExceeded(false)
                setAreMovesOkay(true)
            }
            return [...prev, moveToAppend[0]]
        })
        
    }
    const removeMove = (moveId) => {
        setSelectedMoves(prev => {
            prev = prev.filter(move => move.id != moveId)
            if(prev.length < 1){
                setNoMovesSelected(true)
                setAreMovesOkay(false)
            }
            else{
                if(prev.length <= 4){
                    setMovesNumberExceeded(false)
                    setAreMovesOkay(true)
                }
                setNoMovesSelected(false)
            }
            return prev
        })
    }

    return(
        <>
        <PokeImage img={pokemonData.front_image}/>
        <PokeStats stats={pokemonData.baseStats}/>
        {
            movesNumberExceeded &&
            <p>You can only set up to four moves</p>
        }
        {
            noMovesSelected &&
            <p>Please select at least one move</p>
        }
        <MovesList moves={pokemonData.moves} addMove={addMove} removeMove={removeMove}/>
        <MovesSelected moves={selectedMoves} />
        <ConfirmButton confirmText="Start Battle" loadingText="Start Battle" ready={areMovesOkay} route={()=>displayInfoOnConsole()} />
        </>
    )
}
export default MoveSelectionPage