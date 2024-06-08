import PokeStats from "@/components/PokeStats/PokeStats";
import React, { useEffect, useState } from "react";

const SelectionPage = ({pokeList}) => {

    const [poke, setPoke] = useState()

    useEffect(()=>{
        


    },[poke])


    return(
        <>
            <PokeImage/>
            <PokeSelector pokeList={pokeList} setPoke={setPoke} />
            <PokeStats/>
            <PokeMoves/>
        </>
    )
}
export default SelectionPage