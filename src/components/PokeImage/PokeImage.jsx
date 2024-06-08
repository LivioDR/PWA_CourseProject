import React from "react"

const styles = {
    width: 250,
    height: 250,
    objectFit: 'contain',
    margin: '20px',
}


const PokeImage = ({img}) => {

    return(
        <>
        <img
        src={img}
        style={styles}
        alt={"Pokemon sprite"}
        />
        </>
    )
}
export default PokeImage