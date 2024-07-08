import React from "react";
import ExpBar from "./ExpBar/ExpBar";

const styles = {
    wrapper: {
        width: '90%',
        margin: '2%',
    },
    textContainer: {
        textAlign: 'center',
        width: '100%',
    },
    name: {
        WebkitTextStroke: '0.2px black',
    },
    level: {
        WebkitTextStroke: '0.5px black',
    }
}

const NameLevelContainer = ({name, level, expPercentage}) => {

    return(
        <div style={styles.wrapper}>
            <div style={styles.textContainer}>
                <h3 style={styles.name}>
                    {name}
                </h3>
                <p style={styles.level}>
                    Lv: {level}
                </p>
            </div>
            <ExpBar expPercentage={expPercentage}/>
        </div>
    )
}
export default NameLevelContainer