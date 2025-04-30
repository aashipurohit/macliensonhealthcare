import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    subcategory: 'all'
  });

  const filterOptions = {
    categories: ['all', 'Unisex', 'Women'],
    types: ['all', 'Supplement', 'Analgesic', 'Protein Supplement', 
            'Gastrointestinal', 'Laxative', 'Vitamin Supplement', 
            'Multivitamin', 'Antihistamine', 'Disinfectant'],
    subcategories: ['all', 'Analgesic', 'Supplement', 'Protein Supplement']
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: value,
      ...(filterType === 'category' && { subcategory: 'all' })
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const resetFilters = {
      category: 'all',
      type: 'all',
      subcategory: 'all'
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="h-full overflow-y-auto p-4 bg-white">
      {/* Header with clear button */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <h3 className="text-lg font-bold text-gray-800">Filters</h3>
        <button 
          onClick={clearAllFilters}
          className="flex items-center justify-center p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
          title="Clear all filters"
        >
          <FaTimes className="text-xs" />
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3 text-sm">Category</h4>
        <div className="space-y-2 pl-1">
          {filterOptions.categories.map(category => (
            <div key={category} className="flex items-center gap-3">
              <input
                type="radio"
                id={`category-${category}`}
                name="category"
                checked={filters.category === category}
                onChange={() => handleFilterChange('category', category)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label 
                htmlFor={`category-${category}`}
                className="text-sm text-gray-700 capitalize"
              >
                {category === 'all' ? 'All Categories' : category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3 text-sm">Type</h4>
        <div className="space-y-2 pl-1">
          {filterOptions.types.map(type => (
            <div key={type} className="flex items-center gap-3">
              <input
                type="radio"
                id={`type-${type}`}
                name="type"
                checked={filters.type === type}
                onChange={() => handleFilterChange('type', type)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label 
                htmlFor={`type-${type}`}
                className="text-sm text-gray-700 capitalize"
              >
                {type === 'all' ? 'All Types' : type}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal divider */}
      <div className="border-t border-gray-200 my-4"></div>
    </div>
  );
};

export default FilterSidebar;

