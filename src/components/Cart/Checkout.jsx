import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from "../../assets/assets";

// Mock cart data
const cart = {
  products: [
    {
      id: 1,
      name: "Crosin",
      price: 199,
      image: assets.crosin,
      subcategory: "Analgesic",
      quantity: 1
    },
    {
      id: 2,
      name: "Vitamin E Capsule",
      price: 500,
      image: assets.ecapsule,
      subcategory: "Supplement",
      date: "2025-04-10",
      quantity: 1
    },
  ],
  totalPrice: 699,
};

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