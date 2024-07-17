import PokeCard from "@/components/PokeCard/PokeCard";
import React from "react";

const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '80vh',
    overflowY: 'scroll',
    justifyContent: 'space-evenly',
}


const PokeCardContainer = ({pokeList, selectedPokemon, setSelectedPokemon, setPokemonData, setIsDataReady}) => {


    return(
        <div style={containerStyle}>
        {pokeList.map(poke =><PokeCard key={poke.id} id={poke.id} name={poke.name} lvl={poke.level} exp={poke.exp} image={poke.image} selected={selectedPokemon} setSelected={setSelectedPokemon} setPokemonData={setPokemonData} setIsDataReady={setIsDataReady}/>)}
        </div>
    )
}
export default PokeCardContainer