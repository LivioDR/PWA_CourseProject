import React from "react";
import './HeaderStyle.css'
import Image from "next/image";

const Header = () => {
    return(
        <>
        <div className="headerContainer">
            <Image
                src={'/logo192.png'}
                width={50}
                height={50}
                alt="App icon"
                className="image"
            />   
            <h1 className="headerTitle">PokeBattle RPG</h1>
        </div>
        </>
    )
}
export default Header