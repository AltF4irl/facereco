import React from "react";
import './Rank.css';

const Rank = ({ username, score }) => {
    return(
        <div className="rankdiv center">
            <div className="wt">
                {`${username}, your current score is ...`}
            </div>
            <div className="wt f3">
                {`${score}`} 
            </div>
        </div>
    )
}

export default Rank;