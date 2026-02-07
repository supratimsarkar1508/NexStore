import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Store, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    login(email, password);
    toast.success(`Welcome back, ${email.split('@')[0]}!`);
    
    if (email.startsWith('admin')) {
      navigate('/admin');
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="bg-primary-600 inline-block p-4 rounded-3xl mb-4 shadow-xl shadow-primary-200">
            <Store className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">NexStore</h1>
          <p className="text-gray-500 mt-2">Log in to your account</p>
        </div>

        <div className="card p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                  placeholder="admin@nexstore.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-4 rounded-xl flex items-center justify-center space-x-3 text-lg font-bold">
              <span>Sign In</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
            <button 
               onClick={() => { setEmail('admin@nexstore.com'); setPassword('admin123'); }}
               className="text-xs text-center p-3 rounded-lg border-2 border-primary-50 hover:bg-primary-50 transition-colors"
            >
              <ShieldCheck className="h-4 w-4 mx-auto mb-1 text-primary-600" />
              <span className="font-bold text-gray-700">Admin Demo</span>
            </button>
            <button 
               onClick={() => { setEmail('user@example.com'); setPassword('user123'); }}
               className="text-xs text-center p-3 rounded-lg border-2 border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <Store className="h-4 w-4 mx-auto mb-1 text-gray-600" />
              <span className="font-bold text-gray-700">User Demo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
