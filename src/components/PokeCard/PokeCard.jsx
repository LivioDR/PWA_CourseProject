import React from "react";
import { getCurrentLevel } from "@/services/battleLogic";
import NameLevelContainer from "../NameLevelContainer/NameLevelContainer";
import PokeImage from "../PokeImage/PokeImage";

const cardStyle = {
    container: {
        border: '2px solid red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',    
        width: '40%',
        maxHeight: '30%',
        margin: '1%',
    },
    image: {
        width: '50%',
        height: '50%',
    }
}

const PokeCard = ({name, lvl, exp, image}) => {

    const currLevelExp = getCurrentLevel(lvl)
    const expNextLevel = getCurrentLevel(lvl+1)
    const percentageToNextLevel = ((exp - currLevelExp)/(expNextLevel - currLevelExp)*100)

    return(
        <div style={cardStyle.container}>
            <PokeImage img={image} style={cardStyle.image}/>
            <NameLevelContainer name={name} level={lvl} expPercentage={percentageToNextLevel}/>
        </div>
    )
}
export default PokeCard