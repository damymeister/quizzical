import React, { useEffect, useState } from "react";
import hamburger from "./images/menu-bar.png";
import { Link } from "react-router-dom";
import logo from "./images/favicon.png"

export default function Navbar() {
  const [isNavOpen, setisNavOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth > 700) {
      setisNavOpen(false);
    }
  }, [screenWidth]);

  return (
    <div className="navbar-container">
    <div className="navbar-main">
    <img className="logo-navbar" src={logo}></img>
    <div className="navbar-options-container">
      <Link to="/login">
        <button className="login">Log in</button>
      </Link>
      <Link to="/register">
        <button className="register">Register</button>
      </Link>
      <Link to="/stats">
        <button className="register">Statistics</button>
      </Link>
      </div>
      <img
        className="hamburger-icon"
        onClick={() => setisNavOpen(!isNavOpen)}
        src={hamburger}
        alt="Ikona"
      />
       </div>
      <div className={isNavOpen ? "small-nav-open" : "small-nav-disabled"}>
          <Link to="/login">
            <button className="login-small-nav">Log in</button>
            </Link>
            <Link to="/register">
              <button className="register-small-nav">Register</button>
            </Link>
          <Link to="/stats">
              <button className="register-small-nav">Stats</button>
            </Link>
      </div>
   
    </div>
  );
}
