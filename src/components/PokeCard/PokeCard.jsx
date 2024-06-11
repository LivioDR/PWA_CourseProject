'use client'
import React from "react";
import { getCurrentLevel } from "@/services/battleLogic";
import NameLevelContainer from "../NameLevelContainer/NameLevelContainer";
import PokeImage from "../PokeImage/PokeImage";
import { getPokemonCry, getPokemonData } from "@/services/getPokemonData";

const cardStyle = {
    container: {
        border: '2px solid red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',    
        minWidth: '40%',
        maxWidth: 350,
        maxHeight: '40%',
        margin: '1%',
        borderRadius: 20,
    },
    image: {
        width: '50%',
        height: '50%',
    }
}

const PokeCard = ({id, name, lvl, exp, image, selected, setSelected, setPokemonData}) => {

    const toggleSelection = async() => {
        setSelected(id)
        const cry = await getPokemonCry(id)
        const cryAudio = new Audio(cry)
        cryAudio.volume = 0.5
        cryAudio.play()

        const allData = await getPokemonData(id)
        console.warn(allData)
        setPokemonData(allData)
    }

    const currLevelExp = getCurrentLevel(lvl)
    const expNextLevel = getCurrentLevel(lvl+1)
    const percentageToNextLevel = ((exp - currLevelExp)/(expNextLevel - currLevelExp)*100)

    return(
        <div style={{...cardStyle.container, backgroundColor: selected == id ? 'lightgrey' : ''}} onClick={()=>{toggleSelection()}}>
            <PokeImage img={image} style={cardStyle.image}/>
            <NameLevelContainer name={name} level={lvl} expPercentage={percentageToNextLevel}/>
        </div>
    )
}
export default PokeCard