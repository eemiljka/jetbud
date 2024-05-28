"use client";

import Sidebar from "@/components/Sidebar";

export default function Profile() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Profile</h1>
        {/* profile content goes here */}
      </main>
    </div>
  );
}
