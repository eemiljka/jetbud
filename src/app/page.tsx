"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import HomeContent from "@/components/HomeContent";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login if token is missing
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex">
      <Sidebar />
      <HomeContent />
    </div>
  );
};

export default Home;
