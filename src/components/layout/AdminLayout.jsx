import React from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  ArrowLeft 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { clsx } from 'clsx';

const AdminLayout = () => {
  const { isAdmin, user, logout } = useAuth();
  const location = useLocation();

  if (!isAdmin) return <Navigate to="/" replace />;

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', href: '/admin/customers', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-wider">ADMIN PANEL</h2>
          <p className="text-slate-400 text-xs mt-1">NEXSTORE Management</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={clsx(
                "admin-sidebar-item",
                location.pathname === item.href 
                  ? "bg-primary-600 text-white" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link to="/" className="flex items-center space-x-3 p-3 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Marketplace</span>
          </Link>
          <button 
            onClick={logout}
            className="flex items-center space-x-3 p-3 w-full text-red-400 hover:bg-red-500/10 transition-colors rounded-lg"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-800">
            {navigation.find(n => n.href === location.pathname)?.name || 'Admin'}
          </h1>
          <div className="flex items-center space-x-4">
             <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">System Administrator</p>
             </div>
             <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border-2 border-primary-200">
               {user?.name?.[0].toUpperCase()}
             </div>
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
