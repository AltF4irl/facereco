import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({url, box}) => {
    return(
        <div className="reee">
            <div className="absolute mt2">
                <img id="inputimg" style={{width: "400px", height: "auto"}} alt='' src={url}></img>
                <div className="bounding_box" style={{
                    top: box.topRow, 
                    right: box.rightCol, 
                    bottom: box.bottomRow, 
                    left: box.leftCol}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;