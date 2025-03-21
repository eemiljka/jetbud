"use client";

import React, { FormEvent } from "react";
import { useLogin } from "@/hoooks/apiHooks";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login: React.FC = () => {
  const router = useRouter();
  const { login, loginIsLoading, loginError } = useLogin();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const token = await login(email, password);
    if (token) {
      router.push("/");
    } else {
      console.error("Login failed");
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
            Login
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
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button
            className=" text-white hover:bg-zinc-600 bg-zinc-500 w-full rounded-md p-2"
            type="submit"
          >
            Login
          </button>
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          <Link href="/register" legacyBehavior>
            <a className="text-zinc-600 mt-6 block hover:underline flex justify-center">
              Not a member? Register here!
            </a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
