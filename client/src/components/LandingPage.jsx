import React from "react";
import { Link } from "react-router-dom";
import perro from "../componentsCSS/perroland.jpg"
import "../componentsCSS/landing.css"

export default function LandingPage(){
    return (
        <div className="landingdiv">
            <div className="aa">
            <h1>Welcome</h1>
            <div className="btn-home-details">
            <Link className="link-landing" to="/home">
                <button className="btn-all"><span>Start</span></button>
            </Link>
            </div>
            </div>
        </div>
    )
}