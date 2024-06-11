import React from "react"

const styles = {
    width: 250,
    height: 250,
    objectFit: 'contain',
    margin: '20px',
}


const PokeImage = ({img , style}) => {

    return(
        <>
        <img
        src={img}
        style={{...styles, ...style}}
        alt={"Pokemon sprite"}
        />
        </>
    )
}
export default PokeImage