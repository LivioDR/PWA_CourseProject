import React from "react";
import HpBar from "../HpBar/HpBar";
import PokeImage from "@/components/PokeImage/PokeImage";
import BattleText from "../BattleText/BattleText";
// import './BattleContainerStyle.css'

const imageStyle = {
    margin: '0%',
    // height: '50%',
    width: '50%',
    minWidth: '150px',
}


const BattleContainer = ({pokemonData, rivalPokemonData, battleText}) => {
    return(
        <div className="battleContainerWrapper">
            <div className="battleContainerRow" id="battleRivalGraph" style={{display: 'grid'}}>
                <HpBar stats={rivalPokemonData.baseStats} reduceToLeft={true} />
                <div className="imageBattleContainer" style={{justifySelf: 'end'}}>
                    <PokeImage img={rivalPokemonData.front_image || '/assets/images/rivalPokemonPlaceholder.png'} style={{...imageStyle, height: '50%'}} xAlignment="end" />
                </div>
            </div>
            <div className="battleContainerRow" id="battlePokemonGraph" style={{display: 'grid'}}>
                <div className="imageBattleContainer" style={{justifySelf: 'start'}}>
                    <PokeImage img={pokemonData.back_image || '/assets/images/pokemonBackPlaceholder.gif'} style={imageStyle} xAlignment="start" />
                </div>
                <HpBar stats={pokemonData.baseStats} reduceToLeft={false} />
            </div>
            <div className="battleContainerRow" id="battleTextGraph" style={{width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', margin: '5%',}}>
                <BattleText text={battleText} />
            </div>
        </div>
    )
}
export default BattleContainer