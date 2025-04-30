import React from 'react';
import { FaSortAmountDown, FaSortAmountDownAlt } from 'react-icons/fa';

const SortOptions = ({ onSortChange, currentSort }) => {
  const sortOptions = [
    {
      value: 'default',
      label: 'Default Sorting',
      icon: null
    },
    {
      value: 'price-asc',
      label: 'Price: Low to High',
      icon: <FaSortAmountDownAlt className="ml-1" />
    },
    {
      value: 'price-desc',
      label: 'Price: High to Low',
      icon: <FaSortAmountDown className="ml-1" />
    },
    {
      value: 'name-asc',
      label: 'Name: A to Z',
      icon: <FaSortAmountDownAlt className="ml-1" />
    },
    {
      value: 'name-desc',
      label: 'Name: Z to A',
      icon: <FaSortAmountDown className="ml-1" />
    },
    {
      value: 'date-newest',
      label: 'Newest First',
      icon: <FaSortAmountDown className="ml-1" />
    },
    {
      value: 'date-oldest',
      label: 'Oldest First',
      icon: <FaSortAmountDownAlt className="ml-1" />
    }
  ];

  const handleSortChange = (e) => {
    const value = e.target.value;
    onSortChange(value);
  };

  return (
    <div className="relative">
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      >
        {sortOptions.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="flex items-center"
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SortOptions;