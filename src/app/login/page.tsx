"use client";

import React from "react";
import { Navigate } from "react-router-dom";

// Login Page
const Login: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const onButtonClick = () => {
    // Clear errors
    setUsernameError("");
    setPasswordError("");

    // Validate username
    if (!username) {
      setUsernameError("Username is required");
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    // Login logic here
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="bg-white rounded-lg shadow-md p-8"
        style={{ width: "500px" }}
      >
        <h2 className="text-2xl font-semibold mb-10 flex justify-center">
          Login
        </h2>
        <p>Username</p>
        <input
          type="text"
          className="border border-gray-300 rounded-md w-full p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameError && <p className="text-red-500">{usernameError}</p>}
        <p className="mt-4">Password</p>
        <input
          type="password"
          className="border border-gray-300 rounded-md w-full p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}
        <button
          className="bg-blue-500 text-white rounded-md p-2 mt-4 w-full"
          onClick={onButtonClick}
        >
          Login
        </button>
        <p className="text-center mt-4">
          Don&apos;t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => Navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
