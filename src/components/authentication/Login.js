import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/login.css"
import checkToken from "./checkToken";
import { useSelector } from 'react-redux';
export default function Registration() {
  const themeMode = useSelector(state => state.mode)
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [resMsg, setresMsg] = useState("")
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/auth";
      const loginData = { name, password};
      const { data: res } = await axios.post(url, loginData)
      localStorage.setItem("token", res.data)
      setresMsg(res.message)
      window.location = "/"
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      )
      {
        setError(error.response.data.message);
      }
    }
  };
  if (checkToken()) {
    return <Link to ="/">You are logged in</Link>
  } else {
    return (
      <div className={`login-body ${themeMode}`}>
      <div className="login-main">
           <Link to ="/"><span className="arrow-back"><i class="fas fa-arrow-left"></i></span></Link>
        <h1 className="login-account">Log in</h1>
        <form onSubmit={handleSubmit}>
          <div className="container-input">
            <ion-icon name="arrow-forward-circle-outline"></ion-icon>
            <input
              required
              className="input-field"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div className="container-input">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              required
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          {error ? (
            <div className="error_msg">{error}</div>
          ) : (
            resMsg !== "" && <div className="error_msg">{resMsg}</div>
          )}
          <button className="login-button" type="submit">
            Log in!
          </button>
        </form>
        <Link to="/register" className="if-noacc">
          You dont have an Account?
        </Link>
      </div>
      </div>
    );
  }
}