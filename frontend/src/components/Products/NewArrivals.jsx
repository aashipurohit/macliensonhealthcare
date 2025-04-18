
import React, { useRef, useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const newArrivals = [
    {
      _id: "1",
      name: "Parafine-500",
      price: 120,
      quantity: "10 Tablets",
      image: assets.paraffine_500,
    },
    {
      _id: "2",
      name: "B12_neuro_cat",
      price: 120,
      quantity: "10 Tablets",
      image: assets.B12_neuro_cat,
    },
    {
      _id: "4",
      name: "Pan D",
      price: 120,
      quantity: "10 Tablets",
      image: assets.pan_d_cat,
    },
    {
      _id: "6",
      name: "Parafine-500",
      price: 120,
      quantity: "10 Tablets",
      image: assets.paraffine_500,
    },
    {
      _id: "7",
      name: "Sanitizer",
      price: 120,
      quantity: "10 Tablets",
      image: assets.sanitizer_c,
    },
    {
      _id: "8",
      name: "Protien Powder",
      price: 120,
      quantity: "10 Tablets",
      image: assets.protien_c,
    },
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons(); // initialize on mount
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

  // Dragging Handlers
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
    const walk = (x - startX) * 1.5; // Speed multiplier
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section>
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Stay ahead in health with our most recent pharmaceutical additions.
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            className="p-2 rounded border bg-white text-black"
            onClick={() => scroll("left")}
          >
            <FiChevronLeft className="text-2xl" />
          </button>

          <button
            className="p-2 rounded border bg-white text-black"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Content with Drag */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[250px] sm:min-w-[300px] relative bg-white rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-contain p-4"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-left px-3 py-2">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="text-lg font-semibold">{product.name}</h4>
                <p className="text-sm">
                  ₹{product.price} - {product.quantity}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
