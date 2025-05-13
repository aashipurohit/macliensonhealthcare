import React from 'react';
import {Link} from "react-router-dom";
import { assets } from '../../assets/assets'; 
import {HiOutlineUser ,HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from '../Common/SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import  { useState } from 'react';
import { IoMdClose } from "react-icons/io";






const Navbar = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [navDrawerOpen, setNavDrawer] = useState(false);



    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);

        
    };
    const toggleNavDrawer = () => {
      setNavDrawer(!navDrawerOpen);
    };
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/*Left-Logo */}
        <div className="pl-4 md:pl-6 lg:pl-8">
          <Link to="/" className= "text-2xl font-medium" >
          <img
  src={assets.logo_maclienson_br}
  alt="Maclienson Logo"
  className="h-20 w-auto"
/>

          </Link>
        </div>
        {/* Center -Navigation Links*/}
        <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-black text-base font-bold uppercase">
            HOME 
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-black text-base font-bold uppercase">
            ABOUT US
            </Link>
            <Link to="/collections/all" className="text-gray-700 hover:text-black text-base font-bold uppercase">
            PRODUCTS
            </Link>
            <Link to="certifications" className="text-gray-700 hover:text-black text-base font-bold uppercase">
            CERTIFICATIONS
            </Link>
            <Link to="/career" className="text-gray-700 hover:text-black text-base font-bold uppercase">
            CAREER
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-black text-base font-bold uppercase">
            CONTACT US
            </Link>
            
        </div>

{/*Right - Icons */}

<div className="flex items-center space-x-4">
  {/* Add this login link */}
  <Link 
  to="/admin" 
  className="hidden md:block bg-rose-400 text-black px-4 py-2  rounded-md text-base font-medium hover:bg-gray-800  hover:text-white transition">
    Admin
    </Link>
  <Link 
            to="/login" 
            className="hidden md:block bg-rose-400 text-black px-4 py-2  rounded-md text-base font-medium hover:bg-gray-800 hover:text-white transition"
          >
            Login
          </Link>
  <Link to="/profile" className="hover:text-black">
  <HiOutlineUser className="h-6 w-6 text-gray-700" />
  </Link>
  <button
   onClick={toggleCartDrawer} className="relative hover:text-black">
    <HiOutlineShoppingBag className="h-6 w-6 text-gray-700"  />
    <span className="absolute -top-1  bg-cyan-950 text-white text-xs rounded-full px-2 py-0.5">
    4
  </span>
  </button>
{/*Search*/}
<div className="overflow-hidden">
<SearchBar/>
</div>

<button 
onClick={toggleNavDrawer} 
className="md:hidden"
aria-label={navDrawerOpen ? "Close navigation menu" : "Open navigation menu"}
  aria-expanded={navDrawerOpen}
  aria-controls="mobile-menu">
  <HiBars3BottomRight className="h-6 w-6 text-gray-700" aria-hidden="true" />
</button>
</div>

      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer}/>

      {/* Mobile Navigation */}
      <div
      id= "mobile-menu"
       className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        navDrawerOpen ? "translate-x-0 " : "-translate-x-full"}`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleNavDrawer}>
            <IoMdClose className = "h-6 w-6 text-gray-600"/>
            </button>
          </div>
<div className="p-4">
  <h2 className="text-xl font-semisolid mb-4">Menu</h2>
  <nav className="space-y-4 ">
    <Link to="/" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
    HOME
    </Link>

    <Link to="/about" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
  ABOUT US
    </Link>

    <Link to="/collections/all" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
   PRODUCTS
    </Link>

    <Link to="/certifications" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
    CERTIFICATIONS
    </Link>

    <Link to="/career" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
    CAREER
    </Link>

    <Link to="/contact" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
    CONTACT US
    </Link>

    {/* Show these only in mobile drawer */}
    <Link to="/admin" onClick={toggleNavDrawer} className="block bg-black text-white px-2 py-1 rounded text-sm font-medium hover:bg-gray-800">
      Admin
    </Link>
    <Link to="/login" onClick={toggleNavDrawer} className="block bg-black text-white px-2 py-1 rounded text-sm font-medium hover:bg-gray-800">
      Login
    </Link>

    
  </nav>

</div>

      </div>
    </>
  );
};

export default Navbar
