import React, { useState, useEffect, useCallback } from 'react';
import { products as productsData, assets } from '../assets/assets';

const ProductDetailModal = ({ product, similarProducts, onClose, onAddToCart, onSimilarProductClick }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
              <div className="flex items-center mt-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < (product.rating || 4) ? '★' : '☆'}</span>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({product.reviews?.length || 12} reviews)
                </span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Close product details"
            >
              &times;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-100 rounded-lg flex items-center justify-center p-4 relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="h-64 w-full object-contain"
                loading="lazy"
              />
              <div className="absolute top-2 left-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {product.category}
              </div>
              {product.prescriptionRequired && (
                <div className="absolute top-2 right-2 bg-rose-100 text-red-800 text-xs px-2 py-1 rounded">
                  Prescription Required
                </div>
              )}
            </div>
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Product Information</h3>
                <div className="mt-2 text-sm text-gray-600">
                  <p><span className="font-medium">Category:</span> {product.category}</p>
                  <p><span className="font-medium">Subcategory:</span> {product.subcategory}</p>
                  <p><span className="font-medium">Prescription:</span> {product.prescriptionRequired ? 'Required' : 'Not Necessary'}</p>
                </div>
              </div>
              
              <p className="text-lg font-bold text-blue-600 mb-4">₹{product.price.toFixed(2)}</p>
              
              <div className="prose prose-sm text-gray-600 mb-4">
                {product.detailedDescription || (
                  <>
                    <p>{product.description}</p>
                    <p className="mt-2">This premium pharmaceutical product is formulated with the highest quality ingredients to ensure maximum efficacy and safety. Each batch undergoes rigorous quality testing to meet industry standards.</p>
                    <p className="mt-2">Recommended for: {product.subcategory === 'Nutritional Supplement' ? 'Daily nutritional support' : 'Targeted therapeutic use'}.</p>
                    <p className="mt-2">Storage: Keep in a cool, dry place away from direct sunlight.</p>
                  </>
                )}
              </div>

              <div className="mb-6">
                <h4 className="text-md font-semibold mb-2">Customer Reviews</h4>
                <div className="space-y-3">
                  {(product.reviews || [
                    { id: 1, name: 'Rahul Sharma', rating: 5, comment: 'Excellent product! Worked wonders for me.', date: '2023-05-15' },
                    { id: 2, name: 'Priya Patel', rating: 4, comment: 'Good quality, fast delivery.', date: '2023-04-22' }
                  ]).slice(0, 2).map(review => (
                    <div key={review.id} className="border-b pb-3">
                      <div className="flex justify-between">
                        <p className="font-medium">{review.name}</p>
                        <div className="flex text-yellow-400 text-sm">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                      <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => onAddToCart(product)}
                className="w-full py-2 px-4 bg-rose-400 text-white rounded-md hover:bg-rose-500 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {similarProducts.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Similar Products</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {similarProducts.map(similar => (
                  <div 
                    key={similar.id} 
                    className="border rounded-lg p-2 cursor-pointer hover:shadow-md"
                    onClick={() => onSimilarProductClick(similar)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onSimilarProductClick(similar)}
                    aria-label={`View ${similar.name}`}
                  >
                    <div className="relative h-24 bg-gray-100 rounded flex items-center justify-center mb-2">
                      <img 
                        src={similar.image} 
                        alt={similar.name}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                      <div className="absolute top-1 left-1 bg-blue-100 text-rose-400 text-xs px-1 py-0.5 rounded">
                        {similar.category}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-800 truncate">{similar.name}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">{similar.subcategory}</span>
                      <span className="text-xs font-bold text-rose-300">₹{similar.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PharmaceuticalProductsPage = () => {
  // State for filters
  const [selectedCategories, setSelectedCategories] = useState(['Women', 'Sports Nutrition', 'Kids Nutrition']);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [prescriptionFilter, setPrescriptionFilter] = useState('all');
  const [sortOption, setSortOption] = useState('relevance');
  
  // State for mobile filter/sort visibility
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMobileSort, setShowMobileSort] = useState(false);
  
  // State for product details modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // State for filtered and sorted products
  const [displayedProducts, setDisplayedProducts] = useState(productsData);
  
  // Categories and subcategories
  const categories = ['Women', 'Sports Nutrition', 'Kids Nutrition'];
  const subcategories = [...new Set(productsData.map(product => product.subcategory))];
  
  // Calculate min and max prices from the data
  const minPrice = 0;
  const maxPrice = Math.max(...productsData.map(p => p.price), 500);
  
  // Enhanced product data with prescriptions and ratings
  const enhancedProducts = productsData.map(product => ({
    ...product,
    prescriptionRequired: product.subcategory === 'Analgesic' ? false : Math.random() > 0.5,
    rating: Math.floor(Math.random() * 2) + 4, // Random rating between 4-5
    reviews: []
  }));

  // Apply filters and sorting
  const applyFilters = useCallback(() => {
    let filtered = [...enhancedProducts];
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Apply subcategory filter
    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedSubcategories.includes(product.subcategory)
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply prescription filter
    if (prescriptionFilter !== 'all') {
      const needsPrescription = prescriptionFilter === 'required';
      filtered = filtered.filter(product => 
        product.prescriptionRequired === needsPrescription
      );
    }
    
    // Apply in stock filter
    if (inStockOnly) {
      filtered = filtered; // In a real app, filter by actual stock status
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'relevance':
      default:
        filtered.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
    }
    
    setDisplayedProducts(filtered);
  }, [selectedCategories, selectedSubcategories, priceRange, inStockOnly, sortOption, prescriptionFilter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Get similar products for modal
  const getSimilarProducts = useCallback((product) => {
    return enhancedProducts
      .filter(p => p.id !== product.id && p.subcategory === product.subcategory)
      .slice(0, 3);
  }, [enhancedProducts]);

  // Handlers
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategories(prev => 
      prev.includes(subcategory) 
        ? prev.filter(s => s !== subcategory) 
        : [...prev, subcategory]
    );
  };
  
  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseFloat(e.target.value);
    setPriceRange(newPriceRange);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleSimilarProductClick = (product) => {
    setSelectedProduct(product);
    // Smooth scroll to top of modal
    setTimeout(() => {
      const modal = document.querySelector('.fixed.inset-0');
      if (modal) modal.scrollTop = 0;
    }, 10);
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product.name);
  };

  return (
    <div className="w-full bg-rose-100">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 px-4 pt-8">Products</h1>
        
        {/* Mobile Filter/Sort Buttons */}
        <div className="md:hidden flex justify-between mb-4 px-4">
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-1 px-4 py-2 bg-rose-200 rounded-lg shadow-sm"
            aria-expanded={showMobileFilters}
            aria-controls="mobile-filters"
          >
            <span>Filters</span>
            <span className="text-xl" aria-hidden="true">⋮</span>
          </button>
          <button 
            onClick={() => setShowMobileSort(!showMobileSort)}
            className="flex items-center gap-1 px-4 py-2 bg-rose-200 rounded-lg shadow-sm"
            aria-expanded={showMobileSort}
            aria-controls="mobile-sort"
          >
            <span>Sort</span>
            <span className="text-xl" aria-hidden="true">⋮</span>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Filter Sidebar */}
          <div 
            id="mobile-filters"
            className={`${showMobileFilters ? 'block fixed inset-0 z-40 bg-rose-200 p-6 overflow-y-auto' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}
          >
            <div className="md:bg-rose-200 md:p-6 md:rounded-lg md:shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Filters</h2>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="md:hidden text-gray-500 hover:text-gray-700"
                  aria-label="Close filters"
                >
                  &times;
                </button>
              </div>
              
              {/* Categories Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-gray-700">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-rose-400 rounded focus:ring-rose-300"
                      />
                      <span className="ml-2 text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Subcategories Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-gray-700">Subcategories</h3>
                <div className="space-y-2">
                  {subcategories.map(subcategory => (
                    <label key={subcategory} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedSubcategories.includes(subcategory)}
                        onChange={() => handleSubcategoryChange(subcategory)}
                        className="h-4 w-4 text-rose-400 rounded focus:ring-rose-300"
                      />
                      <span className="ml-2 text-gray-700">{subcategory}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Prescription Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-gray-700">Prescription</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="prescription"
                      checked={prescriptionFilter === 'all'}
                      onChange={() => setPrescriptionFilter('all')}
                      className="h-4 w-4 text-rose-400 focus:ring-rose-300"
                    />
                    <span className="ml-2 text-gray-700">All Products</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="prescription"
                      checked={prescriptionFilter === 'required'}
                      onChange={() => setPrescriptionFilter('required')}
                      className="h-4 w-4 text-rose-400 focus:ring-rose-300"
                    />
                    <span className="ml-2 text-gray-700">Prescription Required</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="prescription"
                      checked={prescriptionFilter === 'not-required'}
                      onChange={() => setPrescriptionFilter('not-required')}
                      className="h-4 w-4 text-rose-400 focus:ring-rose-300"
                    />
                    <span className="ml-2 text-gray-700">No Prescription Needed</span>
                  </label>
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-gray-700">Price Range</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="w-full mb-2"
                    aria-label="Minimum price"
                  />
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-full"
                    aria-label="Maximum price"
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>₹{priceRange[0].toFixed(2)}</span>
                  <span>₹{priceRange[1].toFixed(2)}</span>
                </div>
              </div>
              
              {/* Availability Filter */}
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={() => setInStockOnly(!inStockOnly)}
                    className="h-4 w-4 text-rose-400 rounded focus:ring-rose-300"
                  />
                  <span className="ml-2 text-gray-700">In Stock Only</span>
                </label>
              </div>

              <button 
                onClick={() => setShowMobileFilters(false)}
                className="md:hidden w-full py-2 px-4 bg-rose-400 text-white rounded-md mt-4"
              >
                Apply Filters
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 px-4 pb-8">
            {/* Sort Options */}
            <div className="hidden md:flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="text-gray-600">
                Showing {displayedProducts.length} products
              </div>
              <div className="flex items-center">
                <label htmlFor="sort-select" className="mr-2 text-gray-700">Sort by:</label>
                <select
                  id="sort-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="alphabetical">Alphabetical</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>
            
            {/* Mobile Sort Options */}
            {showMobileSort && (
              <div 
                id="mobile-sort"
                className="md:hidden mb-6 bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-700">Sort By</h3>
                  <button 
                    onClick={() => setShowMobileSort(false)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close sort options"
                  >
                    &times;
                  </button>
                </div>
                <div className="space-y-2">
                  {[
                    { value: 'relevance', label: 'Relevance' },
                    { value: 'price-low-high', label: 'Price: Low to High' },
                    { value: 'price-high-low', label: 'Price: High to Low' },
                    { value: 'alphabetical', label: 'Alphabetical' },
                    { value: 'newest', label: 'Newest' },
                    { value: 'rating', label: 'Customer Rating' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="sortOption"
                        value={option.value}
                        checked={sortOption === option.value}
                        onChange={() => setSortOption(option.value)}
                        className="h-4 w-4 text-rose-400 focus:ring-rose-300"
                      />
                      <span className="ml-2 text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedProducts.map(product => (
                <article 
                  key={product.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div 
                    className="p-3 cursor-pointer"
                    onClick={() => handleProductClick(product)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleProductClick(product)}
                    aria-label={`View details for ${product.name}`}
                  >
                    <div className="relative h-40 bg-gray-100 flex items-center justify-center mb-3 rounded">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 bg-blue-100 text-rose-600 text-xs px-2 py-1 rounded">
                        {product.category}
                      </div>
                      {product.prescriptionRequired && (
                        <div className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                          Rx
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                      {product.bestseller && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-1 py-0.5 rounded whitespace-nowrap">
                          Bestseller
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mb-1">
                      <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < (product.rating || 4) ? '★' : '☆'}</span>
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-500">({product.reviews?.length || 12})</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{product.subcategory}</p>
                  </div>
                  <div className="flex justify-between items-center p-3 border-t">
                    <span className="text-sm font-bold text-rose-400">₹{product.price.toFixed(2)}</span>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="px-2 py-1 rounded-md text-xs font-medium bg-rose-400 text-white hover:bg-rose-500 transition-colors"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
            
            {/* Empty state */}
            {displayedProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          similarProducts={getSimilarProducts(selectedProduct)}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onSimilarProductClick={handleSimilarProductClick}
        />
      )}
    </div>
  );
};

export default PharmaceuticalProductsPage;