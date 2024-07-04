import React from "react";
import Link from "next/link";
import './ConfirmBtnStyle.css'

const ConfirmButton = ({route}) => {
    return(
        <Link href={route}>
            <div className="confirmWrapper">
                <p className="confirmText">Confirm</p>
            </div>
        </Link>
    )
}
export default ConfirmButton