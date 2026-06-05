import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderDetails, paymentMethod } = location.state || {};
  const order = orderDetails?.order;

  useEffect(() => {
    if (!order) {
      navigate("/");
    }
  }, [order, navigate]);

  if (!order) return null;

  const orderId = order._id || `ORD${Date.now()}`;

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const paymentMethodDisplay = () => {
    if (!paymentMethod) return "Unknown";
    switch (paymentMethod.toLowerCase()) {
      case "razorpay":
        return "Online Payment (Razorpay)";
      case "upi":
        return "UPI Payment";
      case "card":
        return "Card Payment";
      case "cod":
      case "cashondelivery":
        return "Cash on Delivery";
      default:
        return paymentMethod;
    }
  };
  console.log("OrderConfirmation state:", location.state);

  const isPaid =
    order.paymentStatus?.toLowerCase() === "paid" || order.isPaid === true;

  return (
    <div className="min-h-screen bg-gray-50 py-12 ">
      <div className="max-w-3xl mx-auto p-6">
        <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6 text-center  ">
          <div className="mb-4 text-5xl text-green-600 ">✓</div>
          <h1 className="mb-2 text-3xl font-bold text-gray-600 ">
            Order Confirmed!
          </h1>
          <p className="text-green-600 ">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm   ">
            <h2 className="mb-4 border-b border-gray-200 pb-3 text-xl font-semibold ">
              Order Information
            </h2>

            <div className="space-y-3">
              <InfoRow label="Order ID" value={orderId} />
              <InfoRow label="Order Date" value={orderDate} />
              <InfoRow label="Total Amount" value={`Rs. ${order.totalPrice}`} bold />
              <InfoRow label="Payment Method" value={paymentMethodDisplay()} />
              <InfoRow
                label="Payment Status"
                value={isPaid ? "Paid" : "Pending"}
                status={isPaid ? "paid" : "pending"}
              />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm   ">
            <h2 className="mb-4 border-b border-gray-200 pb-3 text-xl font-semibold ">
              What's Next?
            </h2>

            <Step
              step="1"
              title="Order Confirmation"
              text="You'll receive an email confirmation shortly"
            />
            <Step
              step="2"
              title="Order Processing"
              text="We're preparing your items for shipment"
            />
            <Step
              step="3"
              title="Shipping Updates"
              text="Tracking details will be shared once shipped"
            />
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm   ">
          <h2 className="mb-4 border-b border-gray-200 pb-3 text-xl font-semibold ">
            Ordered Items
          </h2>

          <div className="space-y-4">
            {order.orderItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 rounded-lg border border-gray-200 p-3  "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500 ">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500 ">
                    Price: Rs. {item.price} each
                  </p>
                </div>

                <div className="text-right font-semibold">
                  Rs. {item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/"
            className="flex-1 rounded-lg bg-primary-600 py-3 text-center font-medium text-white transition hover:bg-primary-700  "
          >
            Continue Shopping
          </Link>

          <Link
            to="/profile/orders"
            className="flex-1 rounded-lg border border-gray-300 bg-white py-3 text-center font-medium text-gray-900 transition hover:bg-gray-50    "
          >
            View All Orders
          </Link>

          <button
            onClick={() => window.print()}
            className="flex-1 rounded-lg border border-gray-300 bg-white py-3 font-medium text-gray-900 transition hover:bg-gray-50    "
          >
            Print Receipt
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 ">
          <p>Need help? Email support@maclienson.com</p>
          <p className="mt-1">or call +91 8770751559</p>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, bold, status }) => (
  <div className="flex justify-between">
    <span className="text-gray-600 ">{label}</span>
    <span
      className={`${
        bold ? "text-lg font-bold text-gray-900 " : "font-medium text-gray-900 "
      } ${
        status === "paid"
          ? "text-gray-600 "
          : status === "pending"
          ? "text-gray-600 "
          : ""
      }`}
    >
      {value}
    </span>
  </div>
);

const Step = ({ step, title, text }) => (
  <div className="mb-4 flex items-start gap-3">
    <div className="rounded-full bg-primary-100 px-3 py-1 text-primary-700  ">
      {step}
    </div>
    <div>
      <h3 className="font-medium text-gray-900 ">{title}</h3>
      <p className="text-sm text-gray-600 ">{text}</p>
    </div>
  </div>
);

export default OrderConfirmationPage;



