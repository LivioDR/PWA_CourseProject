'use client'
import React from "react";
import { getCurrentLevelExp } from "@/services/battleLogic";
import NameLevelContainer from "../NameLevelContainer/NameLevelContainer";
import PokeImage from "../PokeImage/PokeImage";
import { filterPokemonMovesByLevel, getPokemonCry, getPokemonData, getStatsForLevel } from "@/services/getPokemonData";

const cardStyle = {
    container: {
        border: '2px solid red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',    
        maxWidth: '48%',
        minWidth: '250px',
        maxHeight: '40%',
        margin: '1%',
        borderRadius: 20,
    },
    image: {
        width: '50%',
        height: '90%',
    }
}

const PokeCard = ({id, name, lvl, exp, image, selected, setSelected, setPokemonData, setIsDataReady}) => {

    const toggleSelection = async() => {
        // disables confirm button until data is loaded
        setIsDataReady(false)

        // changed background
        setSelected(id)

        // played sound effect on selection
        const cry = await getPokemonCry(id)
        const cryAudio = new Audio(cry)
        cryAudio.volume = 0.5
        cryAudio.play()

        // gather all data an store it in state
        let allData = await getPokemonData(id)
        allData = filterPokemonMovesByLevel(allData, lvl)
        allData.baseStats = getStatsForLevel(allData.baseStats, lvl)
        allData.level = lvl
        setPokemonData(allData)
        setIsDataReady(true)
    }

    const currLevelExp = getCurrentLevelExp(lvl)
    const expNextLevel = getCurrentLevelExp(lvl+1)
    const percentageToNextLevel = ((exp - currLevelExp)/(expNextLevel - currLevelExp)*100)

    return(
        <div style={{...cardStyle.container, backgroundColor: selected == id ? 'teal' : '#3D3D3D'}} onClick={()=>{toggleSelection()}}>
            <PokeImage img={image || '/assets/images/rivalPokemonPlaceholder.png'} style={cardStyle.image}/>
            <NameLevelContainer name={name} level={lvl} expPercentage={percentageToNextLevel}/>
        </div>
    )
}
export default PokeCard