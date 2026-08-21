import React, { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch new arrivals data
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        // Remove the client-side sorting - trust the backend
        setNewArrivals(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch new arrivals:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);


  // Scroll functions
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Update scroll buttons visibility
  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
    }
  };

  // Initialize scroll event listener
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, [newArrivals]);

  // Dragging handlers for scroll
  const handleMouseDown = (e) => {
    const container = scrollRef.current;
    if (!container) return;

    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const container = scrollRef.current;
    if (!container) return;

    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    const container = scrollRef.current;
    if (container) setScrollLeft(container.scrollLeft);
  };

  const handleTouchMove = (e) => {
    const container = scrollRef.current;
    if (!container) return;
    const dx = touchStartX - e.touches[0].clientX;
    container.scrollLeft = scrollLeft + dx;
  };

  // Loading and error states
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <p>Loading new arrivals...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center text-red-500">
          <p>Error loading products: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-champagne-50">
      <div className="container mx-auto text-center mb-12 relative">
        <h2 className="text-4xl font-serif font-semibold text-gray-900 mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Stay ahead in health with our most recent pharmaceutical additions.
        </p>

        {/* Scroll buttons — only on md+ */}
        <div className="hidden md:flex absolute right-0 bottom-[-30px] space-x-2">
          <button
            className="p-2 rounded border bg-white text-black hover:bg-gray-50 transition"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            className="p-2 rounded border bg-white text-black hover:bg-gray-50 transition disabled:opacity-50"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Product cards */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className={`container mx-auto overflow-x-auto flex space-x-6 pb-4 snap-x ${isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >

        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="w-[280px] flex-shrink-0 snap-start mh-card flex flex-col"
          >
            {/* Product image - Fixed aspect ratio container */}
            <div className="relative pt-[75%] bg-white/50 border-b border-gold-100/50"> {/* 4:3 aspect ratio */}
              <img
                src={product.images[0]?.url.replace('/upload/', '/upload/f_auto,q_auto,w_300/')}
                alt={product.images[0]?.altText || product.name}
                className="absolute top-0 left-0 w-full h-full object-contain p-4"
                onError={(e) => {
                  e.target.src = '/placeholder-product.jpg';
                }}
              />
            </div>

            {/* Product info - Consistent padding */}
            <div className="p-4 flex-grow flex flex-col">
              <Link
                to={`/product/${product._id}`}
                className="group block flex-grow"
              >
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {product.description}
                </p>
              </Link>

              <div className="mt-auto">
                <p className="text-lg font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </p>
                {product.countInStock > 0 ? (
                  <p className="text-sm text-green-600">In Stock ({product.countInStock})</p>
                ) : (
                  <p className="text-sm text-red-600">Out of Stock</p>
                )}
              </div>
            </div>
          </div>

        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
