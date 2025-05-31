import React from 'react';

const FilterPanel = ({ 
  filters, 
  categories, 
  subcategories, 
  priceRange, 
  onFilterChange 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Filters</h2>
      
      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() => onFilterChange('category', category)}
                className="h-4 w-4 text-rose-400 rounded focus:ring-rose-300"
              />
              <span className="ml-2 text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Subcategories */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">Subcategories</h3>
        <div className="space-y-2">
          {subcategories.map(subcategory => (
            <label key={subcategory} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.subcategory.includes(subcategory)}
                onChange={() => onFilterChange('subcategory', subcategory)}
                className="h-4 w-4 text-rose-400 rounded focus:ring-rose-300"
              />
              <span className="ml-2 text-gray-700">{subcategory}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Prescription */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">Prescription</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="prescription"
              checked={filters.prescription === 'all'}
              onChange={() => onFilterChange('prescription', 'all')}
              className="h-4 w-4 text-rose-400 focus:ring-rose-300"
            />
            <span className="ml-2 text-gray-700">All Products</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="prescription"
              checked={filters.prescription === 'required'}
              onChange={() => onFilterChange('prescription', 'required')}
              className="h-4 w-4 text-rose-400 focus:ring-rose-300"
            />
            <span className="ml-2 text-gray-700">Prescription Required</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="prescription"
              checked={filters.prescription === 'not-required'}
              onChange={() => onFilterChange('prescription', 'not-required')}
              className="h-4 w-4 text-rose-400 focus:ring-rose-300"
            />
            <span className="ml-2 text-gray-700">No Prescription Needed</span>
          </label>
        </div>
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">Price Range</h3>
        <div className="px-2">
          <input
            type="range"
            min={priceRange[0]}
            max={priceRange[1]}
            value={filters.price[0]}
            onChange={(e) => onFilterChange('price', [parseFloat(e.target.value), filters.price[1]])}
            className="w-full mb-2"
          />
          <input
            type="range"
            min={priceRange[0]}
            max={priceRange[1]}
            value={filters.price[1]}
            onChange={(e) => onFilterChange('price', [filters.price[0], parseFloat(e.target.value)])}
            className="w-full"
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>₹{filters.price[0].toFixed(2)}</span>
          <span>₹{filters.price[1].toFixed(2)}</span>
        </div>
      </div>
      
      {/* In Stock */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => onFilterChange('inStock', e.target.checked)}
            className="h-4 w-4 text-rose-400 rounded focus:ring-rose-300"
          />
          <span className="ml-2 text-gray-700">In Stock Only</span>
        </label>
      </div>
    </div>
  );
};

export default FilterPanel;