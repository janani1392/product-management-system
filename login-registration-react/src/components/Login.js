import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  console.log("AuthContext login function:", login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        credentials: "include", // Important to include cookies
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login response data:", data);

        // Call login() from AuthContext to update global state
        login(data.token, data.role);

        alert("Login successful");
        setErrorMessage("");
        window.location.href = "http://localhost:3001/products";
        //navigate("/products"); // Use react-router-dom for navigation
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      setErrorMessage("An error occurred: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <h3>Debugging: Login Component Loaded</h3>
      <form onSubmit={handleSubmit} className="login-form">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;