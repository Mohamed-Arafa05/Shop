import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from './Home';
import Signup from './Signup';
import Cart from './Cart'
import Login from './Login';
import Prodict from './Prodict';
import axios from "axios";


const App = () => {
  const [loggedUser, setLoggedUser] = useState({});

   const fetchUser = async ( setLoggedUser) => {
    try {
      const storedUserId = localStorage.getItem("userId");
      const res = await axios.get(`http://localhost:3000/users/1`);
      setLoggedUser(res.data);
      console.log("User data fetched:", res.data);
      return res.data; // ✅ Return the fetched user
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  useEffect(() => {
    
    const storedUserId = localStorage.getItem("userId");
    fetchUser(setLoggedUser);
  }, []);
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>} />
      <Route path="/Prodict" element={<Prodict />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
    </div>
  );
};

export default App;
