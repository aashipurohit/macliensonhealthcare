import React from 'react';

const ProductCard = ({ product, onSelect, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div 
        className="p-4 cursor-pointer"
        onClick={() => onSelect(product._id)}
      >
        <div className="relative h-48 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
          <img 
            src={product.images[0]?.url} 
            alt={product.name}
            className="h-full w-full object-contain"
            loading="lazy"
          />
          {product.prescriptionRequired && (
            <div className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              Rx Required
            </div>
          )}
        </div>
        
        <div className="mb-2">
          <h3 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.subcategory}</p>
        </div>
        
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < (product.rating || 4) ? '★' : '☆'}</span>
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-500">({product.numReviews || 0})</span>
        </div>
      </div>
      
      <div className="p-4 border-t flex justify-between items-center">
        <span className="font-bold text-rose-500">₹{product.price.toFixed(2)}</span>
        <button
          onClick={() => onAddToCart(product)}
          className="px-3 py-1 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;