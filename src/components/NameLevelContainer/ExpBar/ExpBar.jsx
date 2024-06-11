import React from "react";

const expStyles = {
    container: {
        width: '100%',
        height: '2em',
        borderRadius: 50,
        backgroundColor: 'skyblue',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        border: '1px solid black',
    },
    filling: {
        borderRadius: 50,
        backgroundColor: 'deepskyblue',
        border: '1px solid black',
    }
}


const ExpBar = ({expPercentage}) => {

    return(
        <div className="exp-container" style={expStyles.container}>
            <div className="exp-filling" style={{...expStyles.filling, width: `${expPercentage}%`}}>

            </div>
        </div>
    )
}
export default ExpBar