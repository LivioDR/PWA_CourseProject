import React from "react";

const expStyles = {
    wrapper: {
        width: '100%',
        height: '2em',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        width: '20%',
        fontSize: 'small',
    },
    container: {
        width: '80%',
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
    },
}


const ExpBar = ({expPercentage}) => {

    return(
        <>
        <div style={expStyles.wrapper}>
            <p style={expStyles.label}>Exp</p>
            <div className="exp-container" style={expStyles.container}>
                <div className="exp-filling" style={{...expStyles.filling, width: `${expPercentage}%`}}>

                </div>
            </div>
        </div>
        </>
    )
}
export default ExpBar