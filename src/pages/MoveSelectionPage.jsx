import PokeImage from "@/components/PokeImage/PokeImage";
import PokeStats from "@/components/PokeStats/PokeStats";
import React from "react";

const MoveSelectionPage = ({pokemonData}) => {

    return(
        <>
        <PokeImage img={pokemonData.front_image}/>
        <PokeStats stats={pokemonData.baseStats}/>
        </>
    )
}
export default MoveSelectionPage