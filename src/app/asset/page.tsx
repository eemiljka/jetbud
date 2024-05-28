"use client";

import Sidebar from "@/components/Sidebar";

export default function Asset() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold">My assets</h1>
        {/* Asset content goes here */}
      </main>
    </div>
  );
}
