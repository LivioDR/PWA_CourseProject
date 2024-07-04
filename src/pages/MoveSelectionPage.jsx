'use client'
import MovesList from "@/components/MovesList/MovesList";
import MovesSelected from "@/components/MovesList/MovesSelected/MovesSelected";
import PokeImage from "@/components/PokeImage/PokeImage";
import PokeStats from "@/components/PokeStats/PokeStats";
import React, { useState } from "react";

const MoveSelectionPage = ({pokemonData}) => {

    const [selectedMoves, setSelectedMoves] = useState([])
    const [movesNumberExceeded, setMovesNumberExceeded] = useState(false)
    const [noMovesSelected, setNoMovesSelected] = useState(false)

    const addMove = (moveId) => {
        const moveToAppend = [...pokemonData.moves].filter(move => move.id == moveId)
        setSelectedMoves(prev => {
            // Alert message logic
            setNoMovesSelected(false)
            if(prev.length >= 4){
                setMovesNumberExceeded(true)
            }
            else{
                setMovesNumberExceeded(false)
            }
            return [...prev, moveToAppend[0]]
        })
        
    }
    const removeMove = (moveId) => {
        setSelectedMoves(prev => {
            prev = prev.filter(move => move.id != moveId)
            if(prev.length < 1){
                setNoMovesSelected(true)
            }
            else{
                if(prev.length <= 4){
                    setMovesNumberExceeded(false)
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
        </>
    )
}
export default MoveSelectionPage