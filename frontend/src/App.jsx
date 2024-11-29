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
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice"; // Assuming you have an authSlice for actions

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1/users",
  withCredentials: true,
});

const App = () => {
  const user = useSelector((state) => state.auth.user); // Access user from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToLogin = () => {
    if (location.pathname !== "/login") {
      console.log(location.pathname);
      navigate("/login", {
        state: { from: location.pathname }, // Save attempted URL for redirection after login
        replace: true,
      });
    }
  };

  const checkAuth = async () => {
    try {
      const response = await api.get("/checkToken");

      if (response.data.success == 200) {
        dispatch(login(response.data.data)); 
        if (location.state?.from) {
          navigate(location.state.from, { replace: true });
        }
      } else {
        dispatch(logout()); 
        navigateToLogin();
      }
    } catch (error) {
      console.log(
        "Auth Error:",
        error.response?.data?.message || error.message
      );
      dispatch(logout()); // Dispatch logout on error
      navigateToLogin();
    }
  };

  useEffect(() => {
    if (!user) {
      checkAuth(); // Only check authentication if user is not already logged in
    }
  }, [user, dispatch, navigate, location]);

  return <Outlet />;
};

export default App;

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
