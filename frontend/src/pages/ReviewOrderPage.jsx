import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyAndCreateOrder } from "../redux/slices/checkoutSlice";

const ReviewOrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
  const cartItems = useMemo(() => cart?.products || [], [cart?.products]);
  const totalPrice = cart?.totalPrice || 0;

  const shipping = JSON.parse(localStorage.getItem("shippingAddress"));
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);

  const paymentData = useMemo(
    () =>
      location.state?.razorpayPaymentId
        ? {
            razorpay_payment_id: location.state.razorpayPaymentId,
            razorpay_order_id: location.state.razorpayOrderId,
            razorpay_signature: location.state.razorpaySignature,
          }
        : null,
    [location.state]
  );

  useEffect(() => {
    if (!shipping || cartItems.length === 0) {
      navigate("/shipping");
    }
  }, [shipping, cartItems, navigate]);

  const verifyPayment = useCallback(async () => {
    setVerifyingPayment(true);
    try {
      const result = await dispatch(verifyAndCreateOrder(paymentData)).unwrap();
      if (result.success) {
        setPaymentVerified(true);
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      alert("Payment verification failed. Please contact support.");
    } finally {
      setVerifyingPayment(false);
    }
  }, [dispatch, paymentData]);

  useEffect(() => {
    if (paymentData && !paymentVerified && !verifyingPayment) {
      verifyPayment();
    }
  }, [paymentData, paymentVerified, verifyingPayment, verifyPayment]);

  const handlePlaceOrder = () => {
    navigate("/place-order", {
      state: {
        shipping,
        cart: {
          products: cartItems,
          totalPrice,
          ...(paymentVerified &&
            paymentData && {
              payment: {
                method: "razorpay",
                ...paymentData,
                verified: true,
              },
            }),
        },
      },
    });
  };

  const handleBackToPayment = () => {
    navigate("/payment");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Review Your Order
      </h1>

      {paymentData && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            paymentVerified
              ? "bg-gray-50 border border-gray-200"
              : verifyingPayment
              ? "bg-gray-50 border border-gray-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-3">
            {paymentVerified ? (
              <>
                <span className="text-green-600 text-2xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-600">
                    Payment Successful!
                  </h3>
                  <p className="text-green-600 text-sm">
                    Your payment has been verified.
                  </p>
                </div>
              </>
            ) : verifyingPayment ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-primary-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <div>
                  <h3 className="font-semibold text-primary-700">
                    Verifying Payment...
                  </h3>
                  <p className="text-primary-600 text-sm">
                    Please wait while we verify your payment.
                  </p>
                </div>
              </>
            ) : (
              <>
                <span className="text-red-600 text-2xl">!</span>
                <div>
                  <h3 className="font-semibold text-red-800">
                    Payment Verification Pending
                  </h3>
                  <p className="text-red-600 text-sm">
                    Please complete payment verification.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-4 pb-2 border-b">
            Order Items
          </h2>

          {cartItems.length > 0 ? (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item._id || item.productId}
                  className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    {item.color && (
                      <p className="text-sm text-gray-500">
                        Color: {item.color}
                      </p>
                    )}
                    {item.size && (
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    )}
                  </div>
                  <p className="font-semibold">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              Your cart is empty.
            </p>
          )}
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-3">Shipping Details</h2>
            {shipping ? (
              <div className="space-y-2 text-gray-700">
                <p className="font-medium">
                  {shipping.firstName} {shipping.lastName}
                </p>
                <p>{shipping.address}</p>
                <p>
                  {shipping.city}, {shipping.state} - {shipping.postalCode}
                </p>
                <p>{shipping.country}</p>
                <p className="pt-2 border-t">Phone: {shipping.phone}</p>
                <p>Email: {shipping.email}</p>
              </div>
            ) : (
              <p className="text-red-500">Shipping information is missing.</p>
            )}
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-3">Price Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (GST)</span>
                <span>₹{(totalPrice * 0.18).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span>₹{(totalPrice * 1.18).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handlePlaceOrder}
              disabled={
                !shipping || cartItems.length === 0 || (paymentData && !paymentVerified)
              }
              className={`w-full py-3 rounded-lg font-medium transition ${
                !shipping || cartItems.length === 0 || (paymentData && !paymentVerified)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary-600 hover:bg-primary-700"
              } text-white`}
            >
              {paymentData
                ? paymentVerified
                  ? "Place Order"
                  : "Complete Payment Verification"
                : "Place Order"}
            </button>

            <button
              onClick={handleBackToPayment}
              className="w-full py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Back to Payment
            </button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>✓ 100% Secure Payment | ✓ 7-Day Return Policy</p>
            <p>Your personal information is protected with SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrderPage;
