'use client'
import Metadata from "@/components/Metadata";
import Header from "@/components/Header/Header";
import SelectionPage from "@/components/SelectionPage";
import { useState, useEffect } from "react";
import MoveSelectionPage from "@/components/MoveSelectionPage";
import BattlePage from "@/components/BattlePage";

export default function Home() {

  const [selectionPage, setSelectionPage] = useState(true)
  const [moveSelectionPage, setMoveSelectionPage] = useState(false)
  const [battlePage, setBattlePage] = useState(false)
  const [pokemonData, setPokemonData] = useState({})
  const [selectedMoves, setSelectedMoves] = useState([])
  const [rivalPokemonData, setRivalPokemonData] = useState({})

  const [wakeLockRef, setWakeLockRef] = useState(null)

  // ******* TESTING ONLY ******* //
  if(typeof window != "undefined"){
    localStorage.setItem("uid","qwertyuiopasdfghjkl")
  }
  // ******* TESTING ONLY ******* //

  useEffect(()=>{
    // Managing service worker
    if('serviceWorker' in navigator){
      navigator.serviceWorker.register('/serviceWorker.js')
    }

    // screen orientation lock
    screen.orientation.lock("portrait")
  },[])

  const changeToSelectionPage = () => {
    setSelectionPage(true)
    setMoveSelectionPage(false)
    setBattlePage(false)
    // reset the state
    setSelectedMoves([])
    setPokemonData({})
    setRivalPokemonData({})
  }

  const changeToMoveSelectionPage = () => {
    setSelectionPage(false)
    setMoveSelectionPage(true)
    setBattlePage(false)
  }

  const changeToBattlePage = () => {
    setSelectionPage(false)
    setMoveSelectionPage(false)
    setBattlePage(true)
  }

  return (
    <>
      <Metadata/>
      <Header/>
      {
        selectionPage &&
        <SelectionPage nextPage={changeToMoveSelectionPage} wakeLock={wakeLockRef} pokemonData={pokemonData} setPokemonData={setPokemonData}/>
      }
      { 
        moveSelectionPage &&
        <MoveSelectionPage nextPage={changeToBattlePage} pokemonData={pokemonData} selectedMoves={selectedMoves} setSelectedMoves={setSelectedMoves} setRivalPokemonData={setRivalPokemonData}/>
      }
      {
        battlePage &&
        <BattlePage nextPage={changeToSelectionPage} setWakeLock={setWakeLockRef} pokemonData={pokemonData} pokemonAttacks={selectedMoves} rivalPokemonData={rivalPokemonData} setPokemonData={setPokemonData} setRivalPokemonData={setRivalPokemonData} />
      }
    </>
  );
}
