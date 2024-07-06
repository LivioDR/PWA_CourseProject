import React from "react";

const BattlePage = ({pokemonData, rivalPokemonData}) => {

    return(
        <>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
            <div style={{width: '50%'}}>
                <p>{JSON.stringify(pokemonData)}</p>
            </div>
            <div style={{width: '50%'}}>
                <p>{JSON.stringify(rivalPokemonData)}</p>
            </div>
        </div>
        </>
    )
}
export default BattlePage