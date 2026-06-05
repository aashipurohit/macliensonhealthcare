import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAdminOrderDetails } from "../../redux/slices/adminOrderSlice";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedOrder, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (id) {
      dispatch(fetchAdminOrderDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div className="p-6">Loading order details...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        {typeof error === "string" ? error : error?.message || "Failed to load order"}
      </div>
    );
  }

  if (!selectedOrder) {
    return <div className="p-6 text-gray-500">Order not found.</div>;
  }

  const order = selectedOrder;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Admin Order Details</h1>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Created At:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : order.paidAt ? new Date(order.paidAt).toLocaleString() : "N/A"}</p>
        <p><strong>Customer:</strong> {order.user?.name || order.user?.email || "N/A"}</p>
        <p><strong>Status:</strong> {order.status || "N/A"}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod || "N/A"}</p>
        <p><strong>Payment Status:</strong> {order.paymentStatus || (order.isPaid ? "Paid" : "Pending")}</p>
        <p><strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}</p>
        <p><strong>Paid At:</strong> {order.paidAt ? new Date(order.paidAt).toLocaleString() : "N/A"}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
        <p>{order.shippingAddress?.address || "N/A"}</p>
        <p>
          {order.shippingAddress
            ? `${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`
            : "N/A"}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Order Items</h2>
        <div className="space-y-3">
          {order.orderItems?.map((item) => (
            <div key={`${item.productId}-${item.name}`} className="border rounded p-3 flex gap-4 items-center">
              <img src={typeof item.image === "string" && item.image.trim() && item.image !== "no-image" ? item.image : "https://via.placeholder.com/64"} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Total Price</h2>
        <p className="text-lg font-bold">₹{order.totalPrice}</p>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
