import React from "react";
import { useState } from "react";
import "./PickBoard.css";

export function PickBoard({chooseBoard}) {
    const raintrace = {
        name: "The Raintrace",
        tiles: ["hill", "mountain", "grassland", "mountain", "mountain", "grassland",
        "hill", "marsh", "grassland", "hill", "mountain", "grassland",
        "mountain", "mountain", "grassland", "hill", "marsh", "grassland",
        "hill", "mountain", "grassland", "mountain", "mountain", "grassland",
        "hill", "marsh", "grassland", "hill", "mountain", "grassland",
        "mountain", "mountain", "grassland", "hill", "marsh", "grassland",
        "hill", "mountain", "grassland", "mountain", "mountain", "grassland",
        "hill", "marsh", "grassland", "hill", "mountain", "grassland",
        "mountain", "mountain", "grassland", "hill", "marsh", "grassland",
        "hill", "mountain", "grassland", "mountain", "mountain", "grassland",
        "hill", "marsh", "grassland", "hill"]
    }
    const bulwark = {
        name: "The Bulwark",
        tiles: ["hill", "hill", "grassland", "mountain", "mountain", "grassland",
        "hill", "marsh", "grassland", "hill", "mountain", "grassland",
        "mountain", "mountain", "grassland", "hill", "marsh", "grassland",
        "hill", "mountain", "grassland", "mountain", "mountain", "grassland",
        "hill", "marsh", "grassland", "hill", "mountain", "grassland",
        "mountain", "mountain", "grassland", "marsh", "marsh", "marsh",
        "hill", "mountain", "grassland", "mountain", "mountain", "grassland",
        "grassland", "marsh", "grassland", "hill", "mountain", "grassland",
        "mountain", "mountain", "grassland", "hill", "marsh", "grassland",
        "hill", "mountain", "grassland", "grassland", "mountain", "grassland",
        "hill", "marsh", "grassland", "mountain"]
    }
    const cinnabarSands = {
        name: "Cinnabar Sands",
        tiles: ["grassland", "hill", "grassland", "mountain", "mountain", "grassland",
        "hill", "marsh", "grassland", "hill", "mountain", "grassland",
        "mountain", "mountain", "grassland", "mountain", "marsh", "marsh",
        "hill", "mountain", "grassland", "mountain", "mountain", "grassland",
        "hill", "marsh", "grassland", "hill", "mountain", "grassland",
        "mountain", "mountain", "grassland", "marsh", "marsh", "marsh",
        "hill", "mountain", "grassland", "marsh", "mountain", "grassland",
        "grassland", "marsh", "grassland", "hill", "mountain", "grassland",
        "mountain", "mountain", "grassland", "hill", "marsh", "grassland",
        "hill", "hill", "grassland", "grassland", "mountain", "grassland",
        "hill", "marsh", "grassland", "mountain"]
    }

    const [board, setBoard] = useState(null);

    return(
        <div className="pick-board">
            <div className="leftside">
            </div>
            <div className="select-board">
                <h2>Choose a board you like</h2>
                <div className="raintrace">
                    <button
                    onMouseEnter={() => setBoard(raintrace)}
                    onMouseLeave={() => setBoard(null)}
                    onClick={() => chooseBoard(board)}>The Raintrace</button>
                </div>
                <div className="bulwark">
                    <button
                    onMouseEnter={() => setBoard(bulwark)}
                    onMouseLeave={() => setBoard(null)}
                    onClick={() => chooseBoard(board)}>The Bulwark</button>
                </div>
                <div className="cinnabar-sands">
                    <button
                    onMouseEnter={() => setBoard(cinnabarSands)}
                    onMouseLeave={() => setBoard(null)}
                    onClick={() => chooseBoard(board)}>Cinnabar Sands</button>
                </div>
            </div>
            <div className="show-board">
                {board && board.tiles.map((tile, index) => (
                    <div
                    key={index}
                    className={tile}></div>
                    ))
                }
            </div>
        </div>
    )
}