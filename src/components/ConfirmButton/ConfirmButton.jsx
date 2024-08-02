import React from "react";
import './ConfirmBtnStyle.css'

const ConfirmButton = ({route, ready, confirmText = 'Confirm', loadingText = 'Loading...'}) => {
    if(ready){
        return(
            <div style={{width: '100%', maxWidth: '500px', margin: '0 auto'}}>
                <button className="confirmWrapper" onClick={route}>
                    <p className="confirmText">{confirmText}</p>
                </button>
            </div>
        )
    }
    else{
        return(
            <div style={{width: '100%', maxWidth: '500px', margin: '0 auto'}}>
                <button className="confirmWrapper loading" disabled>
                    <p className="loadingText">{loadingText}</p>
                </button>
            </div>
        )
    }
}
export default ConfirmButton