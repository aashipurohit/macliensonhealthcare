import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    subcategory: 'all'
  });

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    type: true,
    subcategory: true
  });

  const filterOptions = {
    categories: [
      { value: 'all', label: 'All Categories' },
      { value: 'Women', label: "Women's Health" },
      { value: 'Unisex', label: 'Unisex Products' }
    ],
    types: [
      { value: 'all', label: 'All Types' },
      { value: 'Nutritional Supplement', label: 'Nutritional Supplements' },
      { value: 'Herbal Supplement', label: 'Herbal Supplements' },
      { value: 'Analgesic', label: 'Analgesics' }
    ],
    subcategories: {
      'Women': [
        { value: 'all', label: 'All Women\'s Products' },
        { value: 'Nutritional Supplement', label: 'Nutritional Supplements' },
        { value: 'Herbal Supplement', label: 'Herbal Supplements' }
      ],
      'default': [
        { value: 'all', label: 'All Subcategories' }
      ]
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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

  const getCurrentSubcategories = () => {
    return filterOptions.subcategories[filters.category] || 
           filterOptions.subcategories['default'];
  };

  return (
    <div className="w-72 h-full overflow-y-auto p-6 bg-white border-r border-gray-300 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800">Filter Products</h2>
        <button 
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* Filter Group Component */}
      {[
        { name: 'category', title: 'Category', options: filterOptions.categories },
        { name: 'type', title: 'Product Type', options: filterOptions.types }
      ].map(({ name, title, options }) => (
        <div key={name} className="mb-6">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection(name)}
          >
            <h4 className="text-md font-medium text-gray-700">{title}</h4>
            {expandedSections[name] ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
          </div>

          {expandedSections[name] && (
            <div className="space-y-3 mt-4 pl-1">
              {options.map(({ value, label }) => (
                <label key={value} className="flex items-center gap-3 text-sm text-gray-800">
                  <input
                    type="radio"
                    name={name}
                    checked={filters[name] === value}
                    onChange={() => handleFilterChange(name, value)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  {label}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Subcategory Section (Only if category is selected) */}
      {filters.category !== 'all' && (
        <div className="mb-6">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('subcategory')}
          >
            <h4 className="text-md font-medium text-gray-700">Subcategory</h4>
            {expandedSections.subcategory ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
          </div>

          {expandedSections.subcategory && (
            <div className="space-y-3 mt-4 pl-1">
              {getCurrentSubcategories().map(({ value, label }) => (
                <label key={value} className="flex items-center gap-3 text-sm text-gray-800">
                  <input
                    type="radio"
                    name="subcategory"
                    checked={filters.subcategory === value}
                    onChange={() => handleFilterChange('subcategory', value)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  {label}
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSidebar
