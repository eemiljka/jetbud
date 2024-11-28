"use client";

import Sidebar from "@/components/Sidebar";
import { useFetchExpenses } from "@/hoooks/apiHooks";
import { Expense } from "@/types/DBTypes";

export default function Expenses() {
  const month = new Date().toLocaleString("default", { month: "long" });
  const { expenses, isLoading, error } = useFetchExpenses();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold">My expenses</h1>
        <h2 className="text-2xl font-semibold mb-4">{month} Expenses</h2>

        {/* Loading State */}
        {isLoading && <p>Loading expenses...</p>}

        {/* Error State */}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Expenses List */}
        {!isLoading &&
          !error &&
          expenses.map((expense: Expense) => (
            <div key={expense.expense_id} className="flex justify-between">
              <p>{expense.description}</p>
              <p>${Number(expense.expense_sum).toFixed(2)}</p>
            </div>
          ))}
      </main>
    </div>
  );
}
