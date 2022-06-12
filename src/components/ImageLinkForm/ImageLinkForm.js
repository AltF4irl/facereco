import React from "react";
import { renderIntoDocument } from "react-dom/test-utils";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return(
        <div className="mform center">
            <p>Face detection at it's finest</p>
            <div className="form">
                <input className="url" type="text" placeholder="Paste your url" onChange={onInputChange}/>
                <input className="submit" type="submit" value="Detect" onClick={onSubmit}/>
            </div>
            {/* <p>Magic will appear bellow</p> */}
        </div>
    )
}

export default ImageLinkForm;