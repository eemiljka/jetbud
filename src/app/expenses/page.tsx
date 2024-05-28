"use client";

import Sidebar from "@/components/Sidebar";

export default function Expenses() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold">My expenses</h1>
        {/* Asset content goes here */}
      </main>
    </div>
  );
}
