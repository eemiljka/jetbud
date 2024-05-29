"use client";

import Sidebar from "@/components/Sidebar";
import Divider from "@/components/Divider";
import React from "react";
import { PencilIcon } from "@heroicons/react/20/solid";

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
            <h2 className="text-2xl font-semibold mb-10 flex justify-center">
              Profile
            </h2>
            <p>Name</p>
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">John Doe</h3>
              <button className="hover:bg-zinc-100 rounded-md p-1">
                <PencilIcon className="w-5 h-5 text-zinc-600" />
              </button>
            </div>
            <Divider />
            <p className="mt-10">Email</p>
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">john.doe@example.com</h3>
              <button className="hover:bg-zinc-100 rounded-md p-1">
                <PencilIcon className="w-5 h-5 text-zinc-600" />
              </button>
            </div>
            <Divider />
            <p className="mt-10">Password</p>
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">******************</h3>
              <button className="hover:bg-zinc-100 rounded-md p-1">
                <PencilIcon className="w-5 h-5 text-zinc-600" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
