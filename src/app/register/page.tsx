"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    setError(""); // Clear previous errors
    if (!username || !password || !email) {
      setError("Email, username and password are required to login.");
      return;
    }

    try {
      // Simulate login API call
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
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
          Register
        </h2>
        <input
          type="text"
          placeholder="Email"
          className="border border-gray-300 rounded-md w-full p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
          onClick={handleRegister}
          className="bg-green-500 text-white rounded-md p-2 w-full hover:bg-green-600"
        >
          Register
        </button>
        <Link href="/login" legacyBehavior>
          <a className="text-zinc-600 mt-6 flex justify-center hover:underline">
            Already a member? Sign in!
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Register;
