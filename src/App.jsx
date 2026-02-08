import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AdminLayout from './components/layout/AdminLayout';

// Shop Pages
import Shop from './pages/user/Shop';
import ProductDetail from './pages/user/ProductDetail';
import CartPage from './pages/user/CartPage';
import Login from './pages/user/Login';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ProductManagement from './pages/admin/ProductManagement';

const UserLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
    <footer className="bg-white border-t py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-500">© 2026 MyStore Platform. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

function App() {
  return (
    <Routes>
      {/* User Facing Routes */}
      <Route path="/" element={<UserLayout><Shop /></UserLayout>} />
      <Route path="/shop" element={<UserLayout><Shop /></UserLayout>} />
      <Route path="/product/:id" element={<UserLayout><ProductDetail /></UserLayout>} />
      <Route path="/cart" element={<UserLayout><CartPage /></UserLayout>} />
      <Route path="/login" element={<UserLayout><Login /></UserLayout>} />

      {/* Admin Panel Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="orders" element={
          <div className="flex flex-col items-center justify-center py-20 card">
            <h2 className="text-xl font-bold">Order Management Module</h2>
            <p className="text-gray-500 mt-2">Connecting to fulfillment logs...</p>
          </div>
        } />
        <Route path="customers" element={
          <div className="flex flex-col items-center justify-center py-20 card">
            <h2 className="text-xl font-bold">Customer CRM</h2>
            <p className="text-gray-500 mt-2">Loading user database...</p>
          </div>
        } />
      </Route>

      {/* Redirects */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
