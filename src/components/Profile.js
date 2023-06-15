import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/register.css";
import checkToken from "./authentication/checkToken";
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';
import StyledH1 from "./styles/StyledComponents/h1.tsx";
export default function Profile() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [resMsg, setResMsg] = useState("");
  const token = checkToken();
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [passwordChanged,setPasswordChanged] = useState(false)
  const themeMode = useSelector(state => state.mode)
  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken._id;
      setUserId(userId);
      fetchUserData(userId);
    }
  }, [token]);
  useEffect(() => {
    if (passwordChanged) {
        localStorage.removeItem("token");
        window.location = "/"
    }
  }, [passwordChanged]);

  const fetchUserData = async (userId) => {
    try {
      const url = `http://localhost:5000/api/users/${userId}`;
      const { data } = await axios.get(url);
      setUserData(data);
      setName(data.name);
      setEmail(data.email);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:5000/api/users/${userId}`;
      const registrationData = { name, password, email };
      const { data: res } = await axios.put(url, registrationData);
      setResMsg(res.message);
      setTimeout(() => {
        setPasswordChanged(res.passwordChanged);
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };
  const deleteUser = async (e) => {
    e.preventDefault();
    try {
    const url = `http://localhost:5000/api/users/${userId}`;
      const { data: res } = await axios.delete(url);
      setResMsg(res.message);
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location = "/"
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  if (!checkToken()) {
    return <Link to="/login">Log in to continue</Link>;
  } else {
    return (
      <div className={`register-body ${themeMode}`}>
      <div className="register-main">
           <Link to ="/"><span className="arrow-back"><i class="fas fa-arrow-left"></i></span></Link>
           <StyledH1>Update User</StyledH1>
        {userData && (
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
            <div className="container-input">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                required
                className="input-field"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
            </div>
            {error ? <div className="error_msg">{error}</div> : resMsg !== "" && <div className="error_msg">{resMsg}</div>}
            <div className="buttons-profile">
            <button className="register-button" type="submit">Update</button>
            <button className="register-button" onClick={deleteUser}>Delete Account</button>
            </div>
          </form>
        )}
      </div>
      </div>
    );
  }
}