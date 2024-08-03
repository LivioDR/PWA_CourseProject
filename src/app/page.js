'use client'
import Metadata from "@/components/Metadata";
import Header from "@/components/Header/Header";
import SelectionPage from "@/components/SelectionPage";
import { useState, useEffect } from "react";
import MoveSelectionPage from "@/components/MoveSelectionPage";
import BattlePage from "@/components/BattlePage";
import getAllInfoForCache from "@/services/downloadAllInfo";

export default function Home() {

  const [selectionPage, setSelectionPage] = useState(true)
  const [moveSelectionPage, setMoveSelectionPage] = useState(false)
  const [battlePage, setBattlePage] = useState(false)
  const [pokemonData, setPokemonData] = useState({})
  const [selectedMoves, setSelectedMoves] = useState([])
  const [rivalPokemonData, setRivalPokemonData] = useState({})
  const [isOnline, setIsOnline] = useState(false)

  // wakeLock state management
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

    // online/offline handling
    window.addEventListener('offline', () => { setIsOnline(false)})
    window.addEventListener('online', () => { setIsOnline(true)})
    if('onLine' in navigator){
      setIsOnline(navigator.onLine)
    }
    
    // set all the data in the indexedDB
    getAllInfoForCache()
    
    // screen orientation lock
    screen.orientation.lock("portrait").then(res => {
      console.log("Screen orientation locked to portrait mode")
    })
    .catch(e => {
      console.error(`An error ocurred while locking the screen orientation:`,e)
    })
    
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

  if(isOnline){
    return (
      <>
        <Metadata/>
        <Header/>
        {
          selectionPage &&
          <SelectionPage nextPage={changeToMoveSelectionPage} setIsOnline={setIsOnline} wakeLock={wakeLockRef} pokemonData={pokemonData} setPokemonData={setPokemonData}/>
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
  else{
    return(
      <>
        <Metadata/>
        <Header/>
        <div style={{height: '90vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
          <p>No internet connection. Please try again</p>
        </div>
      </>
    )
  }
}
