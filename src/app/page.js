'use client'
import Metadata from "@/components/Metadata";
import Header from "@/components/Header/Header";
import SelectionPage from "@/pages/SelectionPage";
import { useState } from "react";
import MoveSelectionPage from "@/pages/MoveSelectionPage";
import BattlePage from "@/pages/BattlePage";

export default function Home() {

  const [selectionPage, setSelectionPage] = useState(true)
  const [moveSelectionPage, setMoveSelectionPage] = useState(false)
  const [battlePage, setBattlePage] = useState(false)
  const [pokemonData, setPokemonData] = useState({})
  const [selectedMoves, setSelectedMoves] = useState([])
  const [rivalPokemonData, setRivalPokemonData] = useState({})


  return (
    <>
      <Metadata/>
      <Header/>
      {
        selectionPage &&
        <SelectionPage nextPage={()=>{setMoveSelectionPage(true);setSelectionPage(false)}} pokemonData={pokemonData} setPokemonData={setPokemonData}/>
      }
      { 
        moveSelectionPage &&
        <MoveSelectionPage nextPage={()=>{setBattlePage(true);setMoveSelectionPage(false)}} pokemonData={pokemonData} selectedMoves={selectedMoves} setSelectedMoves={setSelectedMoves} setRivalPokemonData={setRivalPokemonData}/>
      }
      {
        battlePage &&
        <BattlePage pokemonData={pokemonData} rivalPokemonData={rivalPokemonData} />
      }
    </>
  );
}
