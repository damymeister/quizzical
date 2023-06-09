import React, { useState } from "react";
import axios from "axios";
import "../styles/register.css"
import checkToken from "./checkToken";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import StyledH1 from "../styles/StyledComponents/h1.tsx"
export default function Registration() {
  const themeMode = useSelector(state => state.mode)
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [resMsg, setresMsg] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/users";
      const registrationData = { name, password, email };
      const { data: res } = await axios.post(url, registrationData);
      setresMsg(res.message)
      setTimeout(() => {
        window.location = "/login"
      }, 3000);
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
if(checkToken()){
  return <Link to ="/">You are logged in</Link>
}else{
  return (
    <div className={`register-body ${themeMode}`}>
    <div className="register-main">
         <Link to ="/"><span className="arrow-back"><i class="fas fa-arrow-left"></i></span></Link>
      <StyledH1>Create Account</StyledH1>
      <form onSubmit={handleSubmit}>
        <div className="container-input">
        <ion-icon name="arrow-forward-circle-outline"></ion-icon>
            <input
              required
              className="input-field"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
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
            ></input>
            <label>Password</label>
        </div>
        <div className="container-input">
        <ion-icon name="mail-outline"></ion-icon>
            <input
              required
              className="input-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label>Email</label>
        </div>
        {error ? (<div className="error_msg">{error}</div>) : resMsg !== "" && <div className="error_msg">{resMsg}</div> }
        <button className="register-button" type="submit">
          Register!
        </button>
      </form>
      <Link  to="/login" className="if-registered">Already registered?</Link>
    </div>
    </div>
  );
}
}