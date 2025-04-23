"use client";

import DownloadCSV from "@/components/DownloadCSV";
import Sidebar from "@/components/Sidebar";
import {
  useDeleteAsset,
  useFetchAssets,
  useGetOneMonthsAssets,
  useUpdateAsset,
} from "@/hoooks/apiHooks";
import { Asset } from "@/types/DBTypes";
import {
  PlusCircleIcon,
  XCircleIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

interface AssetData {
  asset_id: number;
  asset: number;
  description: string;
  asset_sum: number;
}

export default function Assets() {
  const month = new Date().toLocaleString("default", { month: "long" });
  const numericMonth = new Date().getMonth() + 1;

  const { monthsAssets, monthsAssetsIsLoading, monthsAssetError, refetch } =
    useGetOneMonthsAssets(numericMonth);

  const [assetToDelete, setAssetToDelete] = useState<number | null>(null);
  const { deleteAsset } = useDeleteAsset();

  const [assetToUpdate, setAssetToUpdate] = useState<number | null>(null);
  const {
    updateAsset,
    assetsIsLoading: updateIsLoading,
    assetsError: updateError,
  } = useUpdateAsset();

  const [assetId, setAssetId] = useState(0);
  const [assetName, setAssetName] = useState("");
  const [assetAmount, setAssetAmount] = useState("");

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  function resetForm() {
    setAssetName("");
    setAssetAmount("");
  }

  function openModal(asset: Asset) {
    setAssetId(asset.asset_id);
    setAssetName(asset.description);
    setAssetAmount(asset.asset_sum.toString());
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    resetForm();
  }

  const handleDelete = async (id: number) => {
    try {
      setAssetToDelete(id);
      await deleteAsset(id);
      refetch();
      alert("Asset deleted successfully!");
    } catch (error) {
      console.error("Failed to delete asset:", error);
      alert("Failed to delete the asset. Please try again.");
    } finally {
      setAssetToDelete(null);
    }
  };

  const handleUpdateAsset = async () => {
    if (!assetName || !assetAmount) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await updateAsset({
        asset_id: assetId,
        description: assetName,
        asset_sum: Number(assetAmount),
      });
      refetch();

      resetForm();
      closeModal();
      alert("Asset updated successfully!");
    } catch (err) {
      console.error("Error updating expense", monthsAssetError);
      alert(monthsAssetError || "Failed to update assets");
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-10">
          <h2 className="text-2xl font-semibold mb-4">{month} Assets</h2>

          {/* Loading State */}
          {monthsAssetsIsLoading && <p>Loading assets...</p>}

          {/* Error State */}
          {monthsAssetError && (
            <p className="text-red-500">Error: {monthsAssetError}</p>
          )}

          {/* Assets List with a delete button */}
          {!monthsAssetsIsLoading &&
            !monthsAssetError &&
            monthsAssets.map((asset: Asset) => (
              <div key={asset.asset_id} className="flex items-center mb-4">
                {/* Asset Details */}
                <div className="flex-1 bg-white rounded-lg shadow-md p-5">
                  <p>{asset.description}</p>
                  <p>${Number(asset.asset_sum).toFixed(2)}</p>
                </div>

                {/* Modify / Update Button */}
                <button
                  onClick={() => openModal(asset)}
                  className={`ml-4 px-3 py-1 border border-gray-500 rounded ${
                    assetToUpdate === asset.asset_id
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-zinc-500 hover:bg-zinc-500 hover:text-white"
                  }`}
                >
                  Modify
                </button>
                {/* Delete button */}
                <button
                  className={`ml-4 px-3 py-1 border border-red-500 rounded ${
                    assetToDelete === asset.asset_id
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-500 hover:bg-red-500 hover:text-white"
                  }`}
                  disabled={assetToDelete === asset.asset_id}
                  onClick={() => handleDelete(asset.asset_id)}
                >
                  {assetToDelete === asset.asset_id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          <div className="flex items-center hover:underline">
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
            <DownloadCSV
              data={monthsAssets.map((asset) => ({
                description: asset.description,
                asset_sum: asset.asset_sum,
              }))}
              fileName={`${month} assets`}
            />
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
        <h2>Update asset</h2>
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
            onClick={closeModal}
          >
            <XCircleIcon className="w-5 h-5 mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            style={{ width: "112px" }}
            className="bg-zinc-800 text-white py-2 px-4 rounded-md flex items-center hover:bg-zinc-950"
            onClick={handleUpdateAsset}
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
