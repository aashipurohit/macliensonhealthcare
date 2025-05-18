// import React, {useEffect} from 'react'
// import { Link } from 'react-router-dom';
// import { useDispatch , useSelector} from "react-redux";



// const AdminHomePage = () => {
// const dispatch = useDispatch();
// const {
//   products,
//   loading: productsLoading,
//   error: productsError,

// }= useSelector((state) => state.adminProducts);
// const {
//   orders,
//   totalOrders,
//   totalSales,
//   loading: ordersLoading,
//   error: ordersError,
// } = useSelector((state) => state.adminOrders);

// useEffect(() => {
//   dispatch(fetchAdminProducts());
//   dispatch(fetchAllOrders());
// }, [dispatch]);

// // const orders = [
// //     {
// //         _id: 123456,
// //         user: {
// //             name: "Shivam Tiwari",
// //         },
// //         totalPrice : 110,
// //         status: "Processing"
// //     },
// // ] 

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 ">Admin Dashboard</h1>

//       {productsLoading || ordersLoading ? (
//         <p>Loading ...</p>
//       ) : productsError ? (
//         <p className="text-red-500" >Error fetching products: {productsError}</p>
//       ) : ordersError ? (
//         <p className="text-red-500" >Error fetching orders: {ordersError}</p>
//       ) : (

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//         <div className="p-4 shadow-md rounded-lg " >
//           <h2 className="text-xl font-semibold" >Revenue</h2>
//             <p className="text-2xl ">₹{totalSales}</p>
//         </div>

//         <div className="p-4 shadow-md rounded-lg " >
//           <h2 className="text-xl font-semibold" >Total Orders</h2>
//             <p className="text-2xl ">{totalOrders}</p>
//             <Link to="/admin/orders" className="text-blue-500 hover:underline"  >
//             Manage Orders
//             </Link>
//         </div>
        
//         <div className="p-4 shadow-md rounded-lg " >
//           <h2 className="text-xl font-semibold" >Total Products</h2>
//             <p className="text-2xl ">100</p>
//             <Link to="/admin/products" className="text-blue-500 hover:underline"  >
//             Manage Products
//             </Link>
//         </div>
//       </div>
//       )}

//       <div  className="mt-6">
//         <h2 className="text-2xl font-bold mb-4" >Recent Orders</h2>
//         <div className="overflow-x-auto" >
//           <table className="min-w-full text-left text-gray-500" >
//             <thead className="bg-gray-100 text-xs uppercase text-gray-700" >
//               <tr>
//                 <th className="py-3 px-4" >Order ID</th>
//                 <th className="py-3 px-4" >User</th>
//                 <th className="py-3 px-4" >Total Price</th>
//                 <th className="py-3 px-4" >Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.length > 0 ? (
//               orders.map((order) => (
//                 <tr key ={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
//                   <td className="p-4">{order._id}</td>
//                   <td className="p-4">{order.user.name}</td>
//                   <td className="p-4">{order.totalPrice}</td>
//                   <td className="p-4">{order.status}</td>
//                 </tr>
//               ))

//               ):(
//                 <tr>
//                   <td colSpan={4} className="p-4 text-center text-gray-500" >
//                     No recent orders found 
//                   </td>
//                 </tr>
//               ) }
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminHomePage


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, fetchAllOrders } from '../redux/slices/adminSlice';

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const { 
    products = [], 
    orders = [], 
    totalOrders = 0, 
    totalSales = 0, 
    loading, 
    error 
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  if (loading) return <div className="p-6">Loading dashboard data...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error.message || 'Failed to load data'}</div>;

  // Formatting functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount || 0);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard 
          title="Total Revenue" 
          value={formatCurrency(totalSales)} 
          icon="💰"
        />
        <DashboardCard 
          title="Total Orders" 
          value={totalOrders.toLocaleString()} 
          icon="📦"
        />
        <DashboardCard 
          title="Total Products" 
          value={products.length.toLocaleString()} 
          icon="🛍️"
        />
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        {orders.length > 0 ? (
          <OrdersTable orders={orders.slice(0, 5)} />
        ) : (
          <p className="text-gray-500">No orders found</p>
        )}
      </div>
    </div>
  );
};

// Helper Components
const DashboardCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center">
    <span className="text-3xl mr-4">{icon}</span>
    <div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const OrdersTable = ({ orders }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left p-3">Order ID</th>
          <th className="text-left p-3">Customer</th>
          <th className="text-left p-3">Amount</th>
          <th className="text-left p-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order._id} className="border-b hover:bg-gray-50">
            <td className="p-3">{order._id?.slice(0, 8)}...</td>
            <td className="p-3">{order.user?.name || 'Guest'}</td>
            <td className="p-3">{order.totalPrice ? `₹${order.totalPrice}` : 'N/A'}</td>
            <td className="p-3">
              <StatusBadge status={order.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StatusBadge = ({ status }) => {
  const statusClasses = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
    default: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${
      statusClasses[status?.toLowerCase()] || statusClasses.default
    }`}>
      {status || 'Unknown'}
    </span>
  );
};

export default AdminHomePage;