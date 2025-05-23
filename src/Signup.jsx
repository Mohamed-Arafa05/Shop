// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:3000/users");
      const exists = res.data.find((u) => u.email === email);

      if (exists) {
        setError("Email already exists.");
        return;
      }

      const newUser = {
        email,
        password,
        cart: [],
        purchased: [],
      };

      await axios.post("http://localhost:3000/users", newUser);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Signup failed. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-center text-2xl font-semibold mb-6">Kracked Studios</h1>
        <h2 className="text-lg font-bold mb-1">Sign up</h2>
        <p className="text-sm text-gray-600 mb-4">Create a new account to get started</p>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full border border-blue-600 px-4 py-2 rounded-md focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full border border-blue-600 px-4 py-2 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-md"
          >
            Sign up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-700 font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
