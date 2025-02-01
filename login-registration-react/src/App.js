import React, { useContext, useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate  } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to products page if authenticated
    if (isAuthenticated) {
      window.location.href = "http://localhost:3001/products";
    }
  }, [isAuthenticated, navigate]);

  // Reset isRegistering state when navigating to the login page
  useEffect(() => {
    if (location.pathname === "/login") {
      setIsRegistering(false);
    }
  }, [location]);

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
  };

  const handleLogout = async () => {
    // Add logout logic here if needed
  };

  return (
    <div className="auth-container">
      {!isAuthenticated ? (
        <>
          {isRegistering ? (
            <>
              <Register />
              <p>
                Already have an account?{" "}
                <button onClick={toggleAuthMode}>Login here</button>
              </p>
            </>
          ) : (
            <>
              <Login />
              <p>
                Don't have an account?{" "}
                <button onClick={toggleAuthMode}>Register here</button>
              </p>
            </>
          )}
        </>
      ) : (
        <>
          <h2>Welcome, you are logged in!</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}