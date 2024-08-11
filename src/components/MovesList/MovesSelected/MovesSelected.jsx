import React from "react";
import MovesButton from "../MovesButton/MovesButton";

const MovesSelected = ({moves}) => {
    return(
        <div style={{width: '100%', textAlign: 'center', marginTop: '2%', marginBottom: '2%', height: '35%', overflowY: 'scroll'}}>
            {
                moves.length >= 1 &&
                <h3>Selected Moves</h3>
            }
            {moves.map(move => <MovesButton key={move.id + "selectedContainer"} move={move} actionable={false}/>)}
        </div>
    )
}
export default MovesSelected