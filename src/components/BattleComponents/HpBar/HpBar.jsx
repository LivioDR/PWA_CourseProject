import React from "react";
import './HpBarStyle.css'

const HpBar = ({stats, reduceToLeft = true}) => {

    const remainingHpPercentage = stats.Hp / stats.MaxHp * 100

    return(
        <>
        <div className="hpWrapper" style={{ minHeight: 50 }}>
            <div className="hpBackground" style={{display: 'flex', justifyContent: reduceToLeft ? 'flex-end' : 'flex-start'}}>
                <div className="hpFill" style={{width: `${remainingHpPercentage}%`}}></div>
            </div>
        </div>
        </>
    )
}
export default HpBar