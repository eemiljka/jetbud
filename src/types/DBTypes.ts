type Asset = {
    asset_id: number;
    description: string;
    asset_sum: number | string;
}

type Expense = {
    expense_id: number;
    description: string;
    expense_sum: number | string;
  };

type User = {
    user_id: number;
    username: string;
    email: string;
    password: string;
}

type Year = {
    year: number
}

export type { Asset, Expense, User, Year };