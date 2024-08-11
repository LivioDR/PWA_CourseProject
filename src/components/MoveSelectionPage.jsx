'use client'
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton";
import MovesList from "@/components/MovesList/MovesList";
import MovesSelected from "@/components/MovesList/MovesSelected/MovesSelected";
import PokeImage from "@/components/PokeImage/PokeImage";
import PokeStats from "@/components/PokeStats/PokeStats";
import { setStabOnMoves } from "@/services/getPokemonData";
import getRivalPokemonData from "@/services/getRivalPokemon";
import React, { useState, useEffect } from "react";

const landscapeLayoutStyle = {
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        maxWidth: '1200px',
        height: '90vh',
        margin: '0 auto',
    },
    container: {
        width: '50%',
        margin: '0%',
        height: '80vh',
        textAlign: 'center',
    },
    imageContainer: {
        maxHeight: '40%',
    },
    btnContainer: {
        width: '100%',
        margin: '0%',
        height: '10vh',

    }
}

const imageBackgroundStyle = {
    backgroundImage: 'url("./assets/images/openPokeball.png")',
    backgroundSize: 'contain',
    backgroundPosition: '80% 0%',
    backgroundRepeat: 'no-repeat',
}

const MoveSelectionPage = ({nextPage, pokemonData, selectedMoves, setSelectedMoves, setRivalPokemonData}) => {

    const [movesNumberExceeded, setMovesNumberExceeded] = useState(false)
    const [noMovesSelected, setNoMovesSelected] = useState(false)
    const [areMovesOkay, setAreMovesOkay] = useState(false)
    const [loadingRival, setLoadingRival] = useState(false)
    const [screenWidth, setScreenWidth] = useState(screen.width)

    const moveToBattle = async() => {
        setLoadingRival(true)
        // get the opponent data
        let rival = await getRivalPokemonData(pokemonData.level)
        setRivalPokemonData(rival)

        // set STAB on your moves
        let moves = setStabOnMoves(selectedMoves, pokemonData.types)
        setSelectedMoves(moves)

        // change the flag of the loading button
        setLoadingRival(false)

        // sends a vibration to the device if available
        if('vibrate' in navigator){
            navigator.vibrate([500, 50, 500])
        }

        // moves onto the battle screen
        nextPage()
    }


    const addMove = (moveId) => {
        const moveToAppend = [...pokemonData.moves].filter(move => move.id == moveId)
        setSelectedMoves(prev => {
            return [...prev, moveToAppend[0]]
        })
    }
    const removeMove = (moveId) => {
        setSelectedMoves(prev => {
            prev = prev.filter(move => move.id != moveId)
            return prev
        })
    }

    window.addEventListener('resize', () => {
        setScreenWidth(window.innerWidth)
    })

    useEffect(()=>{
        if(selectedMoves.length == 0){
            setNoMovesSelected(true)
            setAreMovesOkay(false)
        }
        else if(selectedMoves.length > 4){
            setMovesNumberExceeded(true)
            setAreMovesOkay(false)
        }
        else{
            setMovesNumberExceeded(false)
            setNoMovesSelected(false)
            setAreMovesOkay(true)
        }
    },[selectedMoves])

    if(screenWidth < 1000){
        return(
            <>
            <PokeImage img={pokemonData.front_image} containerStyle={imageBackgroundStyle}/>
            <PokeStats stats={pokemonData.baseStats}/>
            <MovesList moves={pokemonData.moves} addMove={addMove} removeMove={removeMove} style={{height: '35vh'}}/>
            {
                movesNumberExceeded &&
                <p style={{textAlign: 'center'}}>You can only set up to four moves</p>
            }
            {
                noMovesSelected &&
                <p style={{textAlign: 'center'}}>Please select at least one move</p>
            }
            {/* <MovesSelected moves={selectedMoves} /> */}
            {
                areMovesOkay &&
                <ConfirmButton confirmText="Start Battle" loadingText="Searching for an opponent" ready={!loadingRival} route={()=>moveToBattle()} />
            }
            </>
        )
    }
    else{
        return(
            <div style={landscapeLayoutStyle.wrapper}>
                <div style={landscapeLayoutStyle.container}>
                    <div style={landscapeLayoutStyle.imageContainer}>
                        <PokeImage img={pokemonData.front_image} containerStyle={imageBackgroundStyle}/>
                    </div>
                    <PokeStats stats={pokemonData.baseStats}/>
                    <MovesSelected moves={selectedMoves} />
                </div>
                <div style={landscapeLayoutStyle.container}>
                    <h3>Available moves</h3>
                    <MovesList moves={pokemonData.moves} addMove={addMove} removeMove={removeMove} style={{height: '70vh'}}/>
                    {
                        movesNumberExceeded &&
                        <p style={{textAlign: 'center'}}>You can only set up to four moves</p>
                    }
                    {
                        noMovesSelected &&
                        <p style={{textAlign: 'center'}}>Please select at least one move</p>
                    }
                </div>
                <div style={landscapeLayoutStyle.btnContainer}>
                    {
                        areMovesOkay &&
                        <ConfirmButton confirmText="Start Battle" loadingText="Searching for an opponent" ready={!loadingRival} route={()=>moveToBattle()} />
                    }
                </div>
            </div>
        )
    }
}
export default MoveSelectionPage