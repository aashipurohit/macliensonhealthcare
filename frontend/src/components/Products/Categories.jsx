import React from "react";
import { Link } from "react-router-dom";

const AboutMaclienson = () => {
  return (
    <section className="bg-white py-32 lg:py-48 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl text-center">
        
        <h4 className="text-xs font-bold tracking-[0.25em] text-primary-600 mb-10 uppercase font-sans">
          Brand Philosophy
        </h4>
        
        <h2 className="mb-12 text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-primary-950 leading-[1.2]">
          "We deliver innovative pharmaceutical solutions with an unwavering commitment to quality and efficacy."
        </h2>
        
        <div className="space-y-8 text-lg lg:text-xl font-sans leading-relaxed text-primary-900/70 max-w-2xl mx-auto">
          <p>
            Maclienson Healthcare Pvt. Ltd. provides international standard medicines at accessible prices, ensuring premium healthcare is available to all patients. 
          </p>
          <p>
            Our dedication to clinical research, integrity, and patient well-being drives us to create meaningful health outcomes for communities worldwide.
          </p>
        </div>

        <div className="mt-16">
          <Link
            to="/about"
            className="inline-flex items-center text-xs font-bold text-primary-950 hover:text-gold-400 uppercase tracking-[0.2em] transition-colors group"
          >
            Learn about our scientific approach
            <svg className="ml-4 w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default AboutMaclienson;
