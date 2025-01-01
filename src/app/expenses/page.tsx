"use client";

import Sidebar from "@/components/Sidebar";
import { useDeleteExpense, useFetchExpenses } from "@/hoooks/apiHooks";
import { Expense } from "@/types/DBTypes";
import { useEffect, useState } from "react";

export default function Expenses() {
  const month = new Date().toLocaleString("default", { month: "long" });
  const {
    expenses: initialExpenses,
    expensesIsLoading,
    expensesError,
  } = useFetchExpenses();
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  useEffect(() => {
    setExpenses(initialExpenses);
  }, [initialExpenses]);

  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);
  const { deleteExpense } = useDeleteExpense();

  const handleDelete = async (id: number) => {
    try {
      setExpenseToDelete(id);
      await deleteExpense(id);

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.expense_id !== id)
      );
      alert("Expense deleted successfully!");
    } catch (error) {
      console.error("Failed to delete expense:", error);
      alert("Failed to delete the expense. Please try again.");
    } finally {
      setExpenseToDelete(null);
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-10">
          <h2 className="text-2xl font-semibold mb-4">{month} Expenses</h2>

          {/* Loading State */}
          {expensesIsLoading && <p>Loading expenses...</p>}

          {/* Error State */}
          {expensesError && (
            <p className="text-red-500">Error: {expensesError}</p>
          )}

          {/* Expenses List with a delete button */}
          {!expensesIsLoading &&
            !expensesError &&
            expenses.map((expense: Expense) => (
              <div key={expense.expense_id} className="flex items-center mb-4">
                {/* Expense Details */}
                <div className="flex-1 bg-white rounded-lg shadow-md p-5">
                  <p>{expense.description}</p>
                  <p>${Number(expense.expense_sum).toFixed(2)}</p>
                </div>

                {/* Delete Button */}
                <button
                  className={`ml-4 px-3 py-1 border border-gray-500 rounded`}
                >
                  Modify
                </button>
                <button
                  className={`ml-4 px-3 py-1 border border-red-500 rounded ${
                    expenseToDelete === expense.expense_id
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-500 hover:bg-red-500 hover:text-white"
                  }`}
                  disabled={expenseToDelete === expense.expense_id}
                  onClick={() => handleDelete(expense.expense_id)}
                >
                  {expenseToDelete === expense.expense_id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            ))}
        </main>
      </div>
    </>
  );
}
