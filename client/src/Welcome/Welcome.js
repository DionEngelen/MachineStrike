import React from "react";
import { useState, useEffect } from "react";
import "./Welcome.css";
import bellowback from "../images/WelcomeImages/Bellowback.png";
import clawstrider from "../images/WelcomeImages/Clawstrider.png";
import clamberjaw from "../images/WelcomeImages/Clamberjaw.png"
import fireclaw from "../images/WelcomeImages/Fireclaw.png";
import ravager from "../images/WelcomeImages/Ravager.png";
import redeyeWatcher from "../images/WelcomeImages/RedeyeWatcher.png";
import slitherfang from "../images/WelcomeImages/Slitherfang.png";
import sunwing from "../images/WelcomeImages/Sunwing.png";



export function Welcome() {
    const leftsideImages = [sunwing, redeyeWatcher, fireclaw, ravager];
    const rightsideImages = [clawstrider, clamberjaw, slitherfang, bellowback];

    const [currentLeftsideImage, setCurrentLeftsideImage] = useState(leftsideImages[0]);
    const [currentRightsideImage, setCurrentRightsideImage] = useState(rightsideImages[0]);

    useEffect(() => {
        const timer = setInterval(() => {
            const indexLeft = leftsideImages.indexOf(currentLeftsideImage);
            const nextLeftCurrentImageIndex = (indexLeft + 1) % leftsideImages.length;
            const indexRight = rightsideImages.indexOf(currentRightsideImage);
            const nextRightCurrentImageIndex = (indexRight + 1) % rightsideImages.length;

            setCurrentLeftsideImage(leftsideImages[nextLeftCurrentImageIndex]);
            setCurrentRightsideImage(rightsideImages[nextRightCurrentImageIndex]);
        }, 2500)
        return ()=> clearInterval(timer)
    })

   return ( 
    <div className="welcome-content">
        <div className="side left">
            <img alt="machine-images" className="sideimage left" src={currentLeftsideImage}/>
        </div>
        <div className="welcome-text">
            <h1>Welcome to Machine Strike!</h1> 
            <br/>
            <h2>The boardgame to make your machines fight for you!</h2>
            <br/>
            <h3>Machine strike is all about tactics. Position your machines strategically, use the landscape
                to your benefit and surprise your enemy when it is weakened.
            </h3>
            <h3>This turn-based game is played with two players who each have to elimate as many machines as
                possible to reach victory. Build your army to show who's best.
            </h3>
            <br/>
            <button className="playbutton">Start playing</button>
        </div>
        <div className="side right">
            <img alt="machine-images" className="sideimage right" src={currentRightsideImage}/>
        </div>
    </div>
   )
}