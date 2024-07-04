import React from "react";
import './ConfirmBtnStyle.css'

const ConfirmButton = ({route, ready}) => {
    if(ready){
        return(
            <button className="confirmWrapper" onClick={route}>
                <p className="confirmText">Confirm</p>
            </button>
        )
    }
    else{
        return(
            <button className="confirmWrapper" disabled>
                <p className="confirmText">Loading...</p>
            </button>
        )
    }
}
export default ConfirmButton