import React, { useState, useEffect } from "react";
import * as Components from "../styles/loginCss.jsx";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function Login() {
  const [signIn, toggle] = useState(true);
  const [type, setType] = useState("email");
  const [data, setData] = useState({ userName: "", email: "", password: "" });

  const handleClick = () => {
    setType(type === "email" ? "text" : "email");
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        data
      );
      console.log(res.data.message);
    } catch (err) {
      console.log(err);
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
            placeholder={type === "text" ? "Username" : "Email"}
            name={type === "text" ? "userName" : "email"}
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
