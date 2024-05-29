"use client";

import Sidebar from "@/components/Sidebar";
import Divider from "@/components/Divider";
import React from "react";

export default function Profile() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        {/* profile content goes here */}
        <div className="flex justify-center">
          <div
            className="bg-white rounded-lg shadow-md p-8"
            style={{ width: "500px", height: "500px" }}
          >
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            <h3 className="text-xl mb-4">Name: John Doe</h3>
            <Divider />
          </div>
        </div>
      </main>
    </div>
  );
}
