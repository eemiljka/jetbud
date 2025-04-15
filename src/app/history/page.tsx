"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import {
  useGetExpenseYears,
  useGetExpenseMonths,
  useGetExpenseDays,
  useGetOneDaysExpenses,
  useGetOneMonthsExpenses,
} from "@/hoooks/apiHooks";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function History() {
  const { years, yearsIsLoading, yearsError, fetchYears } =
    useGetExpenseYears();

  const { months, monthsIsLoading, monthsError, fetchMonths } =
    useGetExpenseMonths();

  const { days, daysIsLoading, daysError, fetchDays } = useGetExpenseDays();

  const {
    daysExpenses,
    daysExpensesIsLoading,
    daysExpensesError,
    fetchDaysExpenses,
  } = useGetOneDaysExpenses();

  const {
    monthsExpenses,
    monthsExpensesIsLoading,
    monthsExpenseError,
    fetchMonthsExpenses,
  } = useGetOneMonthsExpenses();

  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

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

  // Fetch days whenever a new month is selected
  useEffect(() => {
    if (selectedMonth) {
      fetchDays(selectedMonth);
    }
  }, [selectedMonth]);

  // Fetch one days expenses whenever that one day is selected
  useEffect(() => {
    if (selectedDay) {
      fetchDaysExpenses(selectedDay);
    }
  }, [selectedDay]);

  // Fetch one months expenses whenever that one month is selected
  useEffect(() => {
    if (selectedMonth) {
      fetchMonthsExpenses(selectedMonth);
    }
  }, [selectedMonth]);

  if (yearsIsLoading) {
    return <p>Years loading...</p>;
  }

  if (yearsError) {
    return <p>Error: {yearsError}</p>;
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
      </main>
    </div>
  );
}
