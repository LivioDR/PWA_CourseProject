'use client'

import Metadata from "@/components/Metadata";
import Header from "@/components/Header/Header";
import SelectionPage from "@/pages/SelectionPage";
import { useState, useEffect } from "react";
import getAllPokemon from "@/services/getAllPokemon";

export default function Home() {

  const [pokeList, setPokeList] = useState()


  useEffect(()=>{
    const getPokeData = async() => {
      let pokeData = await getAllPokemon()
      console.log(pokeData)
      setPokeList(pokeData)
    }
    getPokeData()
  },[])


  return (
    <>
      <Metadata/>
      <Header/>
      <SelectionPage pokeList={pokeList}/>
    </>
  );
}
