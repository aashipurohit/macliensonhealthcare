import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

const OrderConfirmation = () => {
const dispatch = useDispatch();

  
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};
  
  // If no order details, redirect to home
  if (!orderDetails) {
    navigate('/');
    return null;
  }

  const { shippingAddress, cart, paymentDetails, orderId } = orderDetails;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Order Confirmation Header */}
        <div className="text-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h1 className="text-3xl font-bold mt-4">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase</p>
          <p className="text-sm text-gray-500 mt-2">Order ID: {orderId}</p>
        </div>

        {/* Order Summary */}
        <div className="border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
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

        {/* Shipping and Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span> {shippingAddress.firstName} {shippingAddress.lastName}
              </p>
              <p>
                <span className="font-medium">Address:</span> {shippingAddress.address}
              </p>
              <p>
                <span className="font-medium">City:</span> {shippingAddress.city}
              </p>
              <p>
                <span className="font-medium">Postal Code:</span> {shippingAddress.postalCode}
              </p>
              <p>
                <span className="font-medium">Country:</span> {shippingAddress.country}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {shippingAddress.phone}
              </p>
              <p>
                <span className="font-medium">Email:</span> {shippingAddress.email}
              </p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Payment ID:</span> {paymentDetails.razorpay_payment_id}
              </p>
              <p>
                <span className="font-medium">Order ID:</span> {paymentDetails.razorpay_order_id}
              </p>
              <p>
                <span className="font-medium">Signature:</span> {paymentDetails.razorpay_signature.substring(0, 10)}...
              </p>
              <p>
                <span className="font-medium">Status:</span> <span className="text-green-600">Paid</span>
              </p>
              <p>
                <span className="font-medium">Amount:</span> ₹{cart.totalPrice}
              </p>
              <p>
                <span className="font-medium">Payment Method:</span> Razorpay
              </p>
            </div>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="mt-8 border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Order Status</h2>
          <div className="relative">
            <div className="absolute left-4 h-full w-0.5 bg-gray-200"></div>
            
            {/* Step 1 - Order Placed */}
            <div className="relative mb-8 pl-10">
              <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium">Order Placed</h3>
              <p className="text-sm text-gray-500">Just now</p>
            </div>
            
            {/* Step 2 - Processing */}
            <div className="relative mb-8 pl-10">
              <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium">Processing</h3>
              <p className="text-sm text-gray-500">Estimated: Today</p>
            </div>
            
            {/* Step 3 - Shipped */}
            <div className="relative mb-8 pl-10">
              <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-2a1 1 0 00-.293-.707l-7-7A1 1 0 0012 2H3a1 1 0 00-1 1z" />
                </svg>
              </div>
              <h3 className="font-medium">Shipped</h3>
              <p className="text-sm text-gray-500">Estimated: Tomorrow</p>
            </div>
            
            {/* Step 4 - Delivered */}
            <div className="relative pl-10">
              <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium">Delivered</h3>
              <p className="text-sm text-gray-500">Estimated: 2-3 business days</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;