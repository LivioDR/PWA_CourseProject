'use client'
import React,{ useState } from "react";
import './MovesButtonStyle.css'
import TypeBadge from "../TypeBadge/TypeBadge";

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
                        <TypeBadge type={move.type} />
                        {arrayFromLabel.map(text=><p key={move.id + text} className="movesButtonText">{text}</p>)}
                    </div>
                </button>
            )
        }
        else{
            return(
                <button className="movesButton not-selected" onClick={()=>addThisMove()}>
                    <div className="movesButtonTextWrapper">
                        <TypeBadge type={move.type} />
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
                <TypeBadge type={move.type} />
                {arrayFromLabel.map(text=><p key={move.id + text} className="movesButtonText">{text}</p>)}
            </div>
        </button>
        )
    }


}
export default MovesButton