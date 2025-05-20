import React from 'react';
import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading ,error }) => {
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <Link to={`/product/${product.id}`}>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-contain mb-3" 
            />
            <h4 className="font-semibold text-gray-800">{product.name}</h4>
            <p className="text-gray-600">₹{product.price}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {product.category}
              </span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                {product.subcategory}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
          </Link>
        </div>
        
      ))}
    </div>
  );
};

export default ProductGrid;