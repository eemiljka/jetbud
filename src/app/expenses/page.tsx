"use client";

import React from "react";
import Modal from "react-modal";
import Sidebar from "@/components/Sidebar";
import {
  useDeleteExpense,
  useUpdateExpense,
  useGetOneMonthsExpenses,
} from "@/hoooks/apiHooks";
import { Expense } from "@/types/DBTypes";
import { useEffect, useState } from "react";
import {
  ArrowDownTrayIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import DownloadCSV from "@/components/DownloadCSV";

interface ExpenseData {
  expense_id: number;
  expense: number;
  description: string;
  expense_sum: number;
}

export default function Expenses() {
  const month = new Date().toLocaleString("default", { month: "long" });
  const numericMonth = new Date().getMonth() + 1;

  const {
    monthsExpenses,
    monthsExpensesIsLoading,
    monthsExpenseError,
    refetch,
  } = useGetOneMonthsExpenses(numericMonth);

  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);
  const { deleteExpense } = useDeleteExpense();

  const [expenseToUpdate, setExpenseToUpdate] = useState<number | null>(null);
  const {
    updateExpense,
    expensesIsLoading: updateIsLoading,
    expensesError: updateError,
  } = useUpdateExpense();

  const [expenseId, setExpenseId] = useState(0);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  function resetForm() {
    setExpenseName("");
    setExpenseAmount("");
  }

  function openModal(expense: Expense) {
    setExpenseId(expense.expense_id);
    setExpenseName(expense.description);
    setExpenseAmount(expense.expense_sum.toString());
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    resetForm();
  }

  const handleDelete = async (id: number) => {
    try {
      setExpenseToDelete(id);
      await deleteExpense(id);
      alert("Expense deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to delete expense:", error);
      alert("Failed to delete the expense. Please try again.");
    } finally {
      setExpenseToDelete(null);
    }
  };

  const handleUpdateExpense = async () => {
    if (!expenseName || !expenseAmount) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await updateExpense({
        expense_id: expenseId,
        description: expenseName,
        expense_sum: Number(expenseAmount),
      });

      resetForm();
      closeModal();
      alert("Expense updated successfully!");
      refetch();
    } catch (err) {
      console.error("Error updating expense", monthsExpenseError);
      alert(monthsExpenseError || "Failed to update expense");
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-10">
          <h2 className="text-2xl font-semibold mb-4">{month} Expenses</h2>

          {/* Loading State */}
          {monthsExpensesIsLoading && <p>Loading expenses...</p>}

          {/* Error State */}
          {monthsExpenseError && (
            <p className="text-red-500">Error: {monthsExpenseError}</p>
          )}

          {/* Expenses List with a delete and modify button */}
          {!monthsExpensesIsLoading &&
            !monthsExpenseError &&
            monthsExpenses.map((expense: ExpenseData) => (
              <div key={expense.expense_id} className="flex items-center mb-4">
                {/* Expense Details */}
                <div className="flex-1 bg-white rounded-lg shadow-md p-5">
                  <p>{expense.description}</p>
                  <p>${Number(expense.expense_sum).toFixed(2)}</p>
                </div>

                {/* Modify / Update Button */}
                <button
                  onClick={() => openModal(expense)}
                  className={`ml-4 px-3 py-1 border border-gray-500 rounded ${
                    expenseToUpdate === expense.expense_id
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-zinc-500 hover:bg-zinc-500 hover:text-white"
                  }`}
                >
                  Modify
                </button>
                {/* Delete button */}
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
          <div className="flex items-center hover:underline">
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
            <DownloadCSV data={monthsExpenses} fileName={`${month} expenses`} />
          </div>
        </main>
      </div>
      <Modal
        className={"bg-white rounded-lg shadow-md p-8"}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
          content: {
            color: "black",
            width: "500px",
            height: "250px",
            margin: "auto",
            padding: "20px",
            borderRadius: "8px",
          },
        }}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Update expense"
      >
        <h2>Update expense</h2>
        <input
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          className="border border-gray-300 rounded-md w-full p-2 mb-4"
        />
        <input
          type="number"
          placeholder="Expense Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          className="border border-gray-300 rounded-md w-full p-2 mb-4"
        />
        <div className="flex space-x-4 mt-4">
          <button
            style={{ width: "112px" }}
            className="bg-zinc-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-600"
            onClick={closeModal}
          >
            <XCircleIcon className="w-5 h-5 mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            style={{ width: "112px" }}
            className="bg-zinc-800 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-950"
            onClick={handleUpdateExpense}
            disabled={updateIsLoading}
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Update
          </button>
        </div>
      </Modal>
    </>
  );
}
