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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["firstName", "lastName", "address", "city", "postalCode", "country", "phone", "email"];
    for (const field of requiredFields) {
      if (!shippingAddress[field]) {
        alert("Please fill all required fields");
        return;
      }
    }

    setLoading(true);

    try {
      // ── STEP 1: Create Razorpay order (amount comes from server) ──
      const orderItems = cart.products.map((p) => ({
        productId: p.productId,
        quantity: p.quantity,
        // No price sent — server calculates from DB securely
      }));

      const { data } = await api.post("/api/orders/create-razorpay-order", { orderItems });
      if (!data?.order) throw new Error("Failed to create Razorpay order");

      // Use server-returned amount for the Razorpay modal — never cart.totalPrice
      const serverAmount = data.order.amount;       // paise, from server
      const serverTotal  = data.totalAmount;        // ₹ for display only

      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) throw new Error("Failed to load Razorpay SDK");

      const options = {
        key:         import.meta.env.VITE_Razorpay_API_KEY,
        amount:      serverAmount,          // Server value
        currency:    data.order.currency,
        name:        "Maclienson Healthcare",
        description: "Order Payment",
        order_id:    data.order.id,
        handler: async function (response) {
          try {
            // ── STEP 2: Single call — verify + create order atomically ──
            const idempotencyKey = `${user._id}_${data.order.id}`;

            const { data: orderData } = await api.post("/api/orders/verify-and-create", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_signature:  response.razorpay_signature,
              orderItems,          // [{productId, quantity}] only — no price
              shipping:            shippingAddress,
              idempotencyKey,
            });

            dispatch(clearCart());
            navigate("/order-confirmation", { state: { orderDetails: orderData.order } });

          } catch (err) {
            console.error("Payment verification/order creation failed:", err);
            alert("Payment processing failed. Please contact support with your payment ID: " + response.razorpay_payment_id);
          }
        },
        prefill: {
          name:    `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          email:   shippingAddress.email,
          contact: shippingAddress.phone,
        },
        theme: { color: "#e11d48" },
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
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter your email"
              required
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
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={shippingAddress.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-gray-400"
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
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-gray-400"
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
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={shippingAddress.postalCode}
              onChange={handleInputChange}
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <select
              name="country"
              value={shippingAddress.country}
              onChange={handleInputChange}
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-gray-400"
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
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-gray-400"
              required
              pattern="[0-9]{10}"
              title="Enter 10-digit phone number"
            />
          </div>

          <button
            type="submit"
            disabled={loading || cart?.products?.length === 0}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Processing..." : `Pay ₹${cart?.totalPrice || 0}`}
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 uppercase">Order Summary</h2>
        <div className="divide-y">
          {cart?.products?.map((product) => (
            // ✅ FIX: Changed product._id to product.productId to fix the React Key Warning
            <div key={product.productId} className="py-4 flex items-center">
              <img
                src={product.image || 'https://via.placeholder.com/150'}
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
            <span>₹{cart?.totalPrice || 0}</span>
          </div>
          <div className="flex justify-between text-gray-500 mb-2">
            <span>Shipping:</span>
            <span>FREE</span>
          </div>
          <div className="flex justify-between font-bold text-xl mt-4 pt-2 border-t">
            <span>Total:</span>
            <span>₹{cart?.totalPrice || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;