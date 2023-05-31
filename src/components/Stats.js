import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import "./styles/stats.css"
import { Link } from "react-router-dom";
export default function Stats() {
  const [userData, setUserData] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const themeMode = useSelector(state => state.mode)
  async function checkSpecifiedUser(userId) {
    try {
      const url = `http://localhost:5000/results/${userId}`;
      const { data: res } = await axios.get(url);
      const results = res.results.map((result) => (
        <p className="rows-modal" key={result.counter}>
          <h4>Result:</h4> {result.outcome}  <h4>Date:</h4>{result.date}
          </p>
      ));
      setUserDetails(
        <div className="user-details">
          <p><h3>Username:</h3> {res.username}</p>
          <p><h3>Email:</h3> {res.email}</p>
          <p><h3>Results:</h3> {results}</p>
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  }

  const fetchUserData = async () => {
    try {
      const url = `http://localhost:5000/results`;
      const { data } = await axios.get(url);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setUserDetails(null);
  };
  
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className={`stats-main ${themeMode}`}>
    <div className="stats-container">
       <Link to ="/"><span className="arrow-back"><i class="fas fa-arrow-left"></i></span></Link>
      <h1>Users Statistics</h1>
      {userData.map((data) => (
        <div className="stats-user" key={data.userId}>
          <p><h4>Username:</h4> {data.name}</p>
          <p><h4>Average result:</h4> {data.bestAvgOutcome && data.bestAvgOutcome.toFixed(2)}</p>
          <button onClick={() => checkSpecifiedUser(data.userId)}>Check this user</button>
        </div>
      ))}
     {userDetails && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={closeModal}>&times;</span>
            {userDetails}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
