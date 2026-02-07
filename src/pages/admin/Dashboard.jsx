import React from 'react';
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Box,
  Clock
} from 'lucide-react';

const StatCard = ({ title, value, subValue, trend, icon: Icon, color }) => (
  <div className="card p-6">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className={`flex items-center text-xs font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
        {trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
        {subValue}
      </div>
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

const Dashboard = () => {
  const recentOrders = [
    { id: '#10254', customer: "James Wilson", status: "Delivered", amount: "$124.50", date: "2 hours ago" },
    { id: '#10253', customer: "Sarah Miller", status: "Processing", amount: "$35.20", date: "4 hours ago" },
    { id: '#10252', customer: "Robert Brown", status: "Pending", amount: "$82.00", date: "Yesterday" },
    { id: '#10251', customer: "Elena White", status: "Shipped", amount: "$210.00", date: "Yesterday" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$54,232.00" 
          subValue="+12.5%" 
          trend="up" 
          icon={DollarSign} 
          color="blue" 
        />
        <StatCard 
          title="Total Orders" 
          value="1,240" 
          subValue="+8.2%" 
          trend="up" 
          icon={ShoppingCart} 
          color="purple" 
        />
        <StatCard 
          title="Active Users" 
          value="452" 
          subValue="-2.4%" 
          trend="down" 
          icon={TrendingUp} 
          color="emerald" 
        />
        <StatCard 
          title="Stock Alerts" 
          value="12 items" 
          subValue="Low stock" 
          trend="down" 
          icon={Package} 
          color="orange" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
              <button className="text-primary-600 text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase ${
                          order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{order.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Inventory Status</h3>
            <div className="space-y-6">
              {[
                { label: "Electronics", val: 85, color: "bg-blue-500" },
                { label: "Laptops", val: 42, color: "bg-purple-500" },
                { label: "Fragrances", val: 12, color: "bg-red-500" },
                { label: "Skincare", val: 68, color: "bg-emerald-500" }
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-gray-600 uppercase tracking-wider">{item.label}</span>
                    <span className="text-gray-900">{item.val}% full</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${item.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 bg-primary-600 text-white border-0">
             <div className="flex items-center space-x-3 mb-4">
                <Box className="h-8 w-8 text-primary-200" />
                <h3 className="text-lg font-bold">System Status</h3>
             </div>
             <p className="text-primary-100 text-sm mb-6">All systems are operational. Global logistics networks are currently at 100% capacity.</p>
             <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold transition-all">Check Network Logs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
