"use client";

import React, { FormEvent } from "react";
import { useLogin } from "@/hoooks/apiHooks";
import { useRouter } from "next/navigation";

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
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
    </form>
  );
};

export default Login;
