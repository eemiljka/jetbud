import { Asset, Expense, User } from '../types/DBTypes';
// TODO: Generate apiHooks 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { headers } from 'next/headers';

  // Types
  interface YearData {
    year: number;
  }

  interface MonthData {
    month: number
  }

  interface DayData {
    day: number
  }

  interface ExpenseData {
    expense_id: number;
    expense: number
    description: string
    expense_sum: number
  }


/******** EXPENSES ********/ 
const useFetchExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [expensesIsLoading, setExpensesIsLoading] = useState(true);
    const [expensesError, setExpensesError] = useState<string | null>(null);

    const fetchExpenses = async () => {
        setExpensesIsLoading(true);
        setExpensesError(null);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get<Expense[]>("http://localhost:8080/expenses", {
                headers: {Authorization: `Bearer ${token}`},
            })
            setExpenses(response.data);
        }   catch {
            setExpensesError("Failed to fetch expenses");
        }   finally {
            setExpensesIsLoading(false);
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
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8080/expenses", expense, {
                headers: {Authorization: `Bearer ${token}`}
            });
        }   catch {
            setExpenseError("Failed to add expense");
        }   finally {
            setExpenseIsLoading(false);
        }
    }
    return { addExpense, expenseIsLoading, expenseError };
}

const useDeleteExpense = () => {
    const [expensesIsLoading, setExpensesIsLoading] = useState(false);
    const [expensesError, setExpensesError] = useState<string | null>(null);

    const deleteExpense = async (id: number) => {
        setExpensesIsLoading(true);
        setExpensesError(null);
        try {
            await axios.delete(`http://localhost:8080/expenses/${id}`);   
        }   catch {
            setExpensesError("Failed to delete expense");
        }   finally {
            setExpensesIsLoading(false);
        }
    }
    return { deleteExpense, expensesIsLoading, expensesError };

}

const useUpdateExpense = () => {
    const [expensesIsLoading, setExpensesIsLoading] = useState(false);
    const [expensesError, setExpensesError] = useState<string | null>(null);
    
    const updateExpense = async (expense: {expense_id: number; description: string; expense_sum: number}) => {
        setExpensesIsLoading(true);
        setExpensesError(null);
        try {
        await axios.put(`http://localhost:8080/expenses/${expense.expense_id}`, {
            description: expense.description,
            expense_sum: expense.expense_sum
        });
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
    const [assetsIsLoading, setAssetsIsLoading] = useState(true);
    const [assetsError, setAssetsError] = useState<string | null>(null);

    const fetchAssets = async () => {
        setAssetsIsLoading(true);
        setAssetsError(null);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get<Asset[]>("http://localhost:8080/assets", {
                headers: {Authorization: `Bearer ${token}`},
            })
            setAssets(response.data);
        }   catch {
            setAssetsError("Failed to fetch assets");
        }   finally {
            setAssetsIsLoading(false);
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
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8080/assets", asset, {
                headers: {Authorization: `Bearer ${token}`}
            });
        }   catch {
            setAssetError("Failed to add asset");
        } finally {
            setAssetIsLoading(false);
        }
    }
    return { addAsset, assetIsLoading, assetError }
}

const useDeleteAsset = () => {
    const [assetsIsLoading, setAssetsIsLoading] = useState(false);
    const [assetsError, setAssetsError] = useState<string | null>(null);

    const deleteAsset = async (id: number) => {
        setAssetsIsLoading(true);
        setAssetsError(null);
        try {
            await axios.delete(`http://localhost:8080/assets/${id}`);
        }   catch {
            setAssetsError("Failed to delete asset");
        }   finally {
            setAssetsIsLoading(false);
        }
    }
    return { deleteAsset, assetsIsLoading, assetsError };
}

const useUpdateAsset = () => {
    const [assetsIsLoading, setAssetsIsLoading] = useState(false);
    const [assetsError, setAssetsError] = useState<string | null>(null);
    
    const updateAsset = async (asset: {asset_id: number; description: string; asset_sum: number}) => {
        setAssetsIsLoading(true);
        setAssetsError(null);
        try {
        await axios.put(`http://localhost:8080/assets/${asset.asset_id}`, {
            description: asset.description,
            asset_sum: asset.asset_sum
        });
    } catch {
        setAssetsError("Failed to update expense")
    } finally {
        setAssetsIsLoading(false);
    }
}
return { updateAsset, assetsIsLoading, assetsError }
}

// users
const useGetUserInfo = () => {
    const [profileInfo, setProfileInfo] = useState<User[]>([])
    const [profileIsLoading, setProfileIsLoading] = useState(true);
    const [profileError, setProfileError] = useState<string | null>(null);

    const fetchUserInfo = async () => {
        setProfileIsLoading(true);
        setProfileError(null);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get<User[]>("http://localhost:8080/user", {
                headers: {Authorization: `Bearer ${token}`}
            })
            setProfileInfo(response.data);
        } catch {
            setProfileError("Failed to fetch profile info.")
        } finally {
            setProfileIsLoading(false);
        }
    }
    return {profileInfo, profileError, profileIsLoading, refetchUserInfo: fetchUserInfo}
}

// change username
const useUpdateUsername = () => {
    const [usernameIsLoading, setUsernameIsLoading] = useState(false);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState("");

    const updateUsername = async (newUsername: string) => {
        setUsernameIsLoading(true);
        setUsernameError(null);
        setSuccessMessage("");

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put("http://localhost:8080/username",
                {username: newUsername}, 
                {
                headers: {Authorization: `Bearer ${token}`}
            })
            setSuccessMessage(response.data.message);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setUsernameError(err.response.data || "Failed to update username. Please try again.");
            } else {
                setUsernameError("Failed to update username. Please try again.");
            }
        } finally {
            setUsernameIsLoading(false);
        }
    }
    return {updateUsername, usernameIsLoading, usernameError, successMessage}
}

// change password
const useUpdatePassword = () => {
    const [passwordIsLoading, setPasswordIsLoading] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState("");

    const updatePassword = async (newPassword: string) => {
        setPasswordError(null);
        setPasswordIsLoading(true);
        setSuccessMessage("");

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put("http://localhost:8080/password", {
                password: newPassword
            }, 
        {headers: {Authorization: `Bearer ${token}`}
    });
    setSuccessMessage(response.data.message);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setPasswordError(err.response.data || "Failed to update password. Please try again.");
            } else {
                setPasswordError("Failed to update password. Please Try again.");
            }
        } finally {
            setPasswordIsLoading(false);
        }
    }
    return {updatePassword, passwordIsLoading, passwordError, successMessage}
}


// History
const useGetExpenseYears = () => {
    const [years, setYears] = useState<YearData[]>([]);
    const [yearsIsLoading, setYearsIsLoading] = useState(true);
    const [yearsError, setYearsError] = useState<string | null>(null);
  
    const fetchYears = async () => {
      setYearsIsLoading(true);
      setYearsError(null);
  
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/expense-years', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setYears(response.data);
      } catch {
        setYearsError('Failed to fetch years');
      } finally {
        setYearsIsLoading(false);
      }
    };
  
    return { years, yearsIsLoading, yearsError, fetchYears };
  };

  const useGetExpenseMonths = () => {
    const [months, setMonths] = useState<MonthData[]>([]);
    const [monthsIsLoading, setMonthsIsLoading] = useState(false);
    const [monthsError, setMonthsError] = useState<string | null>(null);
  
    const fetchMonths = async (year: any) => {
      setMonthsIsLoading(true);
      setMonthsError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/expense-months", {
          params: { year },
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched months: ", response.data);
        setMonths(response.data);
      } catch {
        setMonthsError("Failed to fetch months");
      } finally {
        setMonthsIsLoading(false);
      }
    };
  
    return { months, monthsIsLoading, monthsError, fetchMonths };
  };

  const useGetExpenseDays = () => {
    const [days, setDays] = useState<DayData[]>([]);
    const [daysIsLoading, setDaysIsLoading] = useState(false);
    const [daysError, setDaysError] = useState<string | null>(null);

    const fetchDays = async (month: any) => {
        setDaysIsLoading(true);
        setDaysError(null);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/expense-days", {
                params: { month },
                headers: {Authorization: `Bearer ${token}`},
            });
            console.log('Fetched days: ', response.data);
            setDays(response.data);
        } catch {
            setDaysError("Failed to fetch days");
        } finally {
            setDaysIsLoading(false);
        }
    }
    return {days, daysIsLoading, daysError, fetchDays};
  }

  const useGetOneDaysExpenses = () => {
    const [daysExpenses, setDaysExpenses] = useState<ExpenseData[]>([]);
    const [daysExpensesIsLoading, setDaysExpensesIsLoading] = useState(false);
    const [daysExpensesError, setDaysExpensesError] = useState<string | null>(null);

    const fetchDaysExpenses = async (day: any) => {
        setDaysExpensesIsLoading(true);
        setDaysExpensesError(null);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/days-expenses", {
                params: { day },
                headers: {Authorization: `Bearer ${token}`}
            })
            console.log(response.data);
            setDaysExpenses(response.data)
        } catch {
            setDaysExpensesError("Failed to fetch day's expenses")
        } finally {
            setDaysExpensesIsLoading(false)
        }
    }
    return {daysExpenses, daysExpensesIsLoading, daysExpensesError, fetchDaysExpenses}
  }

  const useGetOneMonthsExpenses = () => {
    const [monthsExpenses, setMonthsExpenses] = useState<ExpenseData[]>([]);
    const [monthsExpensesIsLoading, setMonthsExpensesIsLoading] = useState(false);
    const [monthsExpenseError, setMonthsExpenseError] = useState<string | null>(null);

    const fetchMonthsExpenses = async (month: any) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/months-expenses", {
                params: { month },
                headers: {Authorization: `Bearer ${token}`}
            })
            console.log(response.data);
            setMonthsExpenses(response.data);
        } catch {
            setMonthsExpenseError("Failed to fetch month's expenses")
        } finally {
            setMonthsExpensesIsLoading(false);
        }
    }
    return {monthsExpenses, monthsExpensesIsLoading, monthsExpenseError, refetchMonthsExpenses: fetchMonthsExpenses}
  }

// login
const useLogin = () => {
    const [loginIsLoading, setLoginIsLoading] = React.useState(false);
    const [loginError, setLoginError] = React.useState<string | null>(null);
  
    const login = async (email: string, password: string): Promise<string | null> => {
      setLoginIsLoading(true);
      setLoginError(null);
      try {
        const response = await axios.post("http://localhost:8080/login", {
          email,
          password,
        });
        const token = response.data.token;
        if (token) {
            localStorage.setItem("token", token)
        }
        return token;
      } catch (err: any) {
        setLoginError(err.response?.data || "Failed to login");
        return null;
      } finally {
        setLoginIsLoading(false);
      }
    };
  
    return { login, loginIsLoading, loginError };
  };

// register
const useRegister = () => {
    const [registerIsLoading, setRegisterIsLoading] = React.useState(false);
    const [registerError, setRegisterError] = React.useState<string | null>(null);

    const register = async (email: string, username: string, password: string): Promise<string | null> => {
        setRegisterIsLoading(true);
        setRegisterError(null);
        try {
            const response = await axios.post("http://localhost:8080/register", {
                email, username, password
            })
            const token = response.data.token;
            if (token) {
                localStorage.setItem("token", token)
            }
            return token;
        } catch (err: any) {
            setRegisterError(err.response?.data || "Failed to register");
            return null;
        } finally {
            setRegisterIsLoading(false);
        }
    }
    return {register, registerIsLoading, registerError};
}

export { 
    useFetchExpenses, 
    useDeleteExpense, 
    useFetchAssets, 
    useDeleteAsset, 
    useAddAsset, 
    useUpdateAsset, 
    useLogin, 
    useAddExpense, 
    useUpdateExpense, 
    useRegister, 
    useGetUserInfo, 
    useGetExpenseYears, 
    useGetExpenseMonths, 
    useGetExpenseDays, 
    useGetOneDaysExpenses, 
    useGetOneMonthsExpenses, 
    useUpdateUsername,
    useUpdatePassword
};

