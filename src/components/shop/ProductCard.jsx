import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`Added ${product.title} to cart!`);
  };

  return (
    <div className="card group hover:shadow-lg transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-primary-700 uppercase">
            {product.category}
          </span>
          {product.discountPercentage > 10 && (
            <span className="bg-red-500 px-2 py-1 rounded text-[10px] font-bold text-white uppercase">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-center mb-1">
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
          <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{product.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg transition-colors text-gray-700"
            title="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
