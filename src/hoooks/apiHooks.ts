import { Expense } from '../types/DBTypes';
// TODO: Generate apiHooks 

import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchExpenses = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get<Expense[]>("http://localhost:8080/expenses");
            setExpenses(response.data);
        }   catch {
            setError("Failed to fetch expenses");
        }   finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchExpenses();
    }, []);

    return { expenses, isLoading, error };
}

const useDeleteExpense = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteExpense = async (id: number) => {
        setIsLoading(true);
        setError(null);
        try {
            await axios.delete(`http://localhost:8080/expenses/${id}`);   
        }   catch {
            setError("Failed to delete expense");
        }   finally {
            setIsLoading(false);
        }
    }
    return { deleteExpense, isLoading, error };

}

export { useFetchExpenses, useDeleteExpense };

