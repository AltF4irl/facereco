import React from "react";
import './Navigation.css';
import icon from "./facereco.png";
const Navigation = ({ onRouteChange, isSignedIn, route }) => {
    if (isSignedIn === true) {
        return(
            <nav>
                <div className="logo">
                    <img src={icon} alt="logo"/>
                    <p className="f4">FaceReco</p>
                </div>

                <button onClick={() => onRouteChange('signin')} className="signout">Sign Out</button>
                
            </nav>
        )
    } else {
            return (
                <nav>
                    <div className="logo">
                        <img src={icon} alt="logo"/>
                        <p className="f4">FaceReco</p>
                    </div>
    
                    <div className="sr">
                    {
                        route === 'signin'
                        ? <div>
                            <button id="signinbtn" onClick={() => onRouteChange('signin')} className="signout active">Sign in</button>  
                            <button id="registerbtn" onClick={() => onRouteChange('register')} className="signout">Register</button>
                        </div>
                        :  <div>
                            <button id="signinbtn" onClick={() => onRouteChange('signin')} className="signout">Sign in</button>  
                            <button id="registerbtn" onClick={() => onRouteChange('register')} className="signout active">Register</button>
                        </div>
                    }
                           
                    </div>
                    
                </nav>
            )
       
        
        
    }
        
}

export default Navigation;