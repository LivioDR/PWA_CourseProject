import React from "react";

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2%',
        marginBottom: '2%',
    },
    statName: {
        fontSize: '0.5em',
        width: '10%',
    },
    barContainer: {
        width: '80%',
    },
    statBar: {
        height: '0.5em',
    },
    statNumber :{
        width: '5%',
        fontSize: '0.5em',
    }
}


const StatBar = ({name, value, maxValue}) => {
    const percentage = (value/maxValue)*100
    return(
        <div style={styles.container}>
            <p style={styles.statName}>{name}</p>
            <div style={styles.barContainer}>
                <div style={{...styles.statBar, width:`${percentage}%`, backgroundColor: `hsl(${percentage}deg 60% 45%)`}}> 
                </div>
            </div>
            <p style={styles.statNumber}>{value}</p>
        </div>
    )
}
export default StatBar