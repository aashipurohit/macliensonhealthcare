import React, { useState } from 'react';
import { FaVial, FaLeaf, FaTint, FaHeartbeat, FaChild } from 'react-icons/fa';
import { assets } from '../../assets/assets'; // Adjust path if needed

const ProductDescription = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="text-gray-700 text-base md:text-lg space-y-3">
      <p>
        Macnurish is designed to support women's daily nourishment and wellness.
        Rich in essential nutrients and formulated to promote balanced health.
      </p>

      {!showMore ? (
        <button
          onClick={() => setShowMore(true)}
          className="text-rose-500 font-medium hover:underline focus:outline-none"
        >
          Read more...
        </button>
      ) : (
        <>
          {/* Detailed Highlights */}
          <div className="mt-3 space-y-3">
            <div className="flex items-start gap-3">
              <FaHeartbeat className="text-rose-400 mt-1" />
              <p><strong>L-Arginine</strong>: Enhances blood flow and supports cardiovascular and reproductive health.</p>
            </div>
            <div className="flex items-start gap-3">
              <FaLeaf className="text-green-500 mt-1" />
              <p><strong>Proanthocyanidins</strong>: Powerful antioxidants that protect uterine tissue and overall cell health.</p>
            </div>
            <div className="flex items-start gap-3">
              <FaTint className="text-red-500 mt-1" />
              <p><strong>Lycopene 10%</strong>: Fights oxidative stress and improves immunity during pregnancy.</p>
            </div>
            <div className="flex items-start gap-3">
              <FaVial className="text-indigo-500 mt-1" />
              <p><strong>L-Methyl Folate</strong>: Supports DNA synthesis and fetal neural development, superior to regular folic acid.</p>
            </div>
            <div className="flex items-start gap-3">
              <FaChild className="text-yellow-500 mt-1" />
              <p><strong>Zinc</strong>: Essential for immune strength, cell regeneration, and fetal growth.</p>
            </div>
          </div>

          <button
            onClick={() => setShowMore(false)}
            className="text-rose-500 font-medium hover:underline focus:outline-none mt-2"
          >
            Show less
          </button>
        </>
      )}
    </div>
  );
};

const NewLaunchSection = () => {
  const productImage = assets.macnurish_p;

  return (
    <section
      aria-labelledby="new-product-heading"
      className="w-full bg-rose-100 px-4 sm:px-6 lg:px-8 flex items-center py-10">
      <div className="max-w-7xl mx-auto w-full space-y-10">
        {/* Main Heading */}
        <div className="text-center">
          <h2
            id="new-product-heading"
            className="text-4xl font-bold text-gray-900"
          >
            New Launch
          </h2>
          <p className="mt-2 text-lg text-gray-700">
            Discover our latest addition - crafted especially for women's well-being and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-rose-100 rounded-lg overflow-hidden">
            <img
              src={productImage}
              alt={`Macnurish product display`}
              className="w-full h-full object-contain object-center"
              loading="lazy"
              width={800}
              height={600}
              decoding="async"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            {/* Category */}
            <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-50 text-pink-800 rounded-full">
              Women
            </span>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Macnurish
            </h3>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900">
              ₹500
            </div>

            {/* Enhanced Description */}
            <ProductDescription />

            {/* CTA Button */}
            <button
              type="button"
              className="mt-6 px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
              aria-label={`Add Macnurish to cart`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewLaunchSection;
