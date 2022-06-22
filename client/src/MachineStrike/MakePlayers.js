import React from "react";
import { useState } from "react";
import "./MakePlayers.css";
import horizonbanner from "../images/PlayerInputImages/HorizonBanner.png";

export function MakePlayers({makeplayer1, makeplayer2}) {
    const [errorMessage, setErrorMessage] = useState("");
    const [playerOne, setPlayerOne] = useState("");
    const [playerTwo, setPlayerTwo] = useState("");

    function confirmPlayers(e) {
        e.preventDefault();
        if (!playerOne) {
            setErrorMessage("A name is required for player 1");
            return;
        }
        if (!playerTwo) {
            setErrorMessage("A name is required for player 2");
            return;
        }
        if (playerOne === playerTwo) {
            setErrorMessage("Each player should have a unique name");
            return;
        }
        setErrorMessage("");
        makeplayer1(playerOne);
        makeplayer2(playerTwo);
    }

    return ( 
        <div> 
            <form onSubmit={(e) => confirmPlayers(e)}>
                <input value={playerOne}
                    placeholder="Player 1 name"
                    onChange={(e) => setPlayerOne(e.target.value)}
                />

                <input value={playerTwo}
                    placeholder="Player 2 name"
                    onChange={(e) => setPlayerTwo(e.target.value)}
                />

                <p className="errorMessage">{errorMessage}</p>

                <button className="startGameButton" type="submit">
                    Proceed
                </button>
            </form>
            <div>
                <img
                className="horizonbanner" 
                src={horizonbanner}
                alt="Horizon Banner"/>
            </div>
        </div>  
    )
}