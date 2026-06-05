// import React from 'react';
// import { IoMdClose } from "react-icons/io";
// import { useNavigate } from "react-router-dom"; 
// import CartContents from "../Cart/CartContents.jsx";
// import { useSelector } from "react-redux";


// const CartDrawer = ({
//   drawerOpen,
//   toggleCartDrawer,
//   cartItems, 
//   removeFromCart, 
//   updateQuantity 
// }) => {
//   const navigate = useNavigate();
//   const {user, guestId} = useSelector((state) => state.auth);
//   const {cart} = useSelector((state) => state.cart);
//   const userId = user ? user._id : null;


//   const handleCheckout = () => {
//     toggleCartDrawer();
//     if(!user)
//     {   
//     navigate("/login?redirect=checkout");
//     }
//     else {
//       navigate ("/checkout");
//     }
//   };
    
//   return (
//     <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white 
//     shadow-sm transform transition-all duration-200 flex flex-col z-50 
//     ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
//       {/* Close Button */}
//       <div
//        className="flex justify-end p-4">
//         <button
//         aria-label="Close" 
//          onClick={toggleCartDrawer}>
//           <IoMdClose className="h-6 w-6 text-gray-600"/> 
//         </button>
//       </div>
      
//       {/* Cart Content with scrollable area */}
//       <div className="flex-grow p-4 overflow-y-auto">
//         <h2 className="text-xl font-semibold mb-4">
//           Your Cart
//         </h2>
//         {cart && cart?.products?.length > 0 ? (
//           <CartContents 
//           // cartItems={cartItems}
//           // removeFromCart={removeFromCart}
//           // updateQuantity={updateQuantity}
//           cart={cart} userId={userId} guestId={guestId}
//         />

//         ) : (
//           <p>Your cart is empty</p>
//         )}
        
//       </div>
      
//       {/* Checkout Button fixed at the bottom */}
//       <div className="p-4 bg-white sticky bottom-0">
//         {cart && cart?.products?.length > 0 && (
//           <>
          
//           <button 
//           onClick={handleCheckout} 
//           className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
//         >
//           Checkout
//         </button>
//         <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
//           Shipping, taxes, and discount codes calculated at checkout.
//         </p>
          
//           </>
//         )}
        
//       </div>
//     </div>
//   );
// };

// export default CartDrawer

// import React, { useEffect } from 'react';
// import { IoMdClose } from "react-icons/io";
// import { useNavigate } from "react-router-dom"; 
// import CartContents from "../Cart/CartContents.jsx";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchCart } from "../../redux/slices/cartSlice";

// const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user, guestId } = useSelector((state) => state.auth);
//   const { cart, loading, error } = useSelector((state) => state.cart);

//   // Fetch cart when drawer opens or user changes
//   useEffect(() => {
//     if (drawerOpen) {
//       dispatch(fetchCart({ 
//         userId: user?._id, 
//         guestId: !user ? guestId : undefined 
//       }));
//     }
//   }, [drawerOpen, user, guestId, dispatch]);

//   const handleCheckout = () => {
//     toggleCartDrawer();
//     if (!user) {   
//       navigate("/login?redirect=checkout");
//     } else {
//       navigate("/checkout");
//     }
//   };

//   if (!drawerOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50">
//       {/* Overlay */}
//       <div 
//         className="fixed inset-0 bg-primary-600 bg-opacity-50"
//         onClick={toggleCartDrawer}
//       />
      
//       {/* Drawer */}
//       <div className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white 
//         shadow-sm flex flex-col transform transition-all duration-200
//         ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        
//         {/* Header */}
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-xl font-semibold">Your Cart</h2>
//           <button 
//             onClick={toggleCartDrawer}
//             aria-label="Close cart"
//             className="p-1 rounded-full hover:bg-gray-100"
//           >
//             <IoMdClose className="h-6 w-6 text-gray-600"/>
//           </button>
//         </div>
        
//         {/* Content */}
//         <div className="flex-grow overflow-y-auto p-4">
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <p>Loading cart...</p>
//             </div>
//           ) : error ? (
//             <div className="text-red-500 p-4">
//               Error: {error.message || "Failed to load cart"}
//             </div>
//           ) : cart?.products?.length > 0 ? (
//             <CartContents />
//           ) : (
//             <div className="flex flex-col items-center justify-center h-64">
//               <p className="text-gray-500 mb-4">Your cart is empty</p>
//               <button
//                 onClick={toggleCartDrawer}
//                 className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           )}
//         </div>
        
//         {/* Footer */}
//         {cart?.products?.length > 0 && (
//           <div className="p-4 border-t bg-white sticky bottom-0">
//             <div className="mb-4 space-y-2">
//               <div className="flex justify-between">
//                 <span>Subtotal:</span>
//                 <span>₹{cart.totalPrice?.toFixed(2)}</span>
//               </div>
//               {cart.discount > 0 && (
//                 <div className="flex justify-between text-green-600">
//                   <span>Discount:</span>
//                   <span>-₹{cart.discount?.toFixed(2)}</span>
//                 </div>
//               )}
//               <div className="flex justify-between font-bold">
//                 <span>Total:</span>
//                 <span>₹{(cart.totalPrice - (cart.discount || 0)).toFixed(2)}</span>
//               </div>
//             </div>
//             <button 
//               onClick={handleCheckout}
//               className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
//               disabled={loading}
//             >
//               {loading ? 'Processing...' : 'Checkout'}
//             </button>
//             <p className="text-xs text-gray-500 mt-2 text-center">
//               Shipping and taxes calculated at checkout
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartDrawer;


// import React, { useEffect } from 'react';
// import { IoMdClose } from "react-icons/io";
// import { useNavigate } from "react-router-dom"; 
// import CartContents from "../Cart/CartContents.jsx";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchCart } from '../../redux/slices/cartSlice'; // Add this import

// const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { cart, loading, error } = useSelector((state) => state.cart);

//   // Add this useEffect to refetch cart when drawer opens
//   useEffect(() => {
//     if (drawerOpen) {
//       dispatch(fetchCart());
//     }
//   }, [drawerOpen, dispatch]);

//   const handleCheckout = () => {
//     toggleCartDrawer();
//     navigate(user ? "/checkout" : "/login?redirect=checkout");
//   };

//   const totalItems = cart.products?.reduce((sum, item) => sum + item.quantity, 0) || 0;
//   const subtotal = cart.totalPrice || 0;

//   return (
//     <div className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-sm 
//       transition-all duration-200 ease-in-out z-50 flex flex-col 
//       ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
      
//       {/* Header */}
//       <div className="flex justify-between items-center p-4 border-b">
//         <h2 className="text-xl font-bold">Your Cart ({totalItems})</h2>
//         <button
//           onClick={toggleCartDrawer}
//           className="p-2 rounded-full hover:bg-gray-100"
//           aria-label="Close cart drawer"
//         >
//           <IoMdClose className="text-gray-600 w-6 h-6" />
//         </button>
//       </div>

//       {/* Cart Content */}
//       <div className="flex-grow overflow-y-auto">
//         {loading ? (
//           <div className="flex justify-center items-center h-full p-4">Loading your cart...</div>
//         ) : error ? (
//           <div className="p-4 text-red-600 text-center">
//   {typeof error === 'string' ? error : error?.message || "Something went wrong"}
// </div>

//         ) : cart.products?.length > 0 ? (
//           <CartContents />
//         ) : (
//           <div className="flex flex-col items-center justify-center h-full p-4">
//             <p className="text-lg mb-4">Your cart is empty</p>
//             <button
//               onClick={toggleCartDrawer}
//               className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Checkout Footer */}
//       {cart.products?.length > 0 && (
//         <div className="border-t p-4 bg-white">
//           <div className="flex justify-between mb-4 text-lg font-medium">
//             <span>Subtotal</span>
//             <span>₹{subtotal.toLocaleString("en-IN")}</span>
//           </div>
//           <button
//             onClick={handleCheckout}
//             disabled={loading || totalItems === 0}
//             className={`w-full py-3 rounded-lg font-semibold transition
//               ${loading || totalItems === 0 
//                 ? 'bg-gray-400 cursor-not-allowed text-white' 
//                 : 'bg-primary-600 text-white hover:bg-primary-700'}`}
//           >
//             {loading ? 'Processing...' : 'Proceed to Checkout'}
//           </button>
//           <p className="text-xs text-gray-500 mt-2 text-center">
//             Shipping, taxes & discounts calculated at checkout.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartDrawer;

import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CartContents from "../Cart/CartContents.jsx";
import { fetchCart } from "../../redux/slices/cartSlice";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cart, loading, error, initialized } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (drawerOpen && !initialized) {
      dispatch(fetchCart());
    }
  }, [drawerOpen, initialized, dispatch]);

  const handleCheckout = () => {
    toggleCartDrawer();
    navigate(user ? "/checkout" : "/login?redirect=checkout");
  };

  const totalItems =
    cart?.products?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const subtotal = cart?.totalPrice || 0;

  return (
    <div
      className={`fixed top-0 right-0 z-50 flex h-full w-full flex-col bg-white shadow-sm transition-all duration-200 ease-in-out  sm:w-96
      ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center justify-between border-b border-gray-200 p-4 ">
        <h2 className="text-xl font-bold text-gray-900 ">
          Your Cart ({totalItems})
        </h2>
        <button
          onClick={toggleCartDrawer}
          className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900   "
          aria-label="Close cart drawer"
        >
          <IoMdClose className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto">
        {loading ? (
          <div className="flex h-full items-center justify-center p-4 text-gray-600 ">
            Loading your cart...
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-600">
            {typeof error === "string"
              ? error
              : error?.message || "Something went wrong"}
          </div>
        ) : cart?.products?.length > 0 ? (
          <CartContents />
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-4">
            <p className="mb-4 text-lg text-gray-900 ">
              Your cart is empty
            </p>
            <button
              onClick={toggleCartDrawer}
              className="rounded px-4 py-2 font-medium text-white transition bg-primary-600 hover:bg-primary-700  "
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {cart?.products?.length > 0 && (
        <div className="border-t border-gray-200 bg-white p-4  ">
          <div className="mb-4 flex justify-between text-lg font-medium text-gray-900 ">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading || totalItems === 0}
            className={`w-full rounded-lg py-3 font-semibold transition ${
              loading || totalItems === 0
                ? "cursor-not-allowed bg-gray-300 text-white  "
                : "bg-primary-600 text-white hover:bg-primary-700  "
            }`}
          >
            {loading ? "Processing..." : "Proceed to Checkout"}
          </button>

          <p className="mt-2 text-center text-xs text-gray-500 ">
            Shipping, taxes & discounts calculated at checkout.
          </p>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;


