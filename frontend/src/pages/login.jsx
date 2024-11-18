import React, { useState, useEffect } from "react";
import * as Components from "../styles/loginCss.jsx";
import axios from "axios";

function Login() {
  const [signIn, toggle] = useState(true);
  const [type, setType] = useState("email");
  const [data, setData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    avatar: null,
  });

  const handleClick = () => {
    setType(type === "email" ? "text" : "email");
  };

  const handleFileChange = (e) => {
    setData({ ...data, avatar: e.target.files[0] }); // Add the file to data
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/v1/users/login", {
        email: data.email,
        password: data.password,
        userName: data.userName,
      });
      console.log(res.data.message);
    } catch (err) {
      console.log(err);
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

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/register",
        formData
      );
      console.log(res.data);
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
