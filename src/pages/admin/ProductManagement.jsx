import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Image as ImageIcon
} from 'lucide-react';
import { apiClient } from '../../api/client';
import toast from 'react-hot-toast';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    loadProducts();
  }, [page]);

  const loadProducts = async () => {
    setLoading(true);
    const data = await apiClient.getProducts(10, page * 10);
    setProducts(data.products);
    setLoading(false);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      await apiClient.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success("Product deleted successfully");
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or category..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
            <Filter className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 font-medium">
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Product</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Price</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Rating</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="6" className="px-6 py-8 h-20 bg-gray-50/50"></td>
                  </tr>
                ))
              ) : filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-100 shadow-sm">
                        {product.thumbnail ? (
                          <img src={product.thumbnail} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <ImageIcon className="h-full w-full p-2 text-gray-300" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900 tracking-tight">{product.title}</div>
                        <div className="text-xs text-gray-400 font-mono">ID: {product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-wider">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${product.stock > 10 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm text-gray-600">{product.stock} units</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-yellow-500 font-bold text-sm">
                      <span className="mr-1">{product.rating}</span>
                      ★
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id, product.title)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Showing {page * 10 + 1} to {(page + 1) * 10} of 100 entries
          </p>
          <div className="flex space-x-2">
            <button 
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
              className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              disabled={page === 9}
              onClick={() => setPage(p => p + 1)}
              className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
