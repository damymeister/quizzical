import React from "react";
import hamburger from "./images/menu-bar.png"
export default function Navbar(){
    const [isNavOpen, setisNavOpen] = React.useState(false)
    return(
        <div className="navbar-main">
            <button className="login">Log in</button>
            <button className="register">Register</button>
            <img class="hamburger-icon" onClick={() => setisNavOpen(!isNavOpen)} src={hamburger} alt="Ikona" />
        <div className={isNavOpen ? 'small-nav-open' : 'small-nav-disabled'}>
            <ul>
                <li><button className="login-small-nav">Log in</button></li>
                <li><button className="register-small-nav">Register</button></li>
            </ul>
            </div>
        </div>
    )
}