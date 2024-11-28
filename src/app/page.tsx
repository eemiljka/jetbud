"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import HomeContent from "@/components/HomeContent";

const Home: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <HomeContent />
    </div>
  );
};

export default Home;
