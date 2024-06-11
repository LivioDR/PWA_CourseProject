import React from "react";
import ExpBar from "./ExpBar/ExpBar";

const NameLevelContainer = ({name, level, expPercentage}) => {

    return(
        <div>
            <div>
                <h3>
                    {name}
                </h3>
                <p>
                    Lv: {level}
                </p>
            </div>
            <ExpBar expPercentage={expPercentage}/>
        </div>
    )
}
export default NameLevelContainer