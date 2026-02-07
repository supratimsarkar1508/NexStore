import React from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import Navbar from './components/Layout/Navbar';
import SummaryCards from './components/Dashboard/SummaryCards';
import ExpenseChart from './components/Dashboard/ExpenseChart';
import TransactionForm from './components/Transactions/TransactionForm';
import TransactionList from './components/Transactions/TransactionList';

const App: React.FC = () => {
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Financial Dashboard</h1>
            <p className="text-slate-500 mt-1">Track your spending habits and manage your monthly budget.</p>
          </div>

          <SummaryCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-24">
                <TransactionForm />
              </div>
            </div>
            
            <div className="lg:col-span-8 xl:col-span-9">
              <ExpenseChart />
              <TransactionList />
            </div>
          </div>
        </main>

        <footer className="py-6 border-t border-slate-200 text-center text-slate-400 text-sm mt-12 bg-white">
          <p>© {new Date().getFullYear()} SpentWise Personal Expense Tracker. All rights reserved.</p>
        </footer>
      </div>
    </ExpenseProvider>
  );
};

export default App;
