"use client";

import Sidebar from "@/components/Sidebar";
import { useDeleteAsset, useFetchAssets } from "@/hoooks/apiHooks";
import { Asset } from "@/types/DBTypes";
import { useEffect, useState } from "react";

export default function Assets() {
  const month = new Date().toLocaleString("default", { month: "long" });
  const {
    assets: initialAssets,
    assetsIsLoading,
    assetsError,
  } = useFetchAssets();
  const [assets, setAssets] = useState<Asset[]>(initialAssets);

  useEffect(() => {
    setAssets(initialAssets);
  }, [initialAssets]);

  const [assetToDelete, setAssetToDelete] = useState<number | null>(null);
  const { deleteAsset } = useDeleteAsset();

  const handleDelete = async (id: number) => {
    try {
      setAssetToDelete(id);
      await deleteAsset(id);

      setAssets((prevAssets) =>
        prevAssets.filter((asset) => asset.asset_id !== id)
      );
      alert("Asset deleted successfully!");
    } catch (error) {
      console.error("Failed to delete asset:", error);
      alert("Failed to delete the asset. Please try again.");
    } finally {
      setAssetToDelete(null);
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-10">
          <h2 className="text-2xl font-semibold mb-4">{month} Assets</h2>

          {/* Loading State */}
          {assetsIsLoading && <p>Loading assets...</p>}

          {/* Error State */}
          {assetsError && <p className="text-red-500">Error: {assetsError}</p>}

          {/* Assets List with a delete button */}
          {!assetsIsLoading &&
            !assetsError &&
            assets.map((asset: Asset) => (
              <div key={asset.asset_id} className="flex items-center mb-4">
                {/* Asset Details */}
                <div className="flex-1 bg-white rounded-lg shadow-md p-5">
                  <p>{asset.description}</p>
                  <p>${Number(asset.asset_sum).toFixed(2)}</p>
                </div>

                {/* Delete Button */}
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
        </main>
      </div>
    </>
  );
}
