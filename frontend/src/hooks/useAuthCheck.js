import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";
import axios from "axios";

function useAuthCheck() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToLogin = () => {
    if (location.pathname !== "/login") {
      navigate("/login", {
        state: { from: location.pathname },
        replace: true,
      });
    }
  };

  const api = axios.create({
    baseURL: "http://localhost:4000/api/v1/users",
    withCredentials: true,
  });

  const checkAuth = async () => {
    try {
      const response = await api.get("/cur-user");

      if (response.data.success == 200) {
        dispatch(login(response.data.data));
      } else {
        dispatch(logout());
        navigateToLogin();
      }
    } catch (error) {
      console.log(
        "Auth Error:",
        error.response?.data?.message || error.message
      );
      dispatch(logout());
      navigateToLogin();
    }
  };
//   console.log("Inside useAuthCheck\n");
  useEffect(() => {
    // console.log("Inside useEffect\n");
    if (!user) {
      checkAuth();
    }
  }, [user, dispatch, navigate]);
}

export default useAuthCheck;
