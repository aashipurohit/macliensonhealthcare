// import React from "react";
// import { useNavigate } from "react-router-dom";

// const PaymentPage = () => {
//   const navigate = useNavigate();

//   const handleContinue = () => {
//     navigate("/review-order");
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>

//       <div className="border rounded p-4">
//         <label className="flex items-center gap-3">
//           <input type="radio" defaultChecked />
//           <span>Razorpay (UPI / Cards / Wallets)</span>
//         </label>
//       </div>

//       <button
//         onClick={handleContinue}
//         className="mt-6 w-full bg-primary-600 text-white py-3 rounded-lg"
//       >
//         Continue
//       </button>
//     </div>
//   );
// };

// export default PaymentPage;

// pages/PaymentPage.js - Updated
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRazorpayOrder } from "../redux/slices/checkoutSlice";
import { loadRazorpayScript } from "../utils/razorpayUtils";

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { cartItems = [], totalPrice = 0 } = useSelector((state) => state.cart);
  const { loading, razorpayOrder } = useSelector((state) => state.checkout);
  const [selectedMethod, setSelectedMethod] = useState("razorpay");
  
  const shipping = JSON.parse(localStorage.getItem("shippingAddress"));
  const user = JSON.parse(localStorage.getItem("userInfo"));

  // Load Razorpay script on component mount
  React.useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    if (!shipping) {
      alert("Please fill shipping details first");
      navigate("/shipping");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      navigate("/cart");
      return;
    }

     console.log("Cart total (₹):", totalPrice);
  console.log("Razorpay amount (paise):", totalPrice * 100);

    try {
      // Create order data
      const orderData = {
        amount: totalPrice * 100, 
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          shipping: JSON.stringify(shipping),
          cartItems: cartItems.length,
          userId: user?._id || "guest",
        },
      };

      // Create Razorpay order in backend
      const result = await dispatch(createRazorpayOrder(orderData)).unwrap();
      
      if (result.success && result.order) {
        // Initialize Razorpay checkout
        const options = {
          key: import.meta.env. VITE_Razorpay_API_KEY,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Your Store Name",
          description: `Order for ${cartItems.length} items`,
          order_id: result.order.id,
          handler: async function (response) {
            // Handle successful payment
            await handlePaymentSuccess(response, result.order);
          },
          prefill: {
            name: `${shipping.firstName} ${shipping.lastName}`,
            email: shipping.email || user?.email,
            contact: shipping.phone,
          },
          notes: {
            address: shipping.address,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        
        rzp.on("payment.failed", function (response) {
          console.error("Payment failed:", response.error);
          alert(`Payment failed: ${response.error.description}`);
          navigate("/review-order");
        });
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  const handlePaymentSuccess = async (paymentResponse, order) => {
    try {
      // Here you would typically verify the payment on your backend
      // For now, navigate to review-order
      navigate("/review-order", {
        state: {
          paymentSuccess: true,
          razorpayPaymentId: paymentResponse.razorpay_payment_id,
          razorpayOrderId: paymentResponse.razorpay_order_id,
          razorpaySignature: paymentResponse.razorpay_signature,
        },
      });
    } catch (error) {
      console.error("Payment success handling failed:", error);
      navigate("/review-order");
    }
  };

  const handleContinue = () => {
    if (selectedMethod === "razorpay") {
      handlePayment();
    } else {
      // Handle other payment methods
      navigate("/review-order");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Select Payment Method</h2>
      
      {/* Order Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <p className="text-gray-600">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} • Total: ₹{totalPrice}
        </p>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4 mb-6">
        <div className="border rounded-lg p-4 hover:border-blue-500 transition">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="radio" 
              name="paymentMethod"
              value="razorpay"
              checked={selectedMethod === "razorpay"}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="h-5 w-5"
            />
            <div className="flex-1">
              <span className="font-medium">Razorpay Secure Payment</span>
              <p className="text-sm text-gray-500 mt-1">
                Pay via UPI, Credit/Debit Cards, Net Banking, or Wallets
              </p>
              <div className="flex items-center gap-2 mt-2">
                <img src="/razorpay-logo.svg" alt="Razorpay" className="h-6" />
                <span className="text-xs text-green-600 font-medium">
                  ✓ 100% Secure | ✓ PCI DSS Compliant
                </span>
              </div>
            </div>
          </label>
        </div>

        <div className="border rounded-lg p-4 hover:border-blue-500 transition">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="radio" 
              name="paymentMethod"
              value="cod"
              checked={selectedMethod === "cod"}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="h-5 w-5"
            />
            <div>
              <span className="font-medium">Cash on Delivery (COD)</span>
              <p className="text-sm text-gray-500 mt-1">
                Pay when you receive your order
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Important Information */}
      <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-semibold text-gray-600 mb-2">Important Information</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>✓ Your payment details are secured with 256-bit SSL encryption</li>
          <li>✓ We do not store your card details</li>
          <li>✓ All transactions are PCI DSS compliant</li>
          <li>✓ 100% payment protection guarantee</li>
        </ul>
      </div>

      {/* Payment Button */}
      <button
        onClick={handleContinue}
        disabled={loading || cartItems.length === 0}
        className={`mt-6 w-full py-3 rounded-lg font-medium transition ${
          loading || cartItems.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary-600 hover:bg-primary-700"
        } text-white`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : selectedMethod === "razorpay" ? (
          `Pay Securely - ₹${totalPrice}`
        ) : (
          "Continue with COD"
        )}
      </button>

      {/* Back Button */}
      <button
        onClick={() => navigate("/shipping")}
        className="mt-4 w-full py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
      >
        Back to Shipping
      </button>

      {/* Security Badges */}
      <div className="mt-8 flex justify-center gap-6">
        <img src="/ssl-secure.svg" alt="SSL Secure" className="h-10" />
        <img src="/pci-dss.svg" alt="PCI DSS Compliant" className="h-10" />
        <img src="/razorpay-secure.svg" alt="Razorpay Secure" className="h-10" />
      </div>
    </div>
  );
};

export default PaymentPage;


