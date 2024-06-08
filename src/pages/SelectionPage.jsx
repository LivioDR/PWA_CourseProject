import PokeStats from "@/components/PokeStats/PokeStats";
import PokeImage from "@/components/PokeImage/PokeImage";
import React, { useEffect, useState } from "react";

const SelectionPage = ({pokeList}) => {

    const [poke, setPoke] = useState()
    const [stats, setStats] = useState([])

    useEffect(()=>{
        setStats(poke?.stats)
        
    },[poke])

    console.log(pokeList)

    return(
        <>
            <PokeImage img={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/132.gif'}/>
            {/* <PokeSelector pokeList={pokeList} setPoke={setPoke} /> */}
            <PokeStats/>
            {/* <PokeMoves/> */}
        </>
    )
}
export default SelectionPage