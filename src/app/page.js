'use client'
import Metadata from "@/components/Metadata";
import Header from "@/components/Header/Header";
import SelectionPage from "@/pages/SelectionPage";
import { useState } from "react";
import MoveSelectionPage from "@/pages/MoveSelectionPage";

export default function Home() {

const [moveSelectionPage, setMoveSelectionPage] = useState(false)
const [pokemonData, setPokemonData] = useState({})

  return (
    <>
      <Metadata/>
      <Header/>
      {
        !moveSelectionPage &&
        <SelectionPage nextPage={()=>{setMoveSelectionPage(true)}} pokemonData={pokemonData} setPokemonData={setPokemonData}/>
      }
      { 
        moveSelectionPage &&
        <MoveSelectionPage pokemonData={pokemonData}/>
      }
    </>
  );
}
