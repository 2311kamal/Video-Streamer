import React, { useState } from "react";
import Form from "../components/form";

function Login() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [isExpanded, setIsExpanded] = useState(false); // State to control the gradient expansion

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setIsExpanded(true); // Trigger gradient expansion
  };

  return (
    <div className="relative h-screen flex">
      {/* Login Form Section (Left side) */}
      <div className="ml-20 mb-20 lg:ml-0 lg:mb-0 items-center flex">
        <Form isLogin={isLogin} handleToggle={handleToggle} />
      </div>

      <div
        className={`transition-all duration-1000 ease-in-out bg-myRedGradient h-full ${
          isExpanded ? "  w-full  trapezium2" : "w-5/6 trapezium"
        } absolute top-0 right-0 flex items-center justify-center `}
      >
        <div className={`flex flex-col items-center w-full lg:w-1/2 lg:h-auto ml-24 lg:ml-48 transition-all duration-700  ${isExpanded?"opacity-0":""}`  }>
          <h1 className="text-4xl font-bold text-center text-white">Welcome</h1>
          <h2 className="text-2xl text-center my-4 w-3/4 lg:w-1/2 text-white">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit
          </h2>
          <h3 className="text-lg text-center mx-4 sm:text-sm md:text-lg sm:max-w-xs lg:mx-0 max-w-md text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem animi
            eum ipsam nulla aut quidem nam eaque illo laboriosam illum?
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Login;
