import React from 'react';
import { assets } from '../../assets/assets';

const DigDis = () => {
  const categories = [
    {
      title: 'Women Care',
      icon: 'WC',
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
      icon: 'SN',
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
      icon: 'KN',
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
    <section className="bg-gray-50 px-4 py-12 ">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 ">Digital Dispensary</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 ">
            Premium quality supplements tailored to your specific health needs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {categories.map((category, index) => (
            <div
              key={index}
              id={category.title.toLowerCase().replace(/\s+/g, '')}
              className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-sm  "
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="flex flex-grow flex-col p-6">
                <div className="mb-3 flex items-center">
                  <span className="mr-3 rounded-full bg-primary-100 px-2 py-1 text-xs font-semibold tracking-wide text-primary-700  ">
                    {category.icon}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 ">{category.title}</h3>
                </div>

                <p className="mb-4 text-gray-600 ">{category.description}</p>

                <ul className="mb-6 space-y-2">
                  {category.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 text-green-500 ">+</span>
                      <span className="text-gray-700 ">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-lg border border-gray-200 bg-gradient-to-r from-primary-50 to-gray-100 p-8   ">
          <div className="flex flex-col items-center md:flex-row">
            <div className="mb-6 md:mb-0 md:w-1/2 md:pr-8">
              <h3 className="mb-4 text-2xl font-bold text-gray-900 ">Our Quality Promise</h3>
              <p className="mb-4 text-gray-700 ">
                All supplements are third-party tested, GMP certified, and formulated by healthcare professionals.
              </p>
              <ul className="space-y-2 text-gray-700 ">
                <li className="flex items-center">
                  <span className="mr-2 rounded-full bg-primary-100 p-1 text-primary-700  ">+</span>
                  Pharmaceutical-grade ingredients
                </li>
                <li className="flex items-center">
                  <span className="mr-2 rounded-full bg-primary-100 p-1 text-primary-700  ">+</span>
                  No artificial additives
                </li>
                <li className="flex items-center">
                  <span className="mr-2 rounded-full bg-primary-100 p-1 text-primary-700  ">+</span>
                  Scientifically validated formulations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigDis;


