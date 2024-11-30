import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";
import { apiCall } from "../utils/handleApiCall";
import { getCurUser } from "../api/userApi";

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

  const checkAuth = async () => {
    const { response, error } =  await apiCall(getCurUser);
    if (error) {
      console.log("Auth Error:", error);
      dispatch(logout());
      navigateToLogin();
      return;
    }
    if (response.data.success == 200) {
      dispatch(login(response.data.data));
    } else {
      dispatch(logout());
      navigateToLogin();
    }
  };
  useEffect(() => {
    if (!user) {
      checkAuth();
    }
  }, [user, dispatch, navigate]);
}

export default useAuthCheck;
