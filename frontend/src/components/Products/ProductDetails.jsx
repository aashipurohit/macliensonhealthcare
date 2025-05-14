import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../assets/assets.js';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('description');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Sarah Johnson', rating: 5, comment: 'Excellent product! Really helped with my needs.', date: '2025-03-15' },
    { id: 2, name: 'Michael Chen', rating: 4, comment: 'Good quality, would recommend to others.', date: '2025-02-28' },
  ]);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return <div className="container mx-auto px-4 py-8 text-center">Product not found</div>;
  }

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReview = {
      id: reviews.length + 1,
      name: 'You',
      rating,
      comment: review,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([...reviews, newReview]);
    setReview('');
    setRating(5);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg shadow-md p-6 flex justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-h-96 object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            {product.bestseller && (
              <span className="inline-block bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">
                Bestseller
              </span>
            )}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill={i < 4 ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 text-sm">({reviews.length} reviews)</span>
            </div>
            <p className="text-2xl font-bold text-blue-600 mb-6">${product.price.toFixed(2)}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {product.category}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                {product.subcategory}
              </span>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('details')}
          >
            Product Details
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({reviews.length})
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mb-12">
        {activeTab === 'description' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">About this product</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        )}

        {activeTab === 'details' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Product Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">General Information</h4>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Category:</strong> {product.category}</li>
                  <li><strong>Subcategory:</strong> {product.subcategory}</li>
                  <li><strong>Release Date:</strong> {product.date}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Additional Details</h4>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Status:</strong> {product.bestseller ? 'Bestseller' : 'Available'}</li>
                  <li><strong>Product ID:</strong> {product.id}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>
            
            {/* Reviews List */}
            <div className="space-y-6 mb-8">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5" fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm">{review.date}</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{review.name}</h4>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
            
            {/* Add Review Form */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-medium mb-4">Write a Review</h4>
              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Your Rating</label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <svg className="w-8 h-8" fill={star <= rating ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="review" className="block text-gray-700 mb-2">Your Review</label>
                  <textarea
                    id="review"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-6">You May Also Like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products
            .filter(p => p.id !== product.id && p.category === product.category)
            .slice(0, 4)
            .map((relatedProduct) => (
              <div 
                key={relatedProduct.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
              >
                <div className="relative pb-[100%]">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="absolute h-full w-full object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{relatedProduct.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{relatedProduct.subcategory}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">${relatedProduct.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;