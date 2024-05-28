import React from "react";
import Link from "next/link";
import PlusCircleIcon from "@heroicons/react/20/solid/PlusCircleIcon";

const HomeContent: React.FC = () => {
  return (
    <main className="flex-frow p-5">
      {/* Main content goes here */}
      <div className="flex justify-center">
        <div className="flex justify-between">
          {/* THIS MONTH'S ASSETS BOX */}
          <div
            className="bg-white rounded-lg shadow-md p-8"
            style={{ width: "500px", height: "500px", marginRight: "20px" }}
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

          {/* THIS MONTH'S EXPENSES BOX */}
          <div
            className="bg-white rounded-lg shadow-md p-8"
            style={{ width: "500px", height: "500px" }}
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
        </div>
      </div>
    </main>
  );
};

export default HomeContent;
