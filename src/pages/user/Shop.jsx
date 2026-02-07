import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { apiClient } from '../../api/client';
import ProductCard from '../../components/shop/ProductCard';
import { Filter, SlidersHorizontal, Loader2 } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (query) {
      searchProducts(query);
    } else {
      fetchProducts();
    }
  }, [selectedCategory, query]);

  const fetchInitialData = async () => {
    const cats = await apiClient.getCategories();
    setCategories(cats);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let data;
      if (selectedCategory === 'all') {
        data = await apiClient.getProducts(40);
      } else {
        data = await apiClient.getProductsByCategory(selectedCategory);
      }
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (q) => {
    setLoading(true);
    const data = await apiClient.searchProducts(q);
    setProducts(data.products);
    setLoading(false);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2" /> Categories
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                  selectedCategory === 'all' ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors capitalize ${
                    selectedCategory === cat.slug ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {query ? `Search results for "${query}"` : selectedCategory === 'all' ? 'All Products' : `Category: ${selectedCategory}`}
              </h2>
              <p className="text-sm text-gray-500">{products.length} products found</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-400" />
              <select 
                className="bg-white border rounded-md px-3 py-1.5 text-sm focus:ring-primary-500 outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="h-10 w-10 text-primary-600 animate-spin" />
              <p className="mt-4 text-gray-500">Loading amazing products...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="bg-gray-100 inline-block p-4 rounded-full mb-4">
                <Filter className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
