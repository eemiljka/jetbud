"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError(""); // Clear previous errors
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      // Simulate login API call
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Store token
      router.push("/"); // Redirect to home
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
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
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 rounded-md w-full p-2 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md w-full p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white rounded-md p-2 w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
