import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 text-gray-900 ">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
        <div className="text-gray-500 ">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 text-gray-900 ">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
        <div className="text-red-600">
          {typeof error === "string" ? error : error?.message || "Failed to load orders"}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 text-gray-900 ">
     <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
     <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm  ">
        <table className="min-w-full text-left text-gray-600 ">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700  ">
            <tr>
                <th className="py-2 px-2 sm:py-3" >Image</th>
                <th className="py-2 px-2 sm:py-3" >Order ID</th>
                <th className="py-2 px-2 sm:py-3" >Created</th>
                <th className="py-2 px-2 sm:py-3" >Shipping Address</th>
                <th className="py-2 px-2 sm:py-3" >Items</th>
                <th className="py-2 px-2 sm:py-3" >Price</th>
                <th className="py-2 px-2 sm:py-3" >Status</th>
            </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(order => (
                <tr 
                key={order._id}
                onClick={() => handleRowClick(order._id)}
                className="cursor-pointer border-b border-gray-200 transition hover:bg-gray-50  ">
                    <td className="py-2 px-2 sm:py-4 sm:px-4 ">
                    <img src={order.orderItems[0]?.image} alt={order.orderItems[0]?.name} 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover "
                    />
                    </td>
                    <td className="py-2 px-2 sm:px-4 font-medium text-gray-900  whitespace-nowrap ">#{order._id}
                   </td>
                   <td className="py-2 px-2 sm:px-4 font-medium text-gray-900  whitespace-nowrap ">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}

                   </td>

                   <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.shippingAddress ?
                    `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                    : "N/A"
                }
                </td>
                <td className="py-2 px-2 sm:py-4 sm:px-4">{order.orderItems.length}
                </td>
                <td className="py-2 px-2 sm:py-4 sm:px-4" >
                ₹{order.totalPrice}
                </td>
                <td className="py-2 px-2 sm:py-4 sm:px-4">
                 <span className={`${order.isPaid ? 
                    "bg-gray-100 text-gray-600  " : 
                    "bg-red-100 text-red-700  "
                    }px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                    >{order.isPaid ? "Paid ": "Pending"}
                 </span>
                </td>
                </tr>
            )
          )

          )  :(
            <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500 ">
                    You have no orders
                </td>
            </tr>
          )}
        </tbody>
        </table>

     </div>
    </div>
  )
};

export default MyOrdersPage



