import React from "react";
import Navbar from "./Navbar";
export default function Registration(){
    return(
        <div className="register-main">
            <div className="container-name">
                <p><h2>Name:</h2></p>
                <p><input className="input-name"></input></p>
            </div>
            <div className="container-password">
                <p><h2>Password:</h2></p>
                <p><input className="input-password"></input></p>
            </div>
            <div className="container-email">
                <p><h2>E-mail:</h2></p>
                <p><input className="input-email"></input></p>
            </div>
        </div>
    )
}