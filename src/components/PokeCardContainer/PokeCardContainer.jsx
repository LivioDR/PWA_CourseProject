import PokeCard from "@/components/PokeCard/PokeCard";
import React from "react";

const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80vw',
    height: '80vh',
}


const PokeCardContainer = ({pokeList, selectedPokemon, setSelectedPokemon, setPokemonData}) => {


    return(
        <div style={containerStyle}>
        {pokeList.map(poke =><PokeCard key={poke.id} id={poke.id} name={poke.name} lvl={poke.level} exp={poke.exp} image={poke.image} selected={selectedPokemon} setSelected={setSelectedPokemon} setPokemonData={setPokemonData}/>)}
        </div>
    )
}
export default PokeCardContainer