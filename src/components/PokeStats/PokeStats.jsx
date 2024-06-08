import React from "react";
import StatBar from "./StatBar/StatBar";

const containerStyle = {
    width: '400px',
    marginTop: '20px',
    height: '200px',
}


const PokeStats = ({stats}) => {

    return(
        <div style={containerStyle}>
            {stats?.map(stat => <StatBar name={stat.name} value={stat.value} key={stat.value + stat.name}/>)}
        </div>
    )
}
export default PokeStats