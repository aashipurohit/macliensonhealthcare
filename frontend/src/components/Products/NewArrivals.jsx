
// import React, { useRef, useState, useEffect } from "react";
// import { assets } from "../../assets/assets";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const NewArrivals = () => {
//   const scrollRef = useRef(null);
//   const [canScrollRight, setCanScrollRight] = useState(true);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);

//   // const newArrivals = [
//   //   {
//   //     _id: "1",
//   //     name: "Nurturmac ",
//   //     //price: 0,
//   //     quantity: "10x10 Capsules",
//   //     image: assets.nurturmac,
//   //   },
//   //   {
//   //     _id: "2",
//   //     name: "Macnurish",
//   //     //price: 0,
//   //     quantity: "5 gm Sachets",
//   //     image: assets.macnurish_p,
//   //   },
//   //   {
//   //     _id: "4",
//   //     name: "SYNDROVA-MET SR",
//   //    // price: 0,
//   //     quantity: "10 Tablets",
//   //     image: assets.syndrova_met_sr_t,
//   //   },
//   //   {
//   //     _id: "6",
//   //     name: "Flavona Forte",
//   //    // price: 0,
//   //     quantity: "10 Tablets",
//   //     image: assets.flavona_forte_sy,
//   //   },
//   //   {
//   //     _id: "7",
//   //     name: "tabletsrx",
//   //    // price: 120,
//   //     quantity: "tabletsrx",
//   //     image: assets.tabletsrx,
//   //   },
//   //   {
//   //     _id: "8",
//   //     name: "tabletsrx",
//   //     //price: 120,
//   //     quantity: "10 Tablets",
//   //     image: assets.tabletsrx,
//   //   },
//   // ];


//       const [newArrivals, setNewArrivals] = useState([]);

//       useEffect(() => {
//         const fetchNewArrivals = async () => {
//           try{
//                const response = await axios.get(
//                 `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
//               );
//               setNewArrivals(response.data);
//           } catch (error) {
//             console.error(error);

//           }
//         };

//         fetchNewArrivals();
//       },[]);



//   const scroll = (direction) => {
//     const container = scrollRef.current;
//     if (container) {
//       const scrollAmount = direction === "left" ? -300 : 300;
//       container.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };
//   // update Sccroll Buttons 
//   const updateScrollButtons = () => {
//     const container = scrollRef.current;
//     if (container) {
//       setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
//     }
//   };

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (container) {
//       container.addEventListener("scroll", updateScrollButtons);
//       updateScrollButtons(); // initialize on mount
//     }
//     return () => {
//       if (container) {
//         container.removeEventListener("scroll", updateScrollButtons);
//       }
//     };
//   }, [newArrivals]);

//   // Dragging Handlers
//   const handleMouseDown = (e) => {
//     const container = scrollRef.current;
//     if (!container) return;

//     setIsDragging(true);
//     setStartX(e.pageX - container.offsetLeft);
//     setScrollLeft(container.scrollLeft);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;

//     const container = scrollRef.current;
//     if (!container) return;

//     e.preventDefault();
//     const x = e.pageX - container.offsetLeft;
//     const walk = (x - startX) * 1.5; // Speed multiplier
//     container.scrollLeft = scrollLeft - walk;
//   };

//   const handleMouseUpOrLeave = () => {
//     setIsDragging(false);
//   };

//   return (
//     <section className="py-16 bg-rose-50">
//       <div className="container mx-auto text-center mb-10 relative">
//         <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
//         <p className="text-lg text-gray-600 mb-8">
//           Stay ahead in health with our most recent pharmaceutical additions.
//         </p>

//         {/* Scroll Buttons */}
//         <div className="absolute right-0 bottom-[-30px] flex space-x-2">
//           <button
//             className="p-2 rounded border bg-white text-black"
//             onClick={() => scroll("left")}
//           >
//             <FiChevronLeft className="text-2xl" />
//           </button>

//           <button
//             className="p-2 rounded border bg-white text-black"
//             onClick={() => scroll("right")}
//             disabled={!canScrollRight}
//           >
//             <FiChevronRight className="text-2xl" />
//           </button>
//         </div>
//       </div>

//       {/* Scrollable Content with Drag */}
//       <div
//         ref={scrollRef}
//         className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${
//           isDragging ? "cursor-grabbing" : "cursor-grab"
//         }`}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUpOrLeave}
//         onMouseLeave={handleMouseUpOrLeave}
//       >
//         {newArrivals.map((product) => (
//           <div
//            key={product._id}
//             className="min-w-[280px] sm:min-w-[340px] h-[450px] relative bg-rose-50 rounded-xl overflow-hidden shadow-lg flex flex-col"
//               >

//             <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-[500px] object-contain p-2"
//             />
//            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-left px-4 py-3">

//               <Link to={`/product/${product._id}`} className="block">
//                 <h4 className="text-lg font-semibold">{product.name}</h4>
//                 <p className="text-sm">
//                   {/* ₹{product.price} - */}
//                   {product.quantity} 
//                 </p>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default NewArrivals;

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
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch new arrivals data
 useEffect(() => {
  const fetchNewArrivals = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
      );
      // Sort again client-side if needed (double protection)
      const sorted = response.data.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      setNewArrivals(sorted);
    } catch (error) {
      console.error("Failed to fetch new arrivals:", error);
      setError(error.message);
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

  // Loading and error states
  if (loading) {
    return (
      <section className="py-16 bg-rose-50">
        <div className="container mx-auto text-center">
          <p>Loading new arrivals...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-rose-50">
        <div className="container mx-auto text-center text-red-500">
          <p>Error loading products: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-rose-50">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Stay ahead in health with our most recent pharmaceutical additions.
        </p>

        {/* Scroll buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            className="p-2 rounded border bg-white text-black hover:bg-rose-100 transition"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            className="p-2 rounded border bg-white text-black hover:bg-rose-100 transition disabled:opacity-50"
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
  className={`container mx-auto overflow-x-auto flex space-x-6 pb-4 snap-x ${
    isDragging ? "cursor-grabbing" : "cursor-grab"
  }`}
  style={{
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }}
>
  {newArrivals.map((product) => (
    <div
      key={product._id}
      className="w-[280px] flex-shrink-0 snap-start bg-white rounded-xl shadow-lg flex flex-col" // Fixed width here
    >
      {/* Product image - Fixed aspect ratio container */}
      <div className="relative pt-[75%] bg-gray-50"> {/* 4:3 aspect ratio */}
        <img
          src={product.images[0]?.url || '/placeholder-product.jpg'}
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
          <h3 className="text-lg font-semibold mb-2 group-hover:text-rose-600 transition line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {product.description}
          </p>
        </Link>
        
        <div className="mt-auto">
          <p className="text-lg font-bold text-rose-700">
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