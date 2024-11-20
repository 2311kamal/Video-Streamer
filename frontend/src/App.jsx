import React, { useEffect, useState } from "react";
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/homePage";
import Layout from "./components/layout";
import Library from "./pages/library";
import Login from "./pages/login";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1/users",
  withCredentials: true, // for cookies
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.post("/checkToken");
        if (response.data.success) {
          setUser(response.data.data); // Store user data
          setIsLoading(false);
          // If user was trying to access a protected route, redirect there
          if (location.state?.from) {
            navigate(location.state.from);
          }
        }
      } catch (error) {
        console.log("Auth Error:", error.response?.data?.message || error.message);
        if (location.pathname !== "/login") {
          navigate("/login", {
            state: { from: location.pathname }, // Save attempted URL
            replace: true
          });
        }
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, location]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />; 
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="library" element={<Library />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Route>
  )
);

export { router, App };
