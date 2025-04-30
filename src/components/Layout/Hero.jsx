
import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-[calc(100vh-80px)]"> {/* Assuming header/navbar is ~80px */}
      <img
        src={assets.main_c}
        alt="Main"
        className="w-full h-full object-cover"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <div className="text-center text-white px-4">
          
          {/* Headline */}
          <h1 className="font-sans text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
  <span className="uppercase">Maclienson Healthcare</span>{" "}
  <span className="normal-case">Pvt. Ltd.</span>
</h1>


          {/* Subtext */}
          <p className="text-sm md:text-base lg:text-lg tracking-tight mb-6 max-w-2xl mx-auto">
            Find the best in pharma, from essential medicines to advanced health solutions, all in one place.
          </p>

          {/* Button */}
          <Link
            to="/products"
            className="bg-white text-gray-900 px-6 py-3 rounded-md text-base font-medium hover:bg-gray-200 transition"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
