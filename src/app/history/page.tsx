"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import {
  useGetExpenseYears,
  useGetExpenseMonths,
  useGetExpenseDays,
  useGetOneDaysExpenses,
} from "@/hoooks/apiHooks";

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
              className="flex items-center mb-4"
              onClick={() => {
                setSelectedYear(item.year);
              }}
            >
              <div className="flex-1 bg-white rounded-lg shadow-md p-5 cursor-pointer hover:underline">
                <h3 className="hover:underline">{item.year}</h3>
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
                  onClick={() => {
                    setSelectedMonth(item.month);
                  }}
                  key={index}
                  className="bg-white rounded-lg shadow-md p-5 mb-2 hover:underline cursor-pointer"
                >
                  <h3>{getMonthName(item.month)}</h3>
                </div>
              ))
            )}
          </div>
        )}

        {/* Display days if month is selected */}
        {selectedMonth && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              Days for {getMonthName(selectedMonth)}
            </h3>
            {daysIsLoading ? (
              <p>Loading days...</p>
            ) : daysError ? (
              <p>Error: {daysError}</p>
            ) : (
              days.map((item, index) => (
                <div
                  onClick={() => setSelectedDay(item.day)}
                  key={index}
                  className="bg-white rounded-lg shadow-md p-5 mb-2 hover:underline cursor-pointer"
                >
                  <h3>{item.day}.</h3>
                </div>
              ))
            )}
          </div>
        )}

        {/* Display one day's expenses when one day is selected */}
        {selectedDay && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              Expenses for {selectedDay}
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
