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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'
      }`}>
        <nav className="container mx-auto px-6 lg:px-12 flex items-center justify-between text-primary-950">
          
          {/* Left - Logo & Legal Info */}
          <div className="flex flex-col items-center transition-all duration-500 w-[25%] min-w-[220px]">
            <Link to="/" className="flex-shrink-0 mb-1 -ml-4">
              <img src={assets.logo_maclienson_br} alt="Maclienson Logo" className={`w-auto object-contain transition-all duration-500 ${isScrolled ? 'h-8 lg:h-10' : 'h-12 md:h-14 lg:h-[4.5rem]'}`} />
            </Link>
            
            <div className={`flex flex-col items-center text-center leading-[1.3] transition-all duration-500 overflow-hidden ${isScrolled ? 'h-0 opacity-0 mt-0' : 'h-auto opacity-100 mt-2'}`}>
              <div className="text-[6.5px] md:text-[7.5px] uppercase tracking-[0.25em] font-bold text-primary-900 flex flex-col mb-1.5">
                <span>A DIVISION OF MACLIENSON</span>
                <span>LIFE SCIENCES INC.</span>
              </div>
              <div className="flex flex-col items-center text-[5.5px] md:text-[6px] uppercase tracking-[0.15em] font-semibold text-primary-700/80">
                <span>REGISTERED OFFICE: 30N GOULD STREET,</span>
                <span>SHERIDAN, WYOMING- 82801, USA</span>
              </div>
            </div>
          </div>

          {/* Center - Navigation Links */}
        <div className="hidden lg:flex flex-1 justify-center items-center space-x-6 xl:space-x-10 px-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className="text-[10px] xl:text-xs font-bold tracking-[0.15em] uppercase text-primary-900 transition-colors hover:text-gold-400 whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right - Icons */}
        <div className="flex items-center space-x-5 lg:space-x-6 w-[25%] min-w-[180px] justify-end">
          {user?.role === 'admin' && (
            <Link to="/admin" className="hidden lg:block rounded-full bg-primary-800 px-6 py-2.5 text-[10px] xl:text-xs font-bold tracking-widest uppercase text-champagne-50 hover:bg-primary-900 transition-colors shadow-sm">Admin</Link>
          )}
          {user ? (
            <Link to="/profile" className="text-primary-900 hover:text-gold-400 transition-colors"><HiOutlineUser className="h-6 w-6" /></Link>
          ) : (
            <Link to="/login" className="hidden lg:block rounded-full bg-primary-800 px-6 py-2.5 text-[10px] xl:text-xs font-bold tracking-widest uppercase text-champagne-50 hover:bg-primary-900 transition-colors shadow-sm">Login</Link>
          )}
          <button onClick={toggleCartDrawer} className="relative text-primary-900 hover:text-gold-400 transition-colors">
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
          <button onClick={toggleNavDrawer} className="lg:hidden text-primary-900 hover:text-gold-400 transition-colors"><HiBars3BottomRight className="h-7 w-7" /></button>
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