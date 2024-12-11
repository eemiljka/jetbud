"use client";

import Sidebar from "@/components/Sidebar";

export default function Overview() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Balance Overview</h1>
        {/* Balance Overview content goes here */}
      </main>
    </div>
  );
}
