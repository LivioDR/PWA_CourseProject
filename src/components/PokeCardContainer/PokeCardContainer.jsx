import PokeCard from "@/components/PokeCard/PokeCard";
import React from "react";

const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80vw',
    height: '80vh',
}


const PokeCardContainer = ({pokeList}) => {

    const placeholder = [
        {
            name: 'bulbasaur',
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/1.gif',
            level: 15,
            exp: 2400,
        },
        {
            name: 'charmander',
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/4.gif',
            level: 5,
            exp: 150,
        },
        {
            name: 'squirtle',
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/7.gif',
            level: 17,
            exp: 3500,
        },
        {
            name: 'pikachu',
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif',
            level: 25,
            exp: 12000,
        }
    ]



    return(
        <div style={containerStyle}>
        {placeholder.map(poke =><PokeCard key={poke.exp} name={poke.name} lvl={poke.level} exp={poke.exp} image={poke.image}/>)}
        </div>
    )
}
export default PokeCardContainer