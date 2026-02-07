export type Category = 
  | 'Food' 
  | 'Transport' 
  | 'Housing' 
  | 'Entertainment' 
  | 'Health' 
  | 'Shopping' 
  | 'Income' 
  | 'Bills' 
  | 'Other';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: Category;
  type: 'income' | 'expense';
  date: string;
}

export interface SummaryData {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}
