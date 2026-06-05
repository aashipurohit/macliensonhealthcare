import Navbar from "../Common/Navbar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gold-200 bg-champagne-50/85 backdrop-blur-xl transition-all duration-300">
      {/* Topbar (Commented out as in original) */}
      {/* <Topbar /> */}
      
      {/* navbar */}
      <Navbar />
      
      {/* Cart Drawer */}
    </header>
  );
};

export default Header;