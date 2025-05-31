// import React, { useState } from 'react';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// const FilterSidebar = ({ onFilterChange }) => {
//   const [filters, setFilters] = useState({
//     category: 'all',
//     type: 'all',
//     subcategory: 'all'
//   });

//   const [expandedSections, setExpandedSections] = useState({
//     category: true,
//     type: true,
//     subcategory: true
//   });

//   const filterOptions = {
//     categories: [
//       { value: 'all', label: 'All Categories' },
//       { value: 'Women', label: "Women's Health" },
//       { value: 'Unisex', label: 'Unisex Products' }
//     ],
//     types: [
//       { value: 'all', label: 'All Types' },
//       { value: 'Nutritional Supplement', label: 'Nutritional Supplements' },
//       { value: 'Herbal Supplement', label: 'Herbal Supplements' },
//       { value: 'Analgesic', label: 'Analgesics' }
//     ],
//     subcategories: {
//       'Women': [
//         { value: 'all', label: 'All Women\'s Products' },
//         { value: 'Nutritional Supplement', label: 'Nutritional Supplements' },
//         { value: 'Herbal Supplement', label: 'Herbal Supplements' }
//       ],
//       'default': [
//         { value: 'all', label: 'All Subcategories' }
//       ]
//     }
//   };

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const handleFilterChange = (filterType, value) => {
//     const newFilters = {
//       ...filters,
//       [filterType]: value,
//       ...(filterType === 'category' && { subcategory: 'all' })
//     };
//     setFilters(newFilters);
//     onFilterChange(newFilters);
//   };

//   const clearAllFilters = () => {
//     const resetFilters = {
//       category: 'all',
//       type: 'all',
//       subcategory: 'all'
//     };
//     setFilters(resetFilters);
//     onFilterChange(resetFilters);
//   };

//   const getCurrentSubcategories = () => {
//     return filterOptions.subcategories[filters.category] || 
//            filterOptions.subcategories['default'];
//   };

//   return (
//     <div className="w-80 h-full p-6 bg-white border-r border-gray-200 shadow-lg sticky top-0 z-10">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
//         <h2 className="text-xl font-semibold text-gray-800">Filter Products</h2>
//         <button 
//           onClick={clearAllFilters}
//           className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
//         >
//           Clear all
//         </button>
//       </div>

//       {/* Filter Group Component */}
//       {[
//         { name: 'category', title: 'Category', options: filterOptions.categories },
//         { name: 'type', title: 'Product Type', options: filterOptions.types }
//       ].map(({ name, title, options }) => (
//         <div key={name} className="mb-6">
//           <div 
//             className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
//             onClick={() => toggleSection(name)}
//           >
//             <h4 className="text-md font-medium text-gray-700">{title}</h4>
//             {expandedSections[name] ? (
//               <FaChevronUp size={14} className="text-gray-500" />
//             ) : (
//               <FaChevronDown size={14} className="text-gray-500" />
//             )}
//           </div>

//           {expandedSections[name] && (
//             <div className="space-y-3 mt-4 pl-2">
//               {options.map(({ value, label }) => (
//                 <label key={value} className="flex items-center gap-3 text-sm text-gray-800 hover:bg-gray-50 p-2 rounded cursor-pointer">
//                   <input
//                     type="radio"
//                     name={name}
//                     checked={filters[name] === value}
//                     onChange={() => handleFilterChange(name, value)}
//                     className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                   />
//                   <span>{label}</span>
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}

//       {/* Subcategory Section (Only if category is selected) */}
//       {filters.category !== 'all' && (
//         <div className="mb-6">
//           <div 
//             className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
//             onClick={() => toggleSection('subcategory')}
//           >
//             <h4 className="text-md font-medium text-gray-700">Subcategory</h4>
//             {expandedSections.subcategory ? (
//               <FaChevronUp size={14} className="text-gray-500" />
//             ) : (
//               <FaChevronDown size={14} className="text-gray-500" />
//             )}
//           </div>

//           {expandedSections.subcategory && (
//             <div className="space-y-3 mt-4 pl-2">
//               {getCurrentSubcategories().map(({ value, label }) => (
//                 <label key={value} className="flex items-center gap-3 text-sm text-gray-800 hover:bg-gray-50 p-2 rounded cursor-pointer">
//                   <input
//                     type="radio"
//                     name="subcategory"
//                     checked={filters.subcategory === value}
//                     onChange={() => handleFilterChange('subcategory', value)}
//                     className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                   />
//                   <span>{label}</span>
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FilterSidebar;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '../../redux/slices/productsSlice';

const FilterSidebar = ({ onClose }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);
  const categories = ['Women', 'Sports Nutrition', 'Kids Nutrition'];
  const subcategories = ['Nutritional Supplement', 'Analgesic', 'Herbal'];

  const handleCategoryChange = (category) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    dispatch(setFilters({ category: newCategories }));
  };

  const handlePrescriptionChange = (requiresPrescription) => {
    dispatch(setFilters({ prescriptionRequired: requiresPrescription }));
  };

  return (
    <div className="space-y-6">
      {/* Categories filter */}
      <div>
        <h3 className="text-lg font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 text-rose-400 rounded focus:ring-rose-300"
              />
              <span className="ml-2 text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Subcategories filter */}
      <div>
        <h3 className="text-lg font-medium mb-2">Subcategories</h3>
        <div className="space-y-2">
          {subcategories.map((subcategory) => (
            <label key={subcategory} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.subcategory.includes(subcategory)}
                onChange={() => handleSubcategoryChange(subcategory)}
                className="h-4 w-4 text-rose-400 rounded focus:ring-rose-300"
              />
              <span className="ml-2 text-gray-700">{subcategory}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Prescription filter */}
      <div>
        <h3 className="text-lg font-medium mb-2">Prescription</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="prescription"
              checked={filters.prescriptionRequired === null}
              onChange={() => handlePrescriptionChange(null)}
              className="h-4 w-4 text-rose-400 focus:ring-rose-300"
            />
            <span className="ml-2 text-gray-700">All</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="prescription"
              checked={filters.prescriptionRequired === true}
              onChange={() => handlePrescriptionChange(true)}
              className="h-4 w-4 text-rose-400 focus:ring-rose-300"
            />
            <span className="ml-2 text-gray-700">Prescription Required</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="prescription"
              checked={filters.prescriptionRequired === false}
              onChange={() => handlePrescriptionChange(false)}
              className="h-4 w-4 text-rose-400 focus:ring-rose-300"
            />
            <span className="ml-2 text-gray-700">No Prescription Needed</span>
          </label>
        </div>
      </div>

      {/* Price range filter */}
      <div>
        <h3 className="text-lg font-medium mb-2">Price Range</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
              Min
            </label>
            <input
              type="number"
              id="minPrice"
              value={filters.minPrice || ''}
              onChange={(e) => dispatch(setFilters({ minPrice: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-400 focus:ring-rose-400 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
              Max
            </label>
            <input
              type="number"
              id="maxPrice"
              value={filters.maxPrice || ''}
              onChange={(e) => dispatch(setFilters({ maxPrice: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-400 focus:ring-rose-400 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="pt-4">
        <button
          type="button"
          onClick={() => dispatch(clearFilters())}
          className="w-full bg-gray-100 py-2 px-4 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-200"
        >
          Clear all filters
        </button>
      </div>

      {onClose && (
        <div className="pt-4 md:hidden">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-rose-400 py-2 px-4 text-sm font-medium text-white rounded-md hover:bg-rose-500"
          >
            Apply filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;