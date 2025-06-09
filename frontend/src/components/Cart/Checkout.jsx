import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";

// Mock cart data


// Load Razorpay script dynamically
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cart,error} = useSelector((state) => state.cart);
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
    email: "user@example.com"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!shippingAddress.firstName || !shippingAddress.lastName || 
        !shippingAddress.address || !shippingAddress.city || 
        !shippingAddress.postalCode || !shippingAddress.country || 
        !shippingAddress.phone || !shippingAddress.email) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      // In a real app, you would call your backend to create an order
      // This is a mock implementation
      const orderData = {
        amount: cart.totalPrice * 100, // Razorpay expects amount in paise
        currency: "INR",
        receipt: `order_${Date.now()}`,
        notes: {
          customerName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          shippingAddress: `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}`
        }
      };

      // Load Razorpay script
      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        throw new Error('Razorpay SDK failed to load');
      }

      // Mock options - in a real app, you would get these from your backend
      const options = {
        key: "rzp_test_1DP5mmOlF5G5ag", // Test key - replace with your own in production
        amount: orderData.amount,
        currency: orderData.currency,
        name: "MediCare Pharmacy",
        description: "Order Payment",
        image: "https://via.placeholder.com/150", // Replace with your logo
        order_id: `order_${Date.now()}`, // In real app, get this from your backend
        handler: function(response) {
          // Handle successful payment
          navigate('/order-confirmation', {
            state: {
              orderDetails: { 
                shippingAddress, 
                cart, 
                paymentDetails: response,
                orderId: response.razorpay_order_id
              }
            }
          });
        },
        prefill: {
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          email: shippingAddress.email,
          contact: shippingAddress.phone
        },
        notes: orderData.notes,
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
      rzp.on('payment.failed', function(response) {
        alert(`Payment failed: ${response.error.description}`);
      });
    } catch (error) {
      console.error("Payment error:", error);
      alert(`Payment failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section - Shipping Form */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl uppercase mb-6 font-bold">Checkout</h2>
        <form onSubmit={handleSubmit}>
          {/* Contact Details */}
          <h3 className="text-lg mb-4 font-medium">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={shippingAddress.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          {/* Delivery Information */}
          <h3 className="text-lg mb-4 font-medium">Delivery Information</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="firstName"
                value={shippingAddress.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="lastName"
                value={shippingAddress.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Address <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="address"
              value={shippingAddress.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Postal Code <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-1">Country <span className="text-red-500">*</span></label>
              <select
                name="country"
                value={shippingAddress.country}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              >
                <option value="India">India</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
              <input
                type="tel"
                name="phone"
                value={shippingAddress.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay ₹${cart.totalPrice}`}
          </button>
        </form>
      </div>

      {/* Right Section - Order Summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl uppercase mb-6 font-bold">Order Summary</h2>
        <div className="divide-y">
          {cart.products.map((product) => (
            <div key={product.id} className="py-4 flex items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover mr-4 rounded"
              />
              <div className="flex-grow">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.subcategory}</p>
                {product.date && (
                  <p className="text-gray-500 text-xs">Expiry: {product.date}</p>
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
          <div className="flex justify-between text-gray-600 mb-2">
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
//         <section className="bg-white rounded-lg p-6 shadow-sm">
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
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
//                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                     required
//                     pattern="[0-9]{10}"
//                     title="Please enter a 10-digit phone number"
//                   />
//                 </div>
//               </div>
//             </section>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
//               disabled={loading}
//               aria-label="Proceed to payment"
//             >
//               {loading ? 'Processing...' : `Pay ₹${cart.totalPrice?.toLocaleString('en-IN')}`}
//             </button>
//           </form>
//         </section>

//         {/* Right Section - Order Summary */}
//         <section className="bg-white rounded-lg p-6 shadow-sm">
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