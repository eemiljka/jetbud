"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRegister } from "@/hoooks/apiHooks";

const Register: React.FC = () => {
  const router = useRouter();
  const { register, registerIsLoading, registerError } = useRegister();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const username = formData.get("username")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const token = await register(email, username, password);
    if (token) {
      router.push("/");
    } else {
      console.error("Register failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        style={{ width: "500px" }}
        className="bg-white rounded-lg shadow-md p-8"
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-10 flex justify-center">
            Register
          </h2>
          <input
            className="border border-gray-300 rounded-md w-full p-2 mb-4"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="border border-gray-300 rounded-md w-full p-2 mb-4"
            type="username"
            name="username"
            placeholder="Username"
            required
          />
          <input
            className="border border-gray-300 rounded-md w-full p-2 mb-4"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button
            className=" text-white hover:bg-zinc-600 bg-zinc-500 w-full rounded-md p-2"
            type="submit"
          >
            Register
          </button>
          {registerError && <p style={{ color: "red" }}>{registerError}</p>}
          <Link href="/login" legacyBehavior>
            <a className="text-zinc-600 mt-6 hover:underline flex justify-center">
              Already a member? Sign in here!
            </a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
