  import React, { createContext, useState, useEffect } from "react";

  export const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    // Function to verify session and set authentication state
    useEffect(() => {
      const verifySession = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/auth/verify", {
            method: "GET",
            credentials: "include", // Include HttpOnly cookies
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Verification successful:", data);
            setIsAuthenticated(true);
            setUserRole(data.role); // Assuming the backend sends the user role
          } else {
            setIsAuthenticated(false);
            setUserRole(null);
          }
        } catch (error) {
          console.error("Error verifying session:", error);
          setIsAuthenticated(false);
          setUserRole(null);
        }
      };

      verifySession();
    }, []);

    // Login function to update state after successful login
    const login = (role) => {
      setIsAuthenticated(true);
      setUserRole(role);
    };

    // Logout function to call backend and clear state
    const logout = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/logout", {
          method: "POST",
          credentials: "include", // Include cookies
        });

        if (response.ok) {
          setIsAuthenticated(false);
          setUserRole(null);
        } else {
          console.error("Failed to log out");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    return (
      <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
