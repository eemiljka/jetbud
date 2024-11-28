"use client";

import React from "react";
import Link from "next/link";
import PlusCircleIcon from "@heroicons/react/20/solid/PlusCircleIcon";

const HomeContent: React.FC = () => {
  return (
    <main className="flex-frow p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-center">
        <div
          className="bg-white rounded-lg shadow-md p-8"
          style={{ width: "500px", height: "250px" }}
        >
          <h2 className="text-2xl font-semibold mb-4">June assets</h2>
          <h3 className="text-xl mb-4">Total: $1000</h3>
          <Link href="/asset" legacyBehavior>
            <a className="text-zinc-600 mb-10 block hover:underline">
              See assets
            </a>
          </Link>
          <button className="bg-zinc-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-600">
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Add asset
          </button>
        </div>

        <div
          className="bg-white rounded-lg shadow-md p-8"
          style={{ width: "500px", height: "250px" }}
        >
          <h2 className="text-2xl font-semibold mb-4">June expenses</h2>
          <h3 className="text-xl mb-4">Total: $500</h3>
          <Link href="/expenses" legacyBehavior>
            <a className="text-zinc-600 mb-10 block hover:underline">
              See expenses
            </a>
          </Link>
          <button className="bg-zinc-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-600">
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Add expenses
          </button>
        </div>

        <div
          className="bg-white rounded-lg shadow-md p-8 col-span-full mt-4"
          style={{ width: "1020px", height: "200px" }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            June Balance
          </h2>
          <h3 className="text-xl mb-4 text-lime-500 text-center">+$500</h3>
          <Link href="/details" legacyBehavior>
            <a className="text-zinc-600 mb-10 block hover:underline text-center">
              See details
            </a>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomeContent;
