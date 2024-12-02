import React, { useState } from "react";
import * as Components from "../styles/loginCss.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { apiCall } from "../utils/handleApiCall.js";
import { loginUser, registerUser } from "../api/userApi.js";
import useAuthCheck from "../hooks/useAuthCheck.js";

function Login() {
  useAuthCheck();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [signIn, toggle] = useState(true);
  const [type, setType] = useState("username");
  const [data, setData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    avatar: null,
  });

  const handleClick = () => {
    if (type === "username") {
      setData({
        ...data,
        email: data.userName,
        userName: "",
      });
    } else {
      setData({
        ...data,
        userName: data.email,
        email: "",
      });
    }

    setType(type === "email" ? "username" : "email");
  };

  const handleFileChange = (e) => {
    setData({ ...data, avatar: e.target.files[0] });
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async () => {
    const { response, error } = await apiCall(
      loginUser,
      {
        email: data.email,
        password: data.password,
        userName: data.userName,
      },
      { withCredentials: true }
    );

    if (error) {
      console.log(error);
      return;
    }

    if (response?.status === 200) {
      dispatch(login(response.data.data.user));
      navigate(location.state?.from || "/");
    }
  };

  const handleSignUp = async () => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);

    // Append the file
    if (data.avatar) {
      formData.append("avatar", data.avatar); // 'avatar' must match your backend field
    }

    // console.log(data.avatar);

    const { response, error } = await apiCall(registerUser, formData);

    if (error) {
      console.log(error);
      return;
    }
    if (response.status === 201) {
      navigate("/login");
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            name="fullName"
          />
          <Components.Input
            onChange={handleChange}
            type="text"
            placeholder="Username"
            name="userName"
          />
          <Components.Input
            onChange={handleChange}
            type="email"
            placeholder="Email"
            name="email"
          />
          <Components.Input
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
          />

          <Components.Input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            name="avatar"
          />

          <Components.Button type="button" onClick={handleSignUp}>
            Sign Up
          </Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form>
          <Components.Title>Login</Components.Title>
          <Components.Input
            onChange={handleChange}
            type={type}
            placeholder={type === "username" ? "Username" : "Email"}
            name={type === "username" ? "userName" : "email"}
          />
          <Components.Button type="button" onClick={handleClick}>
            {type !== "email" ? "Use Email" : "Use Username"}
          </Components.Button>
          <Components.Input
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button type="button" onClick={handleSignIn}>
            Sign In
          </Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default Login;
