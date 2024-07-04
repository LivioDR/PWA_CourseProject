import React from "react";
import MovesButton from "../MovesButton/MovesButton";

const SelectedMovesContainer = ({moves}) => {
    return(
        <div style={{width: '50%', textAlign: 'center'}}>
            {
                moves.length >= 1 &&
                <h3>Selected Moves</h3>
            }
            {moves.map(move => <MovesButton key={move.id + "selectedContainer"} move={move} actionable={false}/>)}
        </div>
    )
}
export default SelectedMovesContainer