import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { assets } from '../../assets/assets'; 
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from '../Common/SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
   
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleNavDrawer = () => setNavDrawer(!navDrawerOpen);

  // Define your paths explicitly here so they don't break
  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'PRODUCTS', path: '/collections/all' },
    { name: 'CERTIFICATIONS', path: '/certifications' },
    { name: 'CAREER', path: '/career' },
    { name: 'CONTACT US', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? 'pt-6 px-4' : 'pt-0 px-0 bg-[#faf9f8]'
      }`}>
        <nav className={`mx-auto flex items-center justify-between text-primary-950 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'max-w-6xl bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full px-8 py-3 border border-white/40' 
            : 'container px-4 py-4 bg-transparent'
        }`}>
          
          {/* Left - Logo & Legal Info */}
          <div className={`flex flex-col justify-center transition-all duration-500 ${isScrolled ? 'items-start min-w-[150px]' : 'items-center min-w-[280px]'}`}>
            <Link to="/" className="flex-shrink-0">
              <img src={assets.logo_maclienson_br} alt="Maclienson Logo" className={`w-auto object-contain transition-all duration-500 ${isScrolled ? 'h-10' : 'h-20'}`} />
            </Link>
            
            <div className={`flex flex-col items-center text-center leading-tight transition-all duration-500 overflow-hidden ${isScrolled ? 'h-0 opacity-0 mt-0' : 'h-auto opacity-100 mt-2'}`}>
              <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary-900 leading-tight">
                <span>A DIVISION OF MACLIENSON </span>
                <br />
                <span>LIFE SCIENCES INC.</span>
              </div>

              <div className="mt-1 flex flex-col items-center text-[8px] font-semibold text-primary-700/90 leading-tight text-center">
                <span>REGISTERED OFFICE:</span>
                <span>30N GOULD STREET,</span>
                <span>SHERIDAN, WYOMING- 82801, USA</span>
              </div>
            </div>
          </div>

          {/* Center - Navigation Links */}
        <div className="hidden md:flex space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className="text-sm font-semibold tracking-widest uppercase text-primary-800 transition-colors hover:text-gold-400 whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right - Icons */}
        <div className="flex items-center space-x-4 lg:space-x-5">
          {user?.role === 'admin' && (
            <Link to="/admin" className="hidden lg:block rounded-full bg-primary-800 px-5 py-2 text-sm font-medium text-champagne-50 hover:bg-primary-900">Admin</Link>
          )}
          {user ? (
            <Link to="/profile" className="text-primary-800"><HiOutlineUser className="h-6 w-6" /></Link>
          ) : (
            <Link to="/login" className="hidden lg:block rounded-full bg-primary-800 px-5 py-2 text-sm font-medium text-champagne-50">Login</Link>
          )}
          <button onClick={toggleCartDrawer} className="relative text-primary-800 hover:text-gold-400 transition-colors">
            <HiOutlineShoppingBag className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-400 text-[10px] font-bold text-primary-950 shadow-sm">
                {cartItemCount}
              </span>
            )}
          </button>
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <button onClick={toggleNavDrawer} className="md:hidden text-primary-800 hover:text-gold-400"><HiBars3BottomRight className="h-7 w-7" /></button>
        </div>
        </nav>
      </header>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Nav */}
      <div className={`fixed top-0 left-0 z-50 h-full w-3/4 border-r border-gold-200 bg-champagne-50 shadow-regal transform transition-all duration-300 ease-in-out ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}><IoMdClose className="h-7 w-7 text-primary-800" /></button>
        </div>
        <div className="p-6">
          <nav className="space-y-6">
            {navLinks.map((link) => (
                <Link key={link.name} to={link.path} onClick={toggleNavDrawer} className="block text-base font-bold tracking-wider text-primary-800">
                    {link.name}
                </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;