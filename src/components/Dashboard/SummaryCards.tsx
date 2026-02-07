import React from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';

const SummaryCards: React.FC = () => {
  const { summary } = useExpenses();

  const cards = [
    {
      title: 'Current Balance',
      amount: summary.balance,
      icon: <Wallet className="text-primary-600" />,
      bgColor: 'bg-primary-50',
      textColor: summary.balance >= 0 ? 'text-green-600' : 'text-red-600'
    },
    {
      title: 'Total Income',
      amount: summary.totalIncome,
      icon: <TrendingUp className="text-green-600" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Expenses',
      amount: summary.totalExpenses,
      icon: <TrendingDown className="text-red-600" />,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className="card flex items-center gap-4">
          <div className={`${card.bgColor} p-4 rounded-full`}>
            {card.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              {card.title}
            </p>
            <p className={`text-2xl font-bold ${card.title === 'Current Balance' ? card.textColor : 'text-slate-900'}`}>
              {new Intl.NumberFormat("en-IN", {
                style:"currency",
                currency: "INR",
                minimumFractionDigits: 2
                 }).format(card.amount)}
                 </p>


          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
