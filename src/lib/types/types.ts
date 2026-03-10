
export interface Budget {
  id: string;
  name: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  budgets: Budget[];
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
}
