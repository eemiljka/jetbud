"use client";

import Sidebar from "@/components/Sidebar";
import { useGetYears } from "@/hoooks/apiHooks";

interface Year {
  year: number;
}

import { useEffect } from "react";

export default function History() {
  const { years, yearsIsLoading, yearsError, fetchYears } = useGetYears();

  useEffect(() => {
    fetchYears();
  }, []);

  if (yearsIsLoading) {
    return <p>Years loading...</p>;
  }

  if (yearsError) {
    return <p>Error: {yearsError}</p>;
  }

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-10">
          <h2 className="text-2xl font-semibold mb-4">History</h2>

          {years.map((item) => (
            <div key={item.year} className="flex items-center mb-4">
              <div className="flex-1 bg-white rounded-lg shadow-md p-5 cursor-pointer">
                {" "}
                {item.year}
              </div>
            </div>
          ))}
        </main>
      </div>
    </>
  );
}
