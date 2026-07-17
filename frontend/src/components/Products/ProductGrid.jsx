import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product._id} className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-sm transition-all duration-200">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
            <img
              src={product.images[0]?.url || '/placeholder-product.jpg'}
              alt={product.name}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
            {product.prescriptionRequired && (
              <span className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                Rx Required
              </span>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">
              <Link to={`/products/${product._id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold text-primary-600">₹{product.price.toFixed(2)}</p>
              {product.countInStock > 0 ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;

