"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useGetYears, useGetMonths } from "@/hoooks/apiHooks";

export default function History() {
  const { years, yearsIsLoading, yearsError, fetchYears } = useGetYears();
  const { months, monthsIsLoading, monthsError, fetchMonths } = useGetMonths();
  const [selectedYear, setSelectedYear] = useState(null);

  // Fetch years when component mounts
  useEffect(() => {
    fetchYears();
  }, []);

  // Fetch months whenever a new year is selected
  useEffect(() => {
    if (selectedYear) {
      fetchMonths(selectedYear);
    }
  }, [selectedYear]);

  if (yearsIsLoading) {
    return <p>Years loading...</p>;
  }

  if (yearsError) {
    return <p>Error: {yearsError}</p>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        <h2 className="text-2xl font-semibold mb-4">History</h2>

        {/* List of Years */}
        <div>
          {years.map((item) => (
            <div
              key={item.year}
              className="flex items-center mb-4"
              onClick={() => {
                console.log("Year clicked: ", item.year);
                setSelectedYear(item.year);
              }}
            >
              <div className="flex-1 bg-white rounded-lg shadow-md p-5 cursor-pointer">
                {item.year}
              </div>
            </div>
          ))}
        </div>

        {/* Display Months if a year is selected */}
        {selectedYear && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              Months for {selectedYear}
            </h3>
            {monthsIsLoading ? (
              <p>Loading months...</p>
            ) : monthsError ? (
              <p>Error: {monthsError}</p>
            ) : (
              months.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-5 mb-2"
                >
                  <p>Month: {item.month}</p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
