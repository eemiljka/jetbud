"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Link from "next/link";
import PlusCircleIcon from "@heroicons/react/20/solid/PlusCircleIcon";
import {
  useFetchAssets,
  useFetchExpenses,
  useAddExpense,
  useAddAsset,
} from "@/hoooks/apiHooks";
import XCircleIcon from "@heroicons/react/20/solid/XCircleIcon";
import getUserIdFromToken from "@/lib/middlewares";

// HomeContent component
const HomeContent: React.FC = () => {
  // Get the current month
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });

  // Fetch expenses and assets
  const { expenses, expensesIsLoading, expensesError, refetchExpenses } =
    useFetchExpenses();

  const { addExpense, expenseIsLoading, expenseError } = useAddExpense();

  const { assets, assetsIsLoading, assetsError, refetchAssets } =
    useFetchAssets();

  const { addAsset, assetIsLoading, assetError } = useAddAsset();

  // Calculate total expenses
  const totalExpenses =
    expenses.reduce(
      (total, expense) => total + Number(expense.expense_sum),
      0
    ) || 0;

  // Calculate total assets
  const totalAssets =
    assets.reduce((total, asset) => total + Number(asset.asset_sum), 0) || 0;

  // Calculate total balance
  const totalBalance = totalAssets - totalExpenses;

  // Add expense modal state
  const [addExpenseModalIsOpen, setAddExpenseModalIsOpen] =
    React.useState(false);

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  // Add asset modal state
  const [addAssetModalIsOpen, setAddAssetModalIsOpen] = React.useState(false);

  const [assetName, setAssetName] = useState("");
  const [assetAmount, setAssetAmount] = useState("");

  // Open add expense modal
  function openAddExpenseModal() {
    setAddExpenseModalIsOpen(true);
  }

  // Open add asset modal
  function openAddAssetModal() {
    setAddAssetModalIsOpen(true);
  }

  // Close add expense modal
  function closeAddExpenseModal() {
    setAddExpenseModalIsOpen(false);
    resetForm();
  }

  // Close add asset modal
  function closeAddAssetModal() {
    setAddAssetModalIsOpen(false);
    resetAssetForm();
  }

  function resetAssetForm() {
    setAssetName("");
    setAssetAmount("");
  }

  function resetForm() {
    setExpenseName("");
    setExpenseAmount("");
  }

  const handleAddExpense = async () => {
    if (!expenseName || !expenseAmount) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const userId = getUserIdFromToken();
      await addExpense({
        expense_id: Date.now(),
        description: expenseName,
        expense_sum: Number(expenseAmount),
        user_id: userId,
      });

      refetchExpenses();

      resetForm();
      closeAddExpenseModal();
      alert("Expense added successfully!");
    } catch (err) {
      console.error("Error adding expense", expenseError);
      alert(expenseError || "Failed to add expense");
    }
  };

  const handleAddAsset = async () => {
    if (!assetName || !assetAmount) {
      alert("Please fill all the fields");
      return;
    }
    try {
      await addAsset({
        asset_id: Date.now(),
        description: assetName,
        asset_sum: Number(assetAmount),
      });

      refetchAssets();

      resetAssetForm();
      closeAddAssetModal();
      alert("Asset added successfully!");
    } catch (err) {
      console.error("Error adding asset", assetError);
      alert(assetError || "Failed to add asset");
    }
  };

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
          {expensesIsLoading && <p>Loading expenses...</p>}

          {/* Error State */}
          {expensesError && (
            <p className="text-red-500">Error: {expensesError}</p>
          )}

          {/* Total Expenses */}
          {!expensesIsLoading && !expensesError && (
            <h3 className="text-xl mb-4">Total: ${totalExpenses.toFixed(2)}</h3>
          )}
          {/* Link to expenses page */}
          <Link href="/expenses" legacyBehavior>
            <a className="text-zinc-600 mb-10 block hover:underline">
              See expenses
            </a>
          </Link>
          {/* Add expenses button */}
          <button
            className="bg-zinc-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-600"
            onClick={openAddExpenseModal}
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Add expenses
          </button>

          {/* Add Expense Modal */}
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
            isOpen={addExpenseModalIsOpen}
            onRequestClose={closeAddExpenseModal}
            contentLabel="Add Expense"
          >
            {/* TODO: Add logic to be able to POST new expenses */}
            <h2>Add Expense</h2>
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
                onClick={closeAddExpenseModal}
              >
                <XCircleIcon className="w-5 h-5 mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                style={{ width: "112px" }}
                className="bg-zinc-800 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-950"
                onClick={handleAddExpense}
                disabled={expenseIsLoading}
              >
                <PlusCircleIcon className="w-5 h-5 mr-2" />
                Add
              </button>
            </div>
          </Modal>
        </div>
        {/* Assets Section */}
        <div
          className="bg-white rounded-lg shadow-md p-8"
          style={{ width: "500px", height: "250px" }}
        >
          <h2 className="text-2xl font-semibold mb-4">{month} Assets</h2>

          {/* Loading State */}
          {assetsIsLoading && <p>Loading assets...</p>}

          {/* Error State */}
          {assetsError && <p className="text-red-500">Error: {assetsError}</p>}

          {/* Total Assets */}
          {!assetsIsLoading && !assetsError && (
            <h3 className="text-xl mb-4">Total: ${totalAssets.toFixed(2)}</h3>
          )}
          <Link href="/asset" legacyBehavior>
            <a className="text-zinc-600 mb-10 block hover:underline">
              See assets
            </a>
          </Link>
          <button
            onClick={openAddAssetModal}
            className="bg-zinc-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-600"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Add assets
          </button>
          {/* Add assets modal */}
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
            isOpen={addAssetModalIsOpen}
            onRequestClose={closeAddAssetModal}
            contentLabel="Add Asset"
          >
            {/* TODO: Add logic to be able to POST new assets */}
            <h2>Add Asset</h2>
            <input
              type="text"
              placeholder="Asset Name"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              className="border border-gray-300 rounded-md w-full p-2 mb-4"
            />
            <input
              type="number"
              placeholder="Asset Amount"
              value={assetAmount}
              onChange={(e) => setAssetAmount(e.target.value)}
              className="border border-gray-300 rounded-md w-full p-2 mb-4"
            />

            <div className="flex space-x-4 mt-4">
              <button
                style={{ width: "112px" }}
                className="bg-zinc-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-600"
                onClick={closeAddAssetModal}
              >
                <XCircleIcon className="w-5 h-5 mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                style={{ width: "112px" }}
                className="bg-zinc-800 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-950"
                onClick={handleAddAsset}
                disabled={assetIsLoading}
              >
                <PlusCircleIcon className="w-5 h-5 mr-2" />
                Add
              </button>
            </div>
          </Modal>
        </div>
      </div>

      {/* Balance Overview */}
      <div
        className="bg-white rounded-lg shadow-md p-8 mt-8"
        style={{ width: "100%" }}
      >
        <h2 className="text-2xl font-semibold mb-4">Balance Overview</h2>

        {/* Show Loading/Error State */}
        {(expensesIsLoading || assetsIsLoading) && <p>Loading balance...</p>}
        <h3 className="text-xl mb-4">
          Total balance: ${totalBalance.toFixed(2)}
        </h3>

        <Link href="/overview" legacyBehavior>
          <a className="text-zinc-600 mb-10 block hover:underline">See all</a>
        </Link>
      </div>
    </main>
  );
};

export default HomeContent;
