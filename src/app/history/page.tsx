"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import {
  useGetExpenseYears,
  useGetExpenseMonths,
  useGetExpenseDays,
  useGetOneDaysExpenses,
  useGetOneMonthsExpenses,
  useGetAssetYears,
  useGetAssetMonths,
  useGetAssetDays,
  useGetOneDaysAssets,
  useGetOneMonthsAssets,
} from "@/hoooks/apiHooks";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function History() {
  const { years, yearsIsLoading, yearsError, fetchYears } =
    useGetExpenseYears();

  const { assetYears, assetYearsIsLoading, assetYearsError, fetchAssetYears } =
    useGetAssetYears();

  const { months, monthsIsLoading, monthsError, fetchMonths } =
    useGetExpenseMonths();

  const {
    assetMonths,
    assetMonthsIsLoading,
    assetMonthsError,
    fetchAssetMonths,
  } = useGetAssetMonths();

  const { days, daysIsLoading, daysError, fetchDays } = useGetExpenseDays();

  const { assetDays, assetDaysIsLoading, assetDaysError, fetchAssetDays } =
    useGetAssetDays();

  const {
    daysExpenses,
    daysExpensesIsLoading,
    daysExpensesError,
    fetchDaysExpenses,
  } = useGetOneDaysExpenses();

  const { daysAssets, daysAssetsIsLoading, daysAssetsError, fetchDaysAssets } =
    useGetOneDaysAssets();

  const {
    monthsExpenses,
    monthsExpensesIsLoading,
    monthsExpenseError,
    refetchMonthsExpenses,
  } = useGetOneMonthsExpenses();

  const {
    monthsAssets,
    monthsAssetsIsLoading,
    monthsAssetError,
    refetchMonthsAssets,
  } = useGetOneMonthsAssets();

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedAssetYear, setSelectedAssetYear] = useState<number | null>(
    null
  );

  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedAssetMonth, setSelectedAssetMonth] = useState<number | null>(
    null
  );

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedAssetDay, setSelectedAssetDay] = useState<number | null>(null);

  // Fetch years when component mounts
  useEffect(() => {
    fetchYears();
    fetchAssetYears();
  }, []);

  // Fetch expense months whenever a new year is selected
  useEffect(() => {
    if (selectedYear) {
      fetchMonths(selectedYear);
    }
  }, [selectedYear]);

  // Fetch asset months whenever a new year is selected
  useEffect(() => {
    if (selectedAssetYear) {
      fetchAssetMonths(selectedAssetYear);
    }
  }, [selectedAssetYear]);

  // Fetch expense days whenever a new month is selected
  useEffect(() => {
    if (selectedMonth) {
      fetchDays(selectedMonth);
    }
  }, [selectedMonth]);

  // Fetch days whenever a new month is selected
  useEffect(() => {
    if (selectedAssetMonth) {
      fetchAssetDays(selectedAssetMonth);
    }
  }, [selectedAssetMonth]);

  // Fetch one days expenses whenever that one day is selected
  useEffect(() => {
    if (selectedDay) {
      fetchDaysExpenses(selectedDay);
    }
  }, [selectedDay]);

  // Fetch one days assets whenever that one day is selected
  useEffect(() => {
    if (selectedAssetDay) {
      fetchDaysAssets(selectedAssetDay);
    }
  }, [selectedAssetDay]);

  // Fetch one months expenses whenever that one month is selected
  useEffect(() => {
    if (selectedMonth) {
      refetchMonthsExpenses(selectedMonth);
    }
  }, [selectedMonth]);

  // Fetch one months assets whenever that one month is selected
  useEffect(() => {
    if (selectedAssetMonth) {
      refetchMonthsAssets(selectedAssetMonth);
    }
  }, [selectedAssetMonth]);

  if (yearsIsLoading) {
    return <p>Years loading...</p>;
  }

  if (yearsError) {
    return <p>Error: {yearsError}</p>;
  }

  if (assetYearsIsLoading) {
    return <p>Years loading...</p>;
  }

  if (assetYearsError) {
    return <p>Error: {assetYearsError}</p>;
  }

  function getMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "long" });
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10">
        <h2 className="text-2xl font-semibold mb-4">History</h2>

        {/* List of Years */}
        <h3 className="mt-2 mb-2">Expenses</h3>
        <div>
          {years.map((item) => (
            <div
              key={item.year}
              className="flex items-center mb-4 cursor-pointer"
              onClick={() => {
                setSelectedYear(item.year);
              }}
            >
              <div className="flex-1 bg-white rounded-lg shadow-md p-5 cursor-pointer">
                <h3
                  className={
                    selectedYear === item.year
                      ? "underline font-bold"
                      : "font-normal no-underline"
                  }
                >
                  {item.year}
                  <ChevronDownIcon className="w-5 h-5 inline-block ml-2" />
                </h3>
                {selectedYear === item.year && (
                  <>
                    {monthsIsLoading ? (
                      <p>Loading months...</p>
                    ) : monthsError ? (
                      <p>Error: {monthsError}</p>
                    ) : (
                      months.map((item, index) => (
                        <div
                          className={`mb-4 hover:underline ${
                            selectedMonth === item.month
                              ? "underline text-blue-500"
                              : ""
                          }`}
                          onClick={() => setSelectedMonth(item.month)}
                          key={index}
                        >
                          <h3 className="mt-4">
                            {getMonthName(item.month)}
                            <ChevronDownIcon className="w-5 h-5 inline-block ml-2" />
                          </h3>
                        </div>
                      ))
                    )}
                  </>
                )}
                {selectedMonth && (
                  <>
                    {daysIsLoading ? (
                      <p>Loading days...</p>
                    ) : daysError ? (
                      <p>Error: {daysError}</p>
                    ) : (
                      days.map((item, index) => (
                        <div
                          onClick={() => setSelectedDay(item.day)}
                          key={index}
                          className="mb-4"
                        >
                          <button
                            className={`bg-zinc-500 text-white w-20 rounded-lg hover:bg-zinc-600 ${
                              selectedDay === item.day
                                ? "underline bg-zinc-800"
                                : ""
                            }`}
                          >
                            <h3 className="mt-2 mb-2">{item.day}.</h3>
                          </button>
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Display one day's expenses when one day is selected */}
        {selectedDay && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              Expense logs made on {selectedDay}.
            </h3>
            {daysExpensesIsLoading ? (
              <p>Loading expenses...</p>
            ) : daysExpensesError ? (
              <p>Error: {daysExpensesError}</p>
            ) : (
              daysExpenses.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-5 mb-2 hover:underline"
                >
                  <h3>{item.description}</h3>
                  <h4>{item.expense_sum}</h4>
                </div>
              ))
            )}
          </div>
        )}
        <h3 className="mt-2 mb-2">Assets</h3>

        <div>
          {assetYears.map((item) => (
            <div
              key={item.year}
              className="flex items-center mb-4 cursor-pointer"
              onClick={() => {
                setSelectedAssetYear(item.year);
              }}
            >
              <div className="flex-1 bg-white rounded-lg shadow-md p-5 cursor-pointer">
                <h3
                  className={
                    selectedAssetYear === item.year
                      ? "underline font-bold"
                      : "font-normal no-underline"
                  }
                >
                  {item.year}
                  <ChevronDownIcon className="w-5 h-5 inline-block ml-2" />
                </h3>
                {selectedAssetYear === item.year && (
                  <>
                    {assetMonthsIsLoading ? (
                      <p>Loading months...</p>
                    ) : assetMonthsError ? (
                      <p>Error: {assetMonthsError}</p>
                    ) : (
                      assetMonths.map((item, index) => (
                        <div
                          className={`mb-4 hover:underline ${
                            selectedAssetMonth === item.month
                              ? "underline text-blue-500"
                              : ""
                          }`}
                          onClick={() => setSelectedAssetMonth(item.month)}
                          key={index}
                        >
                          <h3 className="mt-4">
                            {getMonthName(item.month)}
                            <ChevronDownIcon className="w-5 h-5 inline-block ml-2" />
                          </h3>
                        </div>
                      ))
                    )}
                  </>
                )}
                {selectedAssetMonth && (
                  <>
                    {assetDaysIsLoading ? (
                      <p>Loading days...</p>
                    ) : assetDaysError ? (
                      <p>Error: {assetDaysError}</p>
                    ) : (
                      assetDays.map((item, index) => (
                        <div
                          onClick={() => setSelectedAssetDay(item.day)}
                          key={index}
                          className="mb-4"
                        >
                          <button
                            className={`bg-zinc-500 text-white w-20 rounded-lg hover:bg-zinc-600 ${
                              selectedAssetDay === item.day
                                ? "underline bg-zinc-800"
                                : ""
                            }`}
                          >
                            <h3 className="mt-2 mb-2">{item.day}.</h3>
                          </button>
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Display one day's expenses when one day is selected */}
        {selectedAssetDay && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              Asset logs made on {selectedAssetDay}.
            </h3>
            {daysAssetsIsLoading ? (
              <p>Loading expenses...</p>
            ) : daysAssetsError ? (
              <p>Error: {daysAssetsError}</p>
            ) : (
              daysAssets.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-5 mb-2 hover:underline"
                >
                  <h3>{item.description}</h3>
                  <h4>{item.asset_sum}</h4>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
