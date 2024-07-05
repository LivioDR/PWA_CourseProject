import React from "react";
import './ConfirmBtnStyle.css'

const ConfirmButton = ({route, ready, confirmText = 'Confirm', loadingText = 'Loading...'}) => {
    if(ready){
        return(
            <button className="confirmWrapper" onClick={route}>
                <p className="confirmText">{confirmText}</p>
            </button>
        )
    }
    else{
        return(
            <button className="confirmWrapper loading" disabled>
                <p className="confirmText">{loadingText}</p>
            </button>
        )
    }
}
export default ConfirmButton