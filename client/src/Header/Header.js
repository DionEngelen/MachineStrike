import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
    return (
        <div className="navigation">
            <Link to="/">Welcome</Link>
            <Link to="/rules">Rules</Link>
            <Link to="/machinestrike">Play</Link>
        </div>
    )
}