import React from 'react';

const ProductCard = ({ product, onSelect, onAddToCart }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-gold-100 rounded-2xl shadow-regal overflow-hidden hover:-translate-y-1 transition-all duration-300">
      <div className="p-4 cursor-pointer" onClick={() => onSelect(product._id)}>
        <div className="relative h-48 bg-champagne-50 rounded-xl mb-4 flex items-center justify-center p-2">
          <img src={product.images[0]?.url} alt={product.name} className="h-full w-full object-contain" loading="lazy" />
          {product.prescriptionRequired && (
            <div className="absolute top-2 right-2 bg-danger-50 text-danger-800 border border-danger-200 text-xs px-2 py-1 rounded-md font-semibold">
              Rx Required
            </div>
          )}
        </div>
        <div className="mb-2">
          <h3 className="font-serif text-xl font-bold text-primary-950 line-clamp-2">{product.name}</h3>
          <p className="text-sm font-medium text-primary-700/70">{product.subcategory}</p>
        </div>
        <div className="flex items-center mb-2">
          <div className="flex text-gold-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < (product.rating || 4) ? '★' : '☆'}</span>
            ))}
          </div>
          <span className="ml-1 text-xs text-primary-700/60 font-medium">({product.numReviews || 0})</span>
        </div>
      </div>
      <div className="p-4 border-t border-gold-100 flex justify-between items-center bg-champagne-50/50">
        <span className="font-bold text-lg text-primary-900">₹{product.price.toFixed(2)}</span>
        <button onClick={() => onAddToCart(product)} className="px-4 py-2 bg-primary-800 text-champagne-50 rounded-full hover:bg-primary-900 transition-colors text-sm font-semibold shadow-sm">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;