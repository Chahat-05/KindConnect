import React from "react";
import "./landingPage.css";
import { useNavigate } from "react-router-dom";

export const LandingPage = () =>{
    const navigate = useNavigate();
    return (
        <div id="mainContainer">
            <div id="landingHeader">
                <div id="landingLogo"></div> 
                <div id="landingButtons">
                    <div className="landingButton">How this Works</div>
                    <div className="landingButton">Who are We</div>
                    <div className="landingButton" onClick={()=>{navigate('/login-signup')}}>Login/Signup</div>
                    <div className="landingButton" onClick={()=>{navigate('/register')}}>Register Organisation/Login</div>
                </div>
            </div>
            <div id="landingMain">
                <div id="landingMainHeading">
                    A Little Care Can Change The World
                </div>
            </div>
        </div>
    );
}

export default LandingPage;