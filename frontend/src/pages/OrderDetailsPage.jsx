import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-gray-600 ">
        Loading order details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-red-600">
        {typeof error === "string" ? error : error?.message || "Failed to load order"}
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-gray-500 ">
        Order not found.
      </div>
    );
  }

  const order = orderDetails;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6 text-gray-900 ">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm  ">
        <h1 className="mb-2 text-2xl font-bold">Order Details</h1>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Purchase Time:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}</p>
        <p><strong>Status:</strong> {order.status || "N/A"}</p>
        <p><strong>Payment Status:</strong> {order.paymentStatus || (order.isPaid ? "Paid" : "Pending")}</p>
        <p><strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}</p>
        <p><strong>Paid At:</strong> {order.paidAt ? new Date(order.paidAt).toLocaleString() : "N/A"}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod || "N/A"}</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm  ">
        <h2 className="mb-2 text-xl font-semibold">Shipping Address</h2>
        <p>{order.shippingAddress?.address || "N/A"}</p>
        <p>
          {order.shippingAddress
            ? `${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`
            : "N/A"}
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm  ">
        <h2 className="mb-2 text-xl font-semibold">Items</h2>
        <div className="space-y-3">
          {order.orderItems?.map((item) => (
            <div
              key={`${item.productId}-${item.name}`}
              className="flex items-center gap-4 rounded-lg border border-gray-200 p-3  "
            >
              <img
                src={typeof item.image === "string" && item.image.trim() && item.image !== "no-image" ? item.image : "https://via.placeholder.com/64"}
                alt={item.name}
                className="h-16 w-16 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600 ">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600 ">Price: Rs. {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm  ">
        <h2 className="mb-2 text-xl font-semibold">Total</h2>
        <p className="text-lg font-bold">Rs. {order.totalPrice}</p>
      </div>
    </div>
  );
};

export default OrderDetailsPage;


