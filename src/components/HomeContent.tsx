"use client";

import React from "react";
import Link from "next/link";
import PlusCircleIcon from "@heroicons/react/20/solid/PlusCircleIcon";
import { useFetchExpenses } from "@/hoooks/apiHooks";
import { Expense } from "@/types/DBTypes";

const HomeContent: React.FC = () => {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });

  const { expenses, isLoading, error } = useFetchExpenses();

  return (
    <main className="flex-frow p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-center">
        {/* Expenses Section */}
        <div
          className="bg-white rounded-lg shadow-md p-8"
          style={{ width: "500px", height: "250px" }}
        >
          <h2 className="text-2xl font-semibold mb-4">{month} Expenses</h2>

          {/* Loading State */}
          {isLoading && <p>Loading expenses...</p>}

          {/* Error State */}
          {error && <p className="text-red-500">Error: {error}</p>}

          {/* Total Expenses */}
          {!isLoading && !error && (
            <h3 className="text-xl mb-4">
              Total: $
              {expenses
                .reduce(
                  (total, expense) => total + Number(expense.expense_sum),
                  0
                )
                .toFixed(2)}
            </h3>
          )}

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
    </main>
  );
};

export default HomeContent;
