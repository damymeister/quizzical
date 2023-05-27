import React, { useEffect, useState } from "react";
import hamburger from "./images/menu-bar.png";
import { Link } from "react-router-dom";
import logo from "./images/favicon.png"
import checkToken from "./authentication/checkToken"
import "./styles/navbar.css"
export default function Navbar() {
  const [isNavOpen, setisNavOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
    }
    

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
    {checkToken()? (
       <div className="navbar-options-container">
      <Link to="/stats"><button className="cont-button">Statistics</button></Link>
      <Link to="/profile"><button className="cont-button">Profile</button></Link>
      <button className="cont-button" onClick={handleLogout}>Logout</button>
      </div>
    )
      : (
        <div className="navbar-options-container">
      <Link to="/login"><button className="cont-button">Login</button></Link>
      <Link to="/register"><button className="cont-button">Register</button></Link>
      </div>
    )}
      <img
        className="hamburger-icon"
        onClick={() => setisNavOpen(!isNavOpen)}
        src={hamburger}
        alt="Ikona"
      />
       </div>
        { checkToken() ? (
        <div className={isNavOpen ? "small-nav-open" : "small-nav-disabled"}>
        <Link to="/stats"><button className="register-small-nav">Statistics</button></Link>
        <Link to="/profile"><button className="cont-button">Profile</button></Link>
        <button className="register-small-nav" onClick={handleLogout}>Logout</button>
        </div>
        ) : (
          <div className={isNavOpen ? "small-nav-open" : "small-nav-disabled"}>
          <Link to="/login"><button className="login-small-nav">Log in</button> </Link>
          <Link to="/register"><button className="register-small-nav">Register</button></Link>
          </div>
        )
        }
     
   
    </div>
  );
}
