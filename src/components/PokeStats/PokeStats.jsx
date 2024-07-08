import React from "react";
import StatBar from "./StatBar/StatBar";

const containerStyle = {
    width: '90%',
    marginTop: '20px',
    marginBottom: '20px',
    marginInline: '5%',
    maxHeight: '200px',
}


const PokeStats = ({stats}) => {
    // Refactoring the stats into an array of objects
    let arrayOfStats = []
    let maxValue = Math.max(...Object.values(stats))
    for(const [key, val] of Object.entries(stats)){
        if(key != "MaxHp")
            arrayOfStats.push({
                name: key,
                value: val,
            })
    }

    return(
        <div style={containerStyle}>
            {arrayOfStats?.map(stat => <StatBar name={stat.name} value={stat.value} maxValue={maxValue} key={stat.value + stat.name}/>)}
        </div>
    )
}
export default PokeStats