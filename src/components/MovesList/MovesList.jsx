import React from "react";
import MovesButton from "./MovesButton/MovesButton";

const wrapperStyle = {
    width: '100%',
    height: '35vh',
    overflowY: 'scroll',
}

const MovesList = ({moves, addMove, removeMove}) => {
    return(
        <div className="movesListWrapper" style={wrapperStyle}>
            {moves.map(move => <MovesButton key={move.id} move={move} addMove={addMove} removeMove={removeMove}/>)}
        </div>
    )

}
export default MovesList