import { Asset, Expense, User } from '../types/DBTypes';
// TODO: Generate apiHooks 

import React, { useEffect, useState } from 'react';
import axios from 'axios';


/******** EXPENSES ********/ 
const useFetchExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [expensesIsLoading, expensesSetIsLoading] = useState(true);
    const [expensesError, expensesSetError] = useState<string | null>(null);

    const fetchExpenses = async () => {
        expensesSetIsLoading(true);
        expensesSetError(null);
        try {
            const response = await axios.get<Expense[]>("http://localhost:8080/expenses");
            setExpenses(response.data);
        }   catch {
            expensesSetError("Failed to fetch expenses");
        }   finally {
            expensesSetIsLoading(false);
        }
    }

    useEffect(() => {
        fetchExpenses();
    }, []);

    return { expenses, expensesIsLoading, expensesError, refetchExpenses: fetchExpenses };
}

const useAddExpense = () => {
    const [expenseIsLoading, setExpenseIsLoading] = useState(false);
    const [expenseError, setExpenseError] = useState<string | null>(null);

    const addExpense = async (expense: Expense) => {
        setExpenseIsLoading(true);
        setExpenseError(null);
        try {
            await axios.post("http://localhost:8080/expenses", expense);
        }   catch {
            setExpenseError("Failed to add expense");
        }   finally {
            setExpenseIsLoading(false);
        }
    }
    return { addExpense, expenseIsLoading, expenseError };
}

const useDeleteExpense = () => {
    const [expensesIsLoading, expensesSetIsLoading] = useState(false);
    const [expensesError, expensesSetError] = useState<string | null>(null);

    const deleteExpense = async (id: number) => {
        expensesSetIsLoading(true);
        expensesSetError(null);
        try {
            await axios.delete(`http://localhost:8080/expenses/${id}`);   
        }   catch {
            expensesSetError("Failed to delete expense");
        }   finally {
            expensesSetIsLoading(false);
        }
    }
    return { deleteExpense, expensesIsLoading, expensesError };

}

const useUpdateExpense = () => {
    const [expensesIsLoading, setExpensesIsLoading] = useState(false);
    const [expensesError, setExpensesError] = useState<string | null>(null);
    
    const updateExpense = async (id: number) => {
        setExpensesIsLoading(true);
        setExpensesError(null);
        try {
        await axios.put(`http://localhost:8080/expenses/${id}`);
    } catch {
        setExpensesError("Failed to update expense")
    } finally {
        setExpensesIsLoading(false);
    }
}
return { updateExpense, expensesIsLoading, expensesError }
}

/******** ASSETS ********/ 
const useFetchAssets = () => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [assetsIsLoading, assetsSetIsLoading] = useState(true);
    const [assetsError, assetsSetError] = useState<string | null>(null);

    const fetchAssets = async () => {
        assetsSetIsLoading(true);
        assetsSetError(null);
        try {
            const response = await axios.get<Asset[]>("http://localhost:8080/assets");
            setAssets(response.data);
        }   catch {
            assetsSetError("Failed to fetch assets");
        }   finally {
            assetsSetIsLoading(false);
        }
    }
    useEffect(() => {
        fetchAssets();
    }, []);

    return { assets, assetsIsLoading, assetsError, refetchAssets: fetchAssets };
    
}

const useAddAsset = () => {
    const [assetIsLoading, setAssetIsLoading] = useState(false);
    const [assetError, setAssetError] = useState<string | null>(null);

    const addAsset = async (asset: Asset) => {
        setAssetIsLoading(true)
        setAssetError(null);
        try {
            await axios.post("http://localhost:8080/assets", asset);
        }   catch {
            setAssetError("Failed to add asset");
        } finally {
            setAssetIsLoading(false);
        }
    }
    return { addAsset, assetIsLoading, assetError }
}

const useDeleteAsset = () => {
    const [assetsIsLoading, assetsSetIsLoading] = useState(false);
    const [assetsError, assetsSetError] = useState<string | null>(null);

    const deleteAsset = async (id: number) => {
        assetsSetIsLoading(true);
        assetsSetError(null);
        try {
            await axios.delete(`http://localhost:8080/assets/${id}`);
        }   catch {
            assetsSetError("Failed to delete asset");
        }   finally {
            assetsSetIsLoading(false);
        }
    }
    return { deleteAsset, assetsIsLoading, assetsError };
}

/******** USER HOOKS (Not in use...) ********/
const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [userIsLoading, setUserIsLoading] = useState(true);
    const [userError, setUserError] = useState<string | null>(null);

    const fetchUser = async () => {
        setUserIsLoading(true);
        setUserError(null);
        try {
            const response = await axios.get<User>("http://localhost:8080/user");
            setUser(response.data);
        }   catch {
            setUserError("Failed to fetch user");
        }
        finally {
            setUserIsLoading(false);
        }
    }
    useEffect(() => {
        fetchUser();
    }, []);
}

const useLogin = () => {
    const [loginIsLoading, setLoginIsLoading] = React.useState(false);
    const [loginError, setLoginError] = React.useState<string | null>(null);
  
    const login: any = async (username: string, password: string): Promise<string | null> => {
      setLoginIsLoading(true);
      setLoginError(null);
      try {
        const response = await axios.post("http://localhost:8080/login", {
          username,
          password,
        });
        return response.data.token;
      } catch (err: any) {
        setLoginError(err.response?.data || "Failed to login");
        return null;
      } finally {
        setLoginIsLoading(false);
      }
    };
  
    return { login, loginIsLoading, loginError };
  };

export { useFetchExpenses, useDeleteExpense, useFetchAssets, useDeleteAsset, useAddAsset, useUser, useLogin, useAddExpense, useUpdateExpense };

