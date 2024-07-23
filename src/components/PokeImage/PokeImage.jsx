import React from "react"
import Image from "next/image"

const styles = {
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 250,
        objectFit: 'contain',
        margin: '0 auto',
    }
}


const PokeImage = ({img , style = {}, xAlignment = "center"}) => {

    return(
        <div style={{...styles.container, justifyContent: xAlignment}}>
            <Image
            src={img}
            width={style.width | 250}
            height={style.height | 250}
            unoptimized
            priority
            style={{...styles.image, ...style}}
            alt={"Pokemon sprite"}
            />
        </div>
    )
}
export default PokeImage