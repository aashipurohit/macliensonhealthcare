import React, { useEffect, useState, useRef } from 'react';
import { products as allProducts } from '../assets/assets';
import { FaFilter, FaShoppingCart } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import CartDrawer from "../components/Layout/CartDrawer";

const ProductGrid = ({ products, onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const showProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
    closeProductDetails();
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div onClick={() => showProductDetails(product)} className="cursor-pointer">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-contain mb-3" 
              />
              <h4 className="font-semibold text-gray-800">{product.name}</h4>
              <p className="text-gray-600">₹{product.price}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {product.category}
                </span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {product.subcategory}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <button 
                  onClick={closeProductDetails}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-64 object-contain"
                  />
                </div>
                
                <div className="md:w-1/2">
                  <div className="mb-4">
                    <span className="text-xl font-bold">₹{selectedProduct.price}</span>
                    {selectedProduct.bestseller && (
                      <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        Bestseller
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {selectedProduct.category}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {selectedProduct.subcategory}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
                  
                  <div className="mt-4">
                    <button 
                      onClick={() => handleAddToCart(selectedProduct)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    }, 500);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, {
          productId: product.id,
          name: product.name,
          quantity: 1,
          price: product.price,
          type: product.subcategory,
          brand: product.name,
          image: product.image
        }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  const handleFilterChange = ({ category, type, subcategory }) => {
    let filtered = [...allProducts];
    
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    if (type !== 'all') {
      filtered = filtered.filter(product => product.subcategory === type);
    }
    
    if (subcategory !== 'all') {
      filtered = filtered.filter(product => product.subcategory === subcategory);
    }
    
    applySorting(filtered, sortOption);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    applySorting(filteredProducts, option);
  };

  const applySorting = (productsToSort, option) => {
    let sorted = [...productsToSort];
    
    switch(option) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'date-newest':
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'date-oldest':
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        sorted = [...allProducts].filter(p => 
          productsToSort.some(fp => fp.id === p.id)
        );
    }
    
    setFilteredProducts(sorted);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:hidden flex justify-between items-center p-3 bg-blue-600 text-white mb-4">
        <button onClick={toggleSidebar}>
          <FaFilter className="mr-2" />
          {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
        <button 
          onClick={toggleCart}
          className="relative p-2"
        >
          <FaShoppingCart size={20} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      <div 
        ref={sidebarRef} 
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          fixed lg:relative inset-y-0 z-40 left-0 w-72 bg-white shadow-lg lg:shadow-none 
          overflow-y-auto transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:w-64 lg:block`}
      >
        <div className="p-4 sticky top-0 bg-white border-b">
          <h3 className="text-xl font-bold">Filters</h3>
        </div>
        <FilterSidebar onFilterChange={handleFilterChange} />
      </div>

      <div className="flex-grow p-4 lg:p-6">
        <div className="hidden lg:flex justify-end mb-4">
          <button 
            onClick={toggleCart}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <FaShoppingCart />
            Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">ALL PRODUCTS</h2>
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
          <SortOptions 
            onSortChange={handleSortChange} 
            currentSort={sortOption}
          />
        </div>
        
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your filters to see more results
            </p>
          </div>
        )}
      </div>

      <CartDrawer 
        drawerOpen={isCartOpen} 
        toggleCartDrawer={toggleCart}
        cartItems={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default ProductsPage;