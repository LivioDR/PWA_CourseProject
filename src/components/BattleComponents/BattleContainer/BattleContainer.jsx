import React from "react";
import HpBar from "../HpBar/HpBar";
import PokeImage from "@/components/PokeImage/PokeImage";
import BattleText from "../BattleText/BattleText";
// import './BattleContainerStyle.css'

const imageStyle = {
    margin: '0%',
    maxHeigth: '80%',
}


const BattleContainer = ({pokemonData, rivalPokemonData, battleText}) => {
    return(
        <div className="battleContainerWrapper">
            <div className="battleContainerRow" id="battleRivalGraph" style={{display: 'grid'}}>
                <HpBar stats={rivalPokemonData.baseStats} reduceToLeft={true} />
                <div className="imageBattleContainer" style={{justifySelf: 'end'}}>
                    <PokeImage img={rivalPokemonData.front_image} style={imageStyle} />
                </div>
            </div>
            <div className="battleContainerRow" id="battlePokemonGraph">
                <div className="imageBattleContainer">
                    <PokeImage img={pokemonData.back_image} style={imageStyle} />
                </div>
                <HpBar stats={pokemonData.baseStats} reduceToLeft={false} />
            </div>
            <div className="battleContainerRow" id="battleTextGraph">
                <BattleText text={battleText} />
            </div>
        </div>
    )
}
export default BattleContainer