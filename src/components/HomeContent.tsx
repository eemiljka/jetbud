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
  useGetOneMonthsExpenses,
  useGetOneMonthsAssets,
} from "@/hoooks/apiHooks";
import XCircleIcon from "@heroicons/react/20/solid/XCircleIcon";

// HomeContent component
const HomeContent: React.FC = () => {
  // modal styles
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
      position: "absolute",
      top: "20%",
      left: "50%",
      transform: "translate(-50%, 0)",
      width: "500px",
      maxHeight: "90vh",
      overflowY: "auto",
      padding: "20px",
      borderRadius: "8px",
    },
  };

  // Get the current month
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const numericMonth = date.getMonth() + 1;

  // Fetch this months expenses and assets
  const {
    monthsExpenses,
    monthsExpensesIsLoading,
    monthsExpenseError,
    refetch,
  } = useGetOneMonthsExpenses(numericMonth);

  const { monthsAssets, monthsAssetsIsLoading, monthsAssetError } =
    useGetOneMonthsAssets(numericMonth);

  const { addExpense, expenseIsLoading, expenseError } = useAddExpense();

  const { addAsset, assetIsLoading, assetError } = useAddAsset();

  // calculate THIS MONTHS total expenses
  const monthsTotalExpenses =
    monthsExpenses.reduce(
      (total, monthsExpense) => total + Number(monthsExpense.expense_sum),
      0
    ) || 0;

  // calculate THIS MONTHS total assets
  const monthsTotalAssets =
    monthsAssets.reduce(
      (total, monthsAsset) => total + Number(monthsAsset.asset_sum),
      0
    ) || 0;

  // Calculate THIS MONTHS total balance
  const monthsTotalBalance = monthsTotalAssets - monthsTotalExpenses;

  // Add expense modal state
  const [addExpenseModalIsOpen, setAddExpenseModalIsOpen] =
    React.useState(false);

  const [expenseEntries, setExpenseEntries] = useState([
    { name: "", amount: "" },
  ]);

  /*const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");*/

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
    setExpenseEntries([{ name: "", amount: "" }]);
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

  const handleExpenseChange = (
    index: number,
    field: "name" | "amount",
    value: string
  ) => {
    const updated = [...expenseEntries];
    updated[index][field] = value;
    setExpenseEntries(updated);
  };

  const addAnotherExpenseField = () => {
    setExpenseEntries([...expenseEntries, { name: "", amount: "" }]);
  };

  const handleAddExpense = async () => {
    const validEntries = expenseEntries.filter(
      (e) => e.name.trim() && e.amount.trim()
    );

    if (validEntries.length === 0) {
      alert("Please fill in at least one expense");
      return;
    }

    try {
      for (const entry of validEntries) {
        await addExpense({
          expense_id: Date.now() + Math.random(),
          description: entry.name,
          expense_sum: Number(entry.amount),
        });
      }
      refetch();
      setExpenseEntries([{ name: "", amount: "" }]);
      closeAddExpenseModal();
      alert("Expenses added successfully");
    } catch (err) {
      console.error("Error adding expenses", expenseError);
      alert(expenseError || "Failed to add expenses");
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

      refetchMonthsAssets(numericMonth);

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
          {monthsExpensesIsLoading && <p>Loading expenses...</p>}

          {/* Error State */}
          {monthsExpenseError && (
            <p className="text-red-500">Error: {monthsExpenseError}</p>
          )}

          {/* Total Expenses */}
          {!monthsExpensesIsLoading && !monthsExpenseError && (
            <h3 className="text-xl mb-4">
              Total: ${monthsTotalExpenses.toFixed(2)}
            </h3>
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
            style={customStyles}
            isOpen={addExpenseModalIsOpen}
            onRequestClose={closeAddExpenseModal}
            contentLabel="Add Expense"
          >
            {/* TODO: Add logic to be able to POST new expenses */}
            <h2>Add Expense</h2>
            {expenseEntries.map((entry, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Expense Name"
                  value={entry.name}
                  onChange={(e) =>
                    handleExpenseChange(index, "name", e.target.value)
                  }
                  className="border border-gray-300 rounded-md w-full p-2 mb-2"
                />
                <input
                  type="number"
                  placeholder="Expense Amount"
                  value={entry.amount}
                  onChange={(e) =>
                    handleExpenseChange(index, "amount", e.target.value)
                  }
                  className="border border-gray-300 rounded-md w-full"
                />
              </div>
            ))}
            <div className="flex space-x-4 hover:underline">
              <button
                onClick={addAnotherExpenseField}
                className="m-2 flex items-center"
              >
                <PlusCircleIcon className="2-5 h-5 text-zinc-500" />
                Add another expense
              </button>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                style={{ width: "170px" }}
                className="bg-zinc-500 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-zinc-600"
                onClick={closeAddExpenseModal}
              >
                <XCircleIcon className="w-5 h-5 mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                style={{ width: "170px" }}
                className="bg-zinc-800 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-zinc-950"
                onClick={handleAddExpense}
                disabled={expenseIsLoading}
              >
                <PlusCircleIcon className="w-5 h-5 mr-2" />
                Add expenses
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
          {monthsAssetsIsLoading && <p>Loading assets...</p>}

          {/* Error State */}
          {monthsAssetError && (
            <p className="text-red-500">Error: {monthsAssetError}</p>
          )}

          {/* Total Assets */}
          {!monthsAssetsIsLoading && !monthsAssetError && (
            <h3 className="text-xl mb-4">
              Total: ${monthsTotalAssets.toFixed(2)}
            </h3>
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
            style={customStyles}
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

            <div className="flex space-x-4 hover:underline">
              <button className="m-2 flex items-center">
                <PlusCircleIcon className="2-5 h-5 text-zinc-500" />
                Add another asset
              </button>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                style={{ width: "170px" }}
                className="bg-zinc-500 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-zinc-600"
                onClick={closeAddAssetModal}
              >
                <XCircleIcon className="w-5 h-5 mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                style={{ width: "170px" }}
                className="bg-zinc-800 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-zinc-950"
                onClick={handleAddAsset}
                disabled={assetIsLoading}
              >
                <PlusCircleIcon className="w-5 h-5 mr-2" />
                Add assets
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
        {(monthsExpensesIsLoading || monthsAssetsIsLoading) && (
          <p>Loading balance...</p>
        )}
        <h3 className="text-xl mb-4">
          Total balance: ${monthsTotalBalance.toFixed(2)}
        </h3>

        <Link href="/overview" legacyBehavior>
          <a className="text-zinc-600 mb-10 block hover:underline">See all</a>
        </Link>
      </div>
    </main>
  );
};

export default HomeContent;
