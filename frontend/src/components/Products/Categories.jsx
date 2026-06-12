import React from "react";
import { Link } from "react-router-dom";

const AboutMaclienson = () => {
  return (
    <section className="bg-champagne-50 py-24 px-4 lg:px-0">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="mb-8 text-4xl md:text-5xl font-serif font-medium text-gray-900 leading-tight">
          Maclienson Healthcare Pvt. Ltd.
        </h2>
        
        <div className="space-y-6 text-lg md:text-xl font-sans leading-relaxed text-gray-900/80">
          <p>
            We deliver innovative pharmaceutical solutions with an unwavering commitment to quality and efficacy.
          </p>
          <p>
            We provide international standard medicines at accessible prices, ensuring premium healthcare is available to all patients.
          </p>
          <p>
            Our dedication to clinical research, integrity, and patient well-being drives us to create meaningful health outcomes for communities worldwide.
          </p>
        </div>

        <div className="mt-12">
          <Link
            to="/about"
            className="inline-block border-b-2 border-primary-700 pb-1 text-lg font-medium text-primary-800 transition hover:text-primary-600 hover:border-primary-500"
          >
            Learn about our scientific approach
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutMaclienson;
