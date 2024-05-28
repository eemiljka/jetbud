"use client";

import Sidebar from "@/components/Sidebar";

export default function History() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold">History</h1>
        {/* history content goes here */}
      </main>
    </div>
  );
}
