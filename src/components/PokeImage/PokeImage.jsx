import React from "react"
import Image from "next/image"

const styles = {
    width: 250,
    height: 250,
    objectFit: 'contain',
    margin: '20px',
}


const PokeImage = ({img , style}) => {

    return(
        <>
        <Image
        src={img}
        width={250}
        height={250}
        unoptimized
        style={{...styles, ...style}}
        alt={"Pokemon sprite"}
        />
        </>
    )
}
export default PokeImage