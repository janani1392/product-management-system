import React, { useEffect, useContext } from "react"; // Add useContext
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { AppContainer, NavBar, Title } from "./styles"; // Import styled components
import Home from "./features/Products/pages/Home";
import About from "./features/Products/pages/About";
import Services from "./features/Products/pages/Services";
import WebDevelopment from "./features/Products/pages/services/WebDevelopment";
import AppDevelopment from "./features/Products/pages/services/AppDevelopment";
import ProductList from "./features/Products/components/ProductList"; // Updated import
import axiosInstance from "./services/axios"; // Axios instance for backend calls
import { AuthContext } from "./context/AuthContext"; // Import AuthContext

const handleLogout = async (navigate, logout) => { // Add logout as a parameter
  try {
    await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
    logout(); // Clear context state
    window.location.href = "http://localhost:3000/login"; // Redirect to login-registration-react and clear frontend state
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      try {
        await axiosInstance.get("/auth/verify");
      } catch (error) {
        console.error("Session invalid. Redirecting to login.");
        window.location.href = "http://localhost:3000/";
      }
    };

    validateSession();
  }, [navigate]);

  return children;
};

const App = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Get logout from AuthContext

  return (
    <AppContainer>
      <Title>Welcome to My React Router Demo</Title>

      <NavBar>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <button
              onClick={() => handleLogout(navigate, logout)} // Pass logout to handleLogout
              style={logoutButtonStyle}
            >
              Logout
            </button>
          </li>
        </ul>
      </NavBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />}>
          <Route path="web-development" element={<WebDevelopment />} />
          <Route path="app-development" element={<AppDevelopment />} />
        </Route>
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppContainer>
  );
};

const logoutButtonStyle = {
  background: "none",
  border: "none",
  color: "blue",
  cursor: "pointer",
  textDecoration: "underline",
};

export default App;
