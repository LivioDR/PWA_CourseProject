import React from "react";
import './TypeBadgeStyle.css'

const typeColor = {
    'bug': {
        backgroundColor: '#8a9b0f'
    },
    'dark': {
        backgroundColor: '#3e2e21'
    },
    'dragon': {
        backgroundColor: '#503fa6'
    },
    'electric': {
        backgroundColor: '#e79405'
    },
    'fairy': {
        backgroundColor: '#ec88ee'
    },
    'fighting': {
        backgroundColor: '#80331b'
    },
    'fire':{
        backgroundColor: '#c82100'
    },
    'flying':{
        backgroundColor: '#6373d7'
    },
    'ghost':{
        backgroundColor: '#3f4594'
    },
    'grass':{
        backgroundColor: '#389900'
    },
    'ground':{
        backgroundColor: '#ac9041'
    },
    'ice':{
        backgroundColor: '#6fd0f7'
    },
    'normal':{
        backgroundColor: '#ada593'
    },
    'poison':{
        backgroundColor: '#732977'
    },
    'psychic':{
        backgroundColor: '#c93c69'
    },
    'rock':{
        backgroundColor: '#9d863c'
    },
    'steel':{
        backgroundColor: '#8f8ea1'
    },
    'water':{
        backgroundColor: '#1f81dc'
    }
}

const TypeBadge = ({type}) => {
    return(
        <div className="typeBadgeContainer" style={{ ...typeColor[type]}}>
            <p className="typeBadgeText">{type.toUpperCase()}</p>
        </div>
    )
}
export default TypeBadge