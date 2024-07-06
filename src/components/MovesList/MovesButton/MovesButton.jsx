'use client'
import React,{ useState } from "react";
import './MovesButtonStyle.css'

const MovesButton = ({move, addMove, removeMove, actionable = true}) => {
    const [isAdded, setIsAdded] = useState(false)

    const addThisMove = () => {
        addMove(move.id)
        setIsAdded(true)
    }
    const removeThisMove = () => {
        removeMove(move.id)
        setIsAdded(false)
    }

    const arrayFromLabel = move.label.split("|")

    if(actionable){
        if(isAdded){
            return(
                <button className="movesButton selected" onClick={()=>removeThisMove()}>
                    <div className="movesButtonTextWrapper">
                        <p className="movesButtonText">[{move.type.toUpperCase()}]</p>
                        {arrayFromLabel.map(text=><p key={move.id + text} className="movesButtonText">{text}</p>)}
                    </div>
                </button>
            )
        }
        else{
            return(
                <button className="movesButton not-selected" onClick={()=>addThisMove()}>
                    <div className="movesButtonTextWrapper">
                    <p className="movesButtonText">[{move.type.toUpperCase()}]</p>
                        {arrayFromLabel.map(text=><p key={move.id + text} className="movesButtonText">{text}</p>)}
                    </div>
                </button>
            )
        }
    }
    else{
        return(
            <button className="movesButton not-selected">
            <div className="movesButtonTextWrapper">
                {arrayFromLabel.map(text=><p key={move.id + text} className="movesButtonText">{text}</p>)}
            </div>
        </button>
        )
    }


}
export default MovesButton