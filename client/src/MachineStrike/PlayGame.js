import React from "react";
import "./PlayGame.css";

export function PlayGame({board, machinesp1, machinesp2}) {
    return (
        <div className="game">
            <div className="p1-info">
                <p>Info player 1</p>
                <p>Show pieces on hover</p>
                <div className="p1-machinepieces">
                {machinesp1.map((machine) => (
                    <div className="machine-piece">{machine.name}</div>
                ))}
                </div>
            </div>
            <div className="gameboard">
                {board.tiles.map((tile, index) => (
                    <div
                    key={index}
                    className={tile}></div>
                    ))}
            </div>
            <div className="p2-info">
                <p>Info player 2</p>
                <p>Show pieces on hover</p>
                <div className="p2-machinepieces">
                {machinesp2.map((machine) => (
                    <div className="machine-piece">{machine.name}</div>
                ))}
                </div>
            </div>
        </div>
    )
}