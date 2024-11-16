import React from "react";
import styles from "../styles/loginForm.module.css";

function LoginForm({ isLogin = true, handleToggle }) {
  return (
    <div>
      <form action="#" className="sign-in-form">
        <h2 className={`${styles.title}`}>{isLogin ? "Sign in" : "Sign up"}</h2>
        <div className={`${styles.input_field}`}>
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Username" />
        </div>
        <div className={`${styles.input_field}`}>
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Password" />
        </div>
        <input
          onClick={handleToggle}
          type="submit"
          value={`${isLogin ? "Log in" : "Register"}`}
          className={`${styles.btn} `}
        />
        <div className="flex">
          <pre> {isLogin ? " Don't" : "Already"} have an account?</pre>
          <a href="#" className="text-red-600">
            {isLogin ? "Sign up" : "Sign in"}
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
