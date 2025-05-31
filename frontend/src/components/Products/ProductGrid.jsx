// import React from 'react';
// import { Link } from "react-router-dom";

// const ProductGrid = ({ products, loading ,error }) => {
//   if (loading) {
//     return <p>Loading...</p>
//   }

//   if (error) {
//     return <p>Error: {error}</p>
//   }
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {products.map((product) => (
//         <div 
//           key={product.id} 
//           className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
//         >
//           <Link to={`/product/${product.id}`}>
//             <img 
//               src={product.image} 
//               alt={product.name} 
//               className="w-full h-48 object-contain mb-3" 
//             />
//             <h4 className="font-semibold text-gray-800">{product.name}</h4>
//             <p className="text-gray-600">₹{product.price}</p>
//             <div className="flex flex-wrap gap-1 mt-2">
//               <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                 {product.category}
//               </span>
//               <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
//                 {product.subcategory}
//               </span>
//             </div>
//             <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
//           </Link>
//         </div>
        
//       ))}
//     </div>
//   );
// };

// export default ProductGrid;

import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product._id} className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
              <p className="text-lg font-bold text-rose-600">₹{product.price.toFixed(2)}</p>
              {product.countInStock > 0 ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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