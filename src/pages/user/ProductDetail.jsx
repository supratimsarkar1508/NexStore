import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/client';
import { useCart } from '../../context/CartContext';
import { Star, Truck, ShieldCheck, RotateCcw, ShoppingBag, Plus, Minus, ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await apiClient.getProductById(id);
        setProduct(data);
      } catch (err) {
        toast.error("Failed to load product");
        navigate('/shop');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  );

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Successfully added ${quantity} item(s) to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary-600 mb-8 transition-colors group"
      >
        <ChevronLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to shopping
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-gray-200">
            <img 
              src={product.images[activeImage]} 
              alt={product.title} 
              className="w-full h-full object-contain p-8"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative w-24 h-24 flex-shrink-0 bg-white border-2 rounded-lg overflow-hidden transition-all ${
                  activeImage === idx ? 'border-primary-600' : 'border-gray-200 opacity-60'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover p-2" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="pb-6 border-b border-gray-100">
            <span className="text-primary-600 text-sm font-bold tracking-widest uppercase mb-2 block">
              {product.category}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">{product.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center px-2 py-1 bg-yellow-50 rounded">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="ml-1 text-sm font-bold text-yellow-700">{product.rating}</span>
              </div>
              <span className="text-gray-400 text-sm">|</span>
              <span className="text-sm font-medium text-emerald-600">
                {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
              </span>
              <span className="text-gray-400 text-sm">|</span>
              <span className="text-sm text-gray-500 font-medium">SKU: {product.sku}</span>
            </div>
            <div className="flex items-end space-x-3">
              <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
              {product.discountPercentage > 0 && (
                <div className="flex flex-col mb-1">
                  <span className="text-sm text-red-500 font-bold">-{Math.round(product.discountPercentage)}% OFF</span>
                  <span className="text-lg text-gray-400 line-through leading-none">
                    ₹{(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="py-8">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <div className="mt-auto space-y-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center border border-gray-300 rounded-lg p-1 bg-white">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn-primary flex-1 flex items-center justify-center space-x-3 py-4 text-lg disabled:opacity-50"
              >
                <ShoppingBag className="h-6 w-6" />
                <span>Add to Shopping Bag</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              <div className="flex items-center space-x-3 text-gray-600">
                <Truck className="h-5 w-5 text-primary-600" />
                <span className="text-sm">Free Global Delivery</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <ShieldCheck className="h-5 w-5 text-primary-600" />
                <span className="text-sm">2-Year Warranty</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <RotateCcw className="h-5 w-5 text-primary-600" />
                <span className="text-sm">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
