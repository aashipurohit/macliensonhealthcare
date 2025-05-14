import React from 'react';
import { Link } from 'react-router-dom';
import { TbBrandMeta } from 'react-icons/tb';
import {IoLogoInstagram} from 'react-icons/io';
import {RiTwitterXLine} from 'react-icons/ri';
import {FiPhoneCall} from 'react-icons/fi';

const Footer = () => {
  return <footer className="bg-rose-100 border-t py-12">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        {/* Newsletter */}
        <div className="md:mr-8">
            <h3 className="text-lg text-gray-800 mb-4">NewsLetter</h3>
            <p className="text-gray-500 mb-4">
                Be the first to hear about New Products, 
                exclusive events and online offers.
            </p>

            <p className="font-medium text-sm text-gray-600 mb-6">
                Sign Up and get 10% off on your first order.
            </p>

            {/* NewsLetter form */}
            <form className="flex">
                <input type="email" 
                placeholder="Enter your email"
                 className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md
                 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all required" />
            <button type="submit"
             className="bg-rose-400 text-black px-6 py-3 text-sm rounded-r-md
              hover:bg-gray-800 hover:text-white transition-all">
                Subscribe
                </button>
            </form>
        </div>

        {/* Shop Links */}
        <div className="md:pl-14">
          <h3 className="text-lg text-gray-800 mb-4 pl-5">Shop</h3>
          <ul className="space-y-2 text-gray-600 list-disc pl-5">
            {["Women Care", "Sports Nutrition", "Kids Nutrition"].map((item) => (
              <li key={item}>
                <Link 
                  to="#"
                  className="relative pb-1 hover:text-gray-600 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gray-600 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div className="md:pl-14">
            <h3 className="text-lg text-gray-800 mb-4 pl-5">Support</h3>
            <ul className="space-y-2 text-gray-600 list-disc pl-5">
                {["Contact Us", "Terms and Conditions", "Shipping and Delivery", "Privacy Policy", "How to Order"].map((item) => (
                    <li key={item}>
                        <Link 
                            to="#" 
                            className="relative pb-1 hover:text-gray-600 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gray-600 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            {item}
                        </Link>  
                    </li>
                ))}
            </ul>
        </div>

        {/* Follow Us */}
        <div className="md:pl-14">
            <h3 className="text-lg text-gray-800 mb-4">
             Follow Us
            </h3>
            <div className="flex items-center space-x-4 mb-6">
                <a href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500"
                aria-label="Visit Facebook"
                >
                    <TbBrandMeta className="h-5 w-5"/>
                </a>

                <a href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500"
                aria-label="Visit Instagram"
                >
                    <IoLogoInstagram className="h-5 w-5"/>
                </a>

                <a href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500"
                aria-label="Visit twitter"
                >
                    <RiTwitterXLine className="h-4 w-4"/>
                </a>
            </div>
            <p className="text-gray-500">Call Us</p>
            <p>
                <FiPhoneCall className="inline-block mr-2"/>
                +91 8770751559
            </p>
        </div>
    </div>

    {/* Footer Bottom */}
    <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
        © 2025,Maclienson, All Rights Reserved.
        </p>
    </div>
  </footer>
}

export default Footer;