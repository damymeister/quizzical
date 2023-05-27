import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Stats() {
  const [userData, setUserData] = useState([]);
 async function checkSpecifiedUser(userId){
    try {
      const url = `http://localhost:5000/results/${userId}`;
      const { data: res } =  await axios.get(url);
      console.log(res);
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

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <h1>User Statistics</h1>
      {userData.map((data) => (
        <div key={data.userId}>
          <p>UserID: {data.userId}</p>
          <p>Best outcome: {data.bestAvgOutcome && data.bestAvgOutcome.toFixed(2)}</p>
          <p>Name: {data.name}</p>
          <button onClick={() => checkSpecifiedUser(data.userId)}>Check this user</button>
        </div>
      ))}
    </div>
  );
}
