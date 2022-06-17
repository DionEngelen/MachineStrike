import React from "react";
import "./Welcome.css";
import bellowback from "../images/Bellowback.png";
import clawstrider from "../images/Clawstrider.png";
import fanghorn from "../images/Fanghorn.png";
import fireclaw from "../images/Fireclaw.png";
import ravager from "../images/Ravager.png";
import redeyeWatcher from "../images/RedeyeWatcher.png";
import slitherfang from "../images/Slitherfang.png";
import sunwing from "../images/Sunwing.png";

const leftsideImages = [clawstrider, fanghorn, slitherfang, ravager];
const rightsideImages = [sunwing, redeyeWatcher, fireclaw, bellowback];

export function Welcome() {
   return ( 
    <div className="welcome-content">
        <div>
            <p>Left side bar</p>
        </div>
        <div>
            <p>Welcome to Machine Strike!</p> 
            <br/>
            <p>One</p>
            <br/>
            <p>Two</p>
            <br/>
            <p>Three</p>
        </div>
        <div>
            <p>Right side bar</p>
        </div>
    </div>
   )
}