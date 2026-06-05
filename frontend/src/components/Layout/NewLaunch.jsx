import React, { useState } from 'react';
import { FaVial, FaLeaf, FaTint, FaHeartbeat, FaChild } from 'react-icons/fa';
import { assets } from '../../assets/assets'; // Adjust path if needed

const ProductDescription = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="space-y-3 text-base text-gray-700  md:text-lg">
      <p>
        Macnurish is designed to support women's daily nourishment and wellness.
        Rich in essential nutrients and formulated to promote balanced health.
      </p>

      {!showMore ? (
        <button
          onClick={() => setShowMore(true)}
          className="font-medium text-primary-600 hover:underline focus:outline-none "
        >
          Read more...
        </button>
      ) : (
        <>
          {/* Detailed Highlights */}
          <div className="mt-3 space-y-3">
            <div className="flex items-start gap-3">
              <FaHeartbeat className="text-primary-600 mt-1" />
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
            className="mt-2 font-medium text-primary-600 hover:underline focus:outline-none "
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
      className="flex w-full items-center bg-gray-50 px-4 py-10  sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full space-y-10">
        {/* Main Heading */}
        <div className="text-center">
          <h2
            id="new-product-heading"
            className="text-4xl font-bold text-gray-900 "
          >
            New Launch
          </h2>
          <p className="mt-2 text-lg text-gray-600 ">
            Discover our latest addition - crafted especially for women's well-being and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Product Image */}
          <div className="h-[300px] w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm   sm:h-[400px] md:h-[500px]">
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
            <span className="inline-block rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700   ">
              Women
            </span>

            {/* Title */}
            <h3 className="text-3xl font-bold text-gray-900  md:text-4xl">
              Macnurish
            </h3>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900 ">
              ₹69
            </div>
            <div className="text-2xl font-semibold text-gray-700 "> /sachet </div>

            {/* Enhanced Description */}
            <ProductDescription />

            {/* CTA Button */}
            <button
              type="button"
              className="mt-6 rounded-md border border-transparent bg-primary-600 px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 hover:bg-primary-700   "
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


