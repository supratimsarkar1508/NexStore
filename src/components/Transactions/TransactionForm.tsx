import React, { useState } from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import { Category } from '../../types';
import { PlusCircle, X } from 'lucide-react';

const CATEGORIES: Category[] = [
  'Food', 'Transport', 'Housing', 'Entertainment', 
  'Health', 'Shopping', 'Bills', 'Income', 'Other'
];

interface FormProps {
  onClose?: () => void;
}

const TransactionForm: React.FC<FormProps> = ({ onClose }) => {
  const { addTransaction } = useExpenses();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Other' as Category,
    type: 'expense' as 'income' | 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    addTransaction({
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      date: formData.date,
    });

    setFormData({
      description: '',
      amount: '',
      category: 'Other',
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
    
    if (onClose) onClose();
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-800">New Transaction</h3>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2 p-1 bg-slate-100 rounded-lg mb-4">
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              formData.type === 'expense' ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500'
            }`}
            onClick={() => setFormData({ ...formData, type: 'expense' })}
          >
            Expense
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              formData.type === 'income' ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500'
            }`}
            onClick={() => setFormData({ ...formData, type: 'income', category: 'Income' })}
          >
            Income
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <input
            type="text"
            required
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            placeholder="e.g. Weekly Groceries"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Amount (₹)</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
          <PlusCircle size={18} />
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
