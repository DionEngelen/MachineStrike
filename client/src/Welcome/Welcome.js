import React from "react";
import './Welcome.css';

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