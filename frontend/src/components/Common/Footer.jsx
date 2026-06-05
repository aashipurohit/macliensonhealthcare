import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhoneCall } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="border-t border-gold-200 bg-champagne-50 py-12">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-4 lg:px-0">
        <div className="md:mr-8">
          <h3 className="mb-4 text-2xl font-serif font-semibold text-royal-950">NewsLetter</h3>
          <p className="mb-4 text-royal-800">
            Be the first to hear about New Products, exclusive events and online offers.
          </p>

          <p className="mb-6 text-sm font-medium text-royal-700">
            Sign Up and get 10% off on your first order.
          </p>

          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-l-full border border-r-0 border-gold-200 bg-white/80 p-3 text-sm text-royal-950 transition-all placeholder:text-royal-700/50 focus:outline-none focus:ring-2 focus:ring-royal-800"
            />
            <button
              type="submit"
              className="rounded-r-full bg-royal-800 px-6 py-3 text-sm text-champagne-50 transition-all hover:bg-royal-900"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="md:pl-14">
          <h3 className="mb-4 text-2xl font-serif font-semibold text-royal-950">Shop</h3>
          {/* Removed basic list-disc bullets for a cleaner, editorial look */}
          <ul className="space-y-3 text-royal-800">
            <li>
              <Link
                to="/digitaldispensary#womencare"
                className="relative pb-1 transition-colors duration-300 hover:text-gold-400 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold-400 after:content-[''] after:transition-all after:duration-300 hover:after:w-full"
              >
                Women Care
              </Link>
            </li>
            <li>
              <Link
                to="/digitaldispensary#sportsnutrition"
                className="relative pb-1 transition-colors duration-300 hover:text-gold-400 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold-400 after:content-[''] after:transition-all after:duration-300 hover:after:w-full"
              >
                Sports Nutrition
              </Link>
            </li>
            <li>
              <Link
                to="/digitaldispensary#kidsnutrition"
                className="relative pb-1 transition-colors duration-300 hover:text-gold-400 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold-400 after:content-[''] after:transition-all after:duration-300 hover:after:w-full"
              >
                Kids Nutrition
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:pl-14">
          <h3 className="mb-4 text-2xl font-serif font-semibold text-royal-950">Support</h3>
          <ul className="space-y-3 text-royal-800">
            <li>
              <Link
                to="/contact"
                className="relative pb-1 transition-colors duration-300 hover:text-gold-400 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold-400 after:content-[''] after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/policies#terms"
                className="relative pb-1 transition-colors duration-300 hover:text-gold-400 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold-400 after:content-[''] after:transition-all after:duration-300 hover:after:w-full"
              >
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/policies#shipping"
                className="relative pb-1 transition-colors duration-300 hover:text-gold-400 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold-400 after:content-[''] after:transition-all after:duration-300 hover:after:w-full"
              >
                Shipping and Delivery
              </Link>
            </li>
            <li>
              <Link
                to="/policies#privacy"
                className="relative pb-1 transition-colors duration-300 hover:text-gold-400 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold-400 after:content-[''] after:transition-all after:duration-300 hover:after:w-full"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/policies#howtoorder"
                className="relative pb-1 transition-colors duration-300 hover:text-gold-400 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold-400 after:content-[''] after:transition-all after:duration-300 hover:after:w-full"
              >
                How to Order
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:pl-14">
          <h3 className="mb-4 text-2xl font-serif font-semibold text-royal-950">Follow Us</h3>

          <div className="mb-6 flex items-center space-x-4"></div>

          <p className="text-royal-800 mb-2">Call Us</p>
          <p className="text-royal-950 font-medium">
            {/* Added gold accent to the phone icon */}
            <FiPhoneCall className="mr-2 inline-block text-gold-400" />
            +91 8770751559
          </p>
        </div>
      </div>

      <div className="container mx-auto mt-12 border-t border-gold-200 px-4 pt-6 lg:px-0">
        <p className="text-center text-sm tracking-wide text-royal-700">
          (c) 2025, Maclienson, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;