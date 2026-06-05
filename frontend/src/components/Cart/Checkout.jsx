import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import api from "../../api/apiClient";
import { clearCart } from "../../redux/slices/cartSlice";

// Dynamically load Razorpay script
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "India",
    phone: "",
    email: user?.email || "",
  });

  // Input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkout submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const requiredFields = [
      "firstName",
      "lastName",
      "address",
      "city",
      "postalCode",
      "country",
      "phone",
      "email",
    ];
    for (const field of requiredFields) {
      if (!shippingAddress[field]) {
        alert("Please fill all required fields");
        return;
      }
    }

console.log("Cart object:", cart);
cart.products.forEach((p, i) => {
  console.log(`Product ${i}:`, p);
});



    setLoading(true);

    try {
      // Create Razorpay order on backend
     // Prepare orderItems array for backend
const orderItems = cart.products.map((p) => ({
  productId:  p.productId,
  quantity: p.quantity,
}));

console.log("OrderItems to send to backend:", orderItems);

// Create Razorpay order on backend
const { data } = await api.post("/api/orders/create-razorpay-order", { orderItems });



      if (!data?.order) throw new Error("Failed to create Razorpay order");

      // Load Razorpay script
      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) throw new Error("Failed to load Razorpay SDK");

      // Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_Razorpay_API_KEY, // frontend key
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Maclienson Healthcare",
        description: "Order Payment",
        image: "https://via.placeholder.com/150", // Replace with your logo
        order_id: data.order.id,
        handler: async function (response) {
          try {
            console.log("Payment verification payload:", {
  razorpay_payment_id: response.razorpay_payment_id,
  razorpay_order_id: response.razorpay_order_id,
  razorpay_signature: response.razorpay_signature,
  orderItems
});
            // Verify payment on backend
            await api.post("/api/orders/verify",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                orderItems: cart.products.map((p) => ({
                  productId: p._id,
                  quantity: p.quantity,
                })),
              },
            );

            // Create order in database
         const { data: orderData } = await api.post("/api/orders/create", {
  shipping: shippingAddress,
  cart,
  paymentMethod: "razorpay",
  razorpayPaymentId: response.razorpay_payment_id,
  totalAmount: cart.totalPrice,
  orderItems: cart.products.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
  })),
});
            // Clear cart and navigate
            dispatch(clearCart());
            navigate("/order-confirmation", { state: { orderDetails: orderData.order } });
          } catch (err) {
            console.error("Payment verification/order creation failed:", err);
            alert("Payment failed or verification failed. Please try again.");
          }
        },
        prefill: {
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          email: shippingAddress.email,
          contact: shippingAddress.phone,
        },
        theme: { color: "#e11d48" }, // rose-pink theme for SEO/branding
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response) {
        alert(`Payment failed: ${response.error.description}`);
      });
    } catch (error) {
      console.error("Checkout failed:", error);
      alert(error.message || "Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Shipping Form */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 uppercase">Checkout</h2>
        <form onSubmit={handleSubmit}>
          <h3 className="font-medium text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Email</label>
            <input
                type="email"
                name="email"
                value={shippingAddress.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter your email"
              />

          </div>

          <h3 className="font-medium text-lg mb-4">Delivery Information</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={shippingAddress.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={shippingAddress.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shippingAddress.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingAddress.city}
              onChange={handleInputChange}
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={shippingAddress.postalCode}
              onChange={handleInputChange}
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <select
              name="country"
              value={shippingAddress.country}
              onChange={handleInputChange}
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="India">India</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={shippingAddress.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-primary-500"
              required
              pattern="[0-9]{10}"
              title="Enter 10-digit phone number"
            />
          </div>

          <button
            type="submit"
            disabled={loading || cart.products.length === 0}
            className="w-full bg-gray-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Processing..." : `Pay ₹${cart.totalPrice}`}
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 uppercase">Order Summary</h2>
        <div className="divide-y">
          {cart.products.map((product) => (
            <div key={product._id} className="py-4 flex items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.subcategory}</p>
                {product.date && (
                  <p className="text-gray-400 text-xs">Expiry: {product.date}</p>
                )}
              </div>
              <div className="text-right">
                <p className="font-medium">₹{product.price}</p>
                <p className="text-gray-500 text-sm">Qty: {product.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between font-bold text-lg mb-2">
            <span>Subtotal:</span>
            <span>₹{cart.totalPrice}</span>
          </div>
          <div className="flex justify-between text-gray-500 mb-2">
            <span>Shipping:</span>
            <span>FREE</span>
          </div>
          <div className="flex justify-between font-bold text-xl mt-4 pt-2 border-t">
            <span>Total:</span>
            <span>₹{cart.totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import { useDispatch, useSelector } from "react-redux";
// import axios from 'axios';

// const Checkout = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { cart, error } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.auth);

//   const [loading, setLoading] = useState(false);
//   const [shippingAddress, setShippingAddress] = useState({
//     firstName: user?.firstName || "",
//     lastName: user?.lastName || "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "India",
//     phone: user?.phone || "",
//     email: user?.email || ""
//   });

//   // Redirect if cart is empty
//   useEffect(() => {
//     if (!cart.products || cart.products.length === 0) {
//       navigate('/cart');
//     }
//   }, [cart, navigate]);

//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) {
//         resolve(true);
//         return;
//       }

//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.async = true;
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setShippingAddress(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const createOrder = async () => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/orders/create`,
//         {
//           items: cart.products.map(product => ({
//             productId: product.productId,
//             quantity: product.quantity,
//             price: product.price
//           })),
//           shippingAddress,
//           totalAmount: cart.totalPrice
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`
//           }
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Order creation failed:", error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form
//     const requiredFields = ['firstName', 'lastName', 'address', 'city', 'postalCode', 'country', 'phone', 'email'];
//     const missingFields = requiredFields.filter(field => !shippingAddress[field]);
    
//     if (missingFields.length > 0) {
//       alert(`Please fill all required fields: ${missingFields.join(', ')}`);
//       return;
//     }

//     setLoading(true);

//     try {
//       // 1. Create order in backend
//       const order = await createOrder();
      
//       // 2. Load Razorpay
//       const razorpayLoaded = await loadRazorpay();
//       if (!razorpayLoaded) throw new Error('Razorpay SDK failed to load');

//       // 3. Initialize payment
//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: order.amount * 100, // in paise
//         currency: "INR",
//         name: "MediCare Pharmacy",
//         description: `Order #${order.orderNumber}`,
//         image: "/logo.png",
//         order_id: order.razorpayOrderId,
//         handler: async function(response) {
//           try {
//             await verifyPayment(order._id, response);
//             navigate('/order-confirmation', {
//               state: {
//                 orderId: order._id,
//                 paymentId: response.razorpay_payment_id
//               }
//             });
//           } catch (error) {
//             console.error("Payment verification failed:", error);
//             alert("Payment verification failed. Please contact support.");
//           }
//         },
//         prefill: {
//           name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
//           email: shippingAddress.email,
//           contact: shippingAddress.phone
//         },
//         notes: {
//           orderId: order._id
//         },
//         theme: { color: "#3399cc" }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
      
//       rzp.on('payment.failed', async (response) => {
//         try {
//           await axios.put(
//             `${import.meta.env.VITE_BACKEND_URL}/api/orders/${order._id}/status`,
//             { status: 'failed', paymentError: response.error },
//             { headers: { Authorization: `Bearer ${user.token}` } }
//           );
//           alert(`Payment failed: ${response.error.description}`);
//         } catch (error) {
//           console.error("Failed to update order status:", error);
//         }
//       });

//     } catch (error) {
//       console.error("Checkout error:", error);
//       alert(`Payment failed: ${error.response?.data?.message || error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyPayment = async (orderId, paymentResponse) => {
//     await axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}/api/orders/verify`,
//       { orderId, paymentResponse },
//       { headers: { Authorization: `Bearer ${user.token}` } }
//     );
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Checkout | MediCare Pharmacy</title>
//         <meta name="description" content="Complete your purchase securely with MediCare Pharmacy. Fast delivery and quality healthcare products." />
//         <link rel="canonical" href="/checkout" />
//       </Helmet>

//       <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-4 sm:px-6">
//         {/* Left Section - Shipping Form */}
//         <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-all duration-200 hover:shadow-md">
//           <h1 className="text-2xl uppercase mb-6 font-bold">Checkout</h1>
//           <form onSubmit={handleSubmit}>
//             <section aria-labelledby="contact-details">
//               <h2 id="contact-details" className="text-lg mb-4 font-medium">Contact Details</h2>
//               <div className="mb-4">
//                 <label htmlFor="email" className="block text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={shippingAddress.email}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>
//             </section>

//             <section aria-labelledby="delivery-info">
//               <h2 id="delivery-info" className="text-lg mb-4 font-medium">Delivery Information</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label htmlFor="firstName" className="block text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     name="firstName"
//                     value={shippingAddress.firstName}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="lastName" className="block text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
//                   <input
//                     type="text"
//                     id="lastName"
//                     name="lastName"
//                     value={shippingAddress.lastName}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="address" className="block text-gray-700 mb-1">Address <span className="text-red-500">*</span></label>
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   value={shippingAddress.address}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label htmlFor="city" className="block text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
//                   <input
//                     type="text"
//                     id="city"
//                     name="city"
//                     value={shippingAddress.city}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="postalCode" className="block text-gray-700 mb-1">Postal Code <span className="text-red-500">*</span></label>
//                   <input
//                     type="text"
//                     id="postalCode"
//                     name="postalCode"
//                     value={shippingAddress.postalCode}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//                 <div>
//                   <label htmlFor="country" className="block text-gray-700 mb-1">Country <span className="text-red-500">*</span></label>
//                   <select
//                     id="country"
//                     name="country"
//                     value={shippingAddress.country}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
//                     required
//                   >
//                     <option value="India">India</option>
//                     <option value="USA">United States</option>
//                     <option value="UK">United Kingdom</option>
//                     <option value="Canada">Canada</option>
//                     <option value="Australia">Australia</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label htmlFor="phone" className="block text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={shippingAddress.phone}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
//                     required
//                     pattern="[0-9]{10}"
//                     title="Please enter a 10-digit phone number"
//                   />
//                 </div>
//               </div>
//             </section>

//             <button
//               type="submit"
//               className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50"
//               disabled={loading}
//               aria-label="Proceed to payment"
//             >
//               {loading ? 'Processing...' : `Pay ₹${cart.totalPrice?.toLocaleString('en-IN')}`}
//             </button>
//           </form>
//         </section>

//         {/* Right Section - Order Summary */}
//         <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-all duration-200 hover:shadow-md">
//           <h2 className="text-2xl uppercase mb-6 font-bold">Order Summary</h2>
//           <div className="divide-y">
//             {cart.products?.map((product) => (
//               <article 
//                 key={`${product.productId}-${product.quantity}`} 
//                 className="py-4 flex items-center"
//               >
//                 <img
//                   src={product.image || '/placeholder-product.jpg'}
//                   alt={product.name}
//                   className="w-16 h-16 object-cover mr-4 rounded"
//                   loading="lazy"
//                   width="64"
//                   height="64"
//                 />
//                 <div className="flex-grow">
//                   <h3 className="font-medium">{product.name}</h3>
//                   <p className="text-gray-600 text-sm">{product.subcategory}</p>
//                   {product.date && (
//                     <p className="text-gray-500 text-xs">Expiry: {product.date}</p>
//                   )}
//                 </div>
//                 <div className="text-right">
//                   <p className="font-medium">₹{product.price?.toLocaleString('en-IN')}</p>
//                   <p className="text-gray-500 text-sm">Qty: {product.quantity}</p>
//                 </div>
//               </article>
//             ))}
//           </div>
//           <div className="border-t mt-4 pt-4">
//             <div className="flex justify-between font-bold text-lg mb-2">
//               <span>Subtotal:</span>
//               <span>₹{cart.totalPrice?.toLocaleString('en-IN')}</span>
//             </div>
//             <div className="flex justify-between text-gray-600 mb-2">
//               <span>Shipping:</span>
//               <span>FREE</span>
//             </div>
//             <div className="flex justify-between font-bold text-xl mt-4 pt-2 border-t">
//               <span>Total:</span>
//               <span>₹{cart.totalPrice?.toLocaleString('en-IN')}</span>
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

// export default Checkout;

