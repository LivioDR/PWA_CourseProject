'use client'
import Metadata from "@/components/Metadata";
import Header from "@/components/Header/Header";
import SelectionPage from "@/components/SelectionPage";
import { useState, useEffect } from "react";
import MoveSelectionPage from "@/components/MoveSelectionPage";
import BattlePage from "@/components/BattlePage";
import { LoginPage } from "@/components/LoginPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logout } from "@/database/firebaseFunctions";
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton";

export default function Home() {

  const [selectionPage, setSelectionPage] = useState(true)
  const [moveSelectionPage, setMoveSelectionPage] = useState(false)
  const [battlePage, setBattlePage] = useState(false)
  const [pokemonData, setPokemonData] = useState({})
  const [selectedMoves, setSelectedMoves] = useState([])
  const [rivalPokemonData, setRivalPokemonData] = useState({})
  const [isOnline, setIsOnline] = useState(false)
  const [credentials, setCredentials] = useState(undefined)

  // wakeLock state management
  const [wakeLockRef, setWakeLockRef] = useState(null)

  useEffect(()=>{

    // auth handling
    (async()=>{
      onAuthStateChanged(auth, user => {
        if(user){
          setCredentials(user)
        }
        else{
          setCredentials(undefined)
        }
      })
    })()

    // Managing service worker
    if('serviceWorker' in navigator){
      navigator.serviceWorker.register('/serviceWorker.js', {scope: '/', type: 'module'})
  
      // background sync registering for testing
      navigator.serviceWorker.ready.then(registration => {
        if(registration.sync){
          if(!navigator.onLine){
            registration.sync.getTags().then(tags => {
              if(tags.includes('firestore-update')){
                console.log("Background sync task already registered")
              }
              else{
                registration.sync.register('firestore-update').then(() => {
                    console.log("Background Sync registered")
                })
              }
            })
          }
        }
        else{
          console.log("Background sync not available")
        }
      })
    }

    // screen orientation lock
    screen.orientation.lock("portrait").then(res => {
      console.log("Screen orientation locked to portrait mode")
    })
    .catch(e => {
      console.error(`An error ocurred while locking the screen orientation:`,e)
    })

    // online/offline handling
    window.addEventListener('offline', () => { setIsOnline(false)})
    window.addEventListener('online', () => { setIsOnline(true)})
    if('onLine' in navigator){
      setIsOnline(navigator.onLine)
    }

  },[])

  const logoutUser = async() => {
    await logout(setCredentials)
  }

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

  if(isOnline && !credentials){
    return(
      <LoginPage setAuth={setCredentials}/>
    )
  }

  if(isOnline){
    return (
      <>
        <Metadata/>
        <Header/>
        <ConfirmButton route={logoutUser} ready={true} confirmText="Log out" styles={{marginBottom: 10}}/>
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
        <ConfirmButton route={logoutUser} ready={true} confirmText="Log out" styles={{marginBottom: 10}}/>
        <div style={{height: '90vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
          <p>No internet connection. Please try again</p>
        </div>
      </>
    )
  }
}
