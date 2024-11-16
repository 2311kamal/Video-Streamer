import React, { useState } from "react";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-900">
      {/* Background Animation */}
      <div
        className={`absolute inset-0 transition-all duration-1000 z-0 ${
          isLogin
            ? "bg-gradient-to-r from-purple-500 to-pink-500"
            : "bg-gradient-to-l from-purple-500 to-pink-500"
        }`}
      ></div>

      {/* Page Content */}
      <div className="relative z-10 flex h-full w-full transition-transform duration-1000">
        {/* Login/Signup Section */}
        <div
          className={`flex flex-col items-center justify-center w-1/2 p-10 bg-gray-800 ${
            isLogin ? "order-first" : "order-last"
          } transition-all duration-1000`}
        >
          <h2 className="mb-4 text-4xl font-bold text-white">
            {isLogin ? "Login" : "Register"}
          </h2>
          <form className="w-2/3 space-y-4">
            {/* Username Field */}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 bg-transparent border-b-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="absolute top-2 right-4 text-gray-400">👤</span>
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 bg-transparent border-b-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="absolute top-2 right-4 text-gray-400">🔒</span>
            </div>

            {/* Submit Button */}
            <button className="w-full py-2 font-semibold text-white bg-pink-600 rounded-md hover:bg-pink-700">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={handleToggle}
              className="font-bold text-pink-400 hover:text-pink-600"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>

        {/* Welcome Section */}
        <div
          className={`flex flex-col items-center justify-center w-1/2 p-10 transition-all duration-1000 ${
            isLogin ? "bg-purple-600" : "bg-pink-600"
          }`}
        >
          <h2 className="mb-4 text-4xl font-bold text-white">Welcome Back!</h2>
          <p className="text-center text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Deleniti,
            rem?
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
