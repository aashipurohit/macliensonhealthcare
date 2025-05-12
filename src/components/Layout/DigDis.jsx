import React from 'react';
import { assets } from '../../assets/assets';

const DigDis = () => {
  const categories = [
    {
      title: 'Women Care',
      icon: '🌸',
      description: 'Specialized supplements for hormonal balance, prenatal care, and women-specific health needs',
      image: assets.digdis_w, 
      features: [
        'Prenatal vitamins',
        'Hormonal support',
        'Bone health formulas',
        'Menopause management'
      ]
    },
    {
      title: 'Sports Nutrition',
      icon: '🏋️',
      description: 'Performance-enhancing supplements for athletes and fitness enthusiasts',
      image: assets.digdis_2,
      features: [
        'Protein supplements',
        'Pre-workout formulas',
        'Recovery blends',
        'Electrolyte replacements'
      ]
    },
    {
      title: 'Kids Nutrition',
      icon: '🧒',
      description: 'Essential vitamins and growth supplements for children of all ages',
      image: assets.digdis_3, 
      features: [
        'Multivitamin gummies',
        'Immune boosters',
        'DHA supplements',
        'Growth support formulas'
      ]
    }
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Digital Dispensary</h2>
          <p className="text-lg text-rose-700cbse  max-w-2xl mx-auto">
            Premium quality supplements tailored to your specific health needs
          </p>
        </div>

        {/* Category Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {categories.map((category, index) => (
    <div 
      key={index}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      {/* Image Section */}
      <div className="h-48 overflow-hidden">
        <img 
          src={category.image} 
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content Section - flex-grow makes this expand */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center mb-3">
          <span className="text-2xl mr-3">{category.icon}</span>
          <h3 className="text-xl font-bold text-gray-800">{category.title}</h3>
        </div>
        
        <p className="text-gray-600 mb-4">{category.description}</p>
        
        <ul className="space-y-2 mb-6">
          {category.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Button container with mt-auto pushes it to bottom */}
        <div className="mt-auto">
          <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded-lg transition-colors duration-300">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Quality Promise</h3>
              <p className="text-gray-700 mb-4">
                All supplements are third-party tested, GMP certified, and formulated by healthcare professionals.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="bg-blue-100 text-rose-700 p-1 rounded-full mr-2">✔</span>
                  Pharmaceutical-grade ingredients
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 text-rose-700 p-1 rounded-full mr-2">✔</span>
                  No artificial additives
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 text-rose-700 p-1 rounded-full mr-2">✔</span>
                  Scientifically validated formulations
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <img 
                src={assets.quality_standard} // Add this image to assets
                alt="Quality Standards"
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigDis;