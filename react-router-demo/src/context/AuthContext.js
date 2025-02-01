// AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    verifyToken();
  }, []);


  const verifyToken = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/verify", {
        method: "GET",
        credentials: "include",
      });
  
      if (response.ok) {
        const data = await response.json();
        setUserRole(data.role);
        setIsAuthenticated(true);
      } else if (response.status === 401) {
        // Try refreshing the token
        await refreshToken();
      } else {
        throw new Error("Token verification failed");
      }
    } catch (error) {
      console.error("Token verification error:", error);
      setIsAuthenticated(false);
      window.location.href = "/login";
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });
  
      if (response.ok) {
        console.log("Token refreshed successfully");
        verifyToken(); // Re-verify the token and user role
      } else {
        console.error("Token refresh failed");
        setIsAuthenticated(false);
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
      setIsAuthenticated(false);
      window.location.href = "/login";
    }
  };
  
  const startTokenRefreshTimer = (expirationTime) => {
    // Calculate when to refresh (e.g., 1 minute before expiration)
    const refreshTime = expirationTime - Date.now() - 60 * 1000;
  
    if (refreshTime > 0) {
      setTimeout(() => {
        refreshToken();
      }, refreshTime);
    }
  };
  
  // Call this after successful login or token verification
  useEffect(() => {
    if (isAuthenticated) {
      const tokenExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // Example: hardcoded 7 days
      startTokenRefreshTimer(tokenExpiry);
    }
  }, [isAuthenticated]);
  



  const login = (role) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};