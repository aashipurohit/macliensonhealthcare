import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { fetchAdminProducts } from '../redux/slices/adminSlice';
import { fetchAllOrders } from '../redux/slices/adminOrderSlice';

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const [analytics, setAnalytics] = useState({
    totals: {
      last7Days: { sales: 0, orders: 0 },
      last30Days: { sales: 0, orders: 0 },
    },
    daily: [],
  });
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [analyticsError, setAnalyticsError] = useState(null);
  const {
    products = [],
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.admin);
  const {
    orders = [],
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setAnalyticsLoading(true);
        setAnalyticsError(null);

        const storedUserInfo = localStorage.getItem('userInfo');
        const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
        const token = userInfo?.token || localStorage.getItem('userToken');

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/analytics/sales`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          }
        );

        setAnalytics(response.data);
      } catch (error) {
        setAnalyticsError(error.response?.data?.message || error.message || 'Failed to load analytics');
      } finally {
        setAnalyticsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (productsLoading || ordersLoading || analyticsLoading) {
    return <div className="p-6">Loading dashboard data...</div>;
  }

  if (productsError || ordersError || analyticsError) {
    return (
      <div className="p-6 text-red-500">
        Error: {productsError?.message || productsError || ordersError?.message || ordersError || analyticsError || 'Failed to load data'}
      </div>
    );
  }

  const totalOrders = orders.length;
  const totalSales = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  const deliveredOrders = orders.filter((order) => order.status === 'Delivered').length;
  const processingOrders = orders.filter((order) => order.status === 'Processing').length;
  const cancelledOrders = orders.filter((order) => order.status === 'Cancelled').length;
  const lowStockProducts = products.filter((product) => {
    const stock = product.countInStock ?? product.stock ?? 0;
    return stock > 0 && stock <= 5;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount || 0);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Total Sales" value={formatCurrency(totalSales)} icon="Rs" />
        <DashboardCard title="Total Orders" value={totalOrders.toLocaleString()} icon="Or" />
        <DashboardCard title="Low Stock Products" value={lowStockProducts.length.toLocaleString()} icon="Ls" />
      </div>

      <div className="mt-8 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales Analytics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DashboardCard
            title="Sales (7d)"
            value={formatCurrency(analytics.totals.last7Days.sales)}
            icon="S7"
            size="compact"
          />
          <DashboardCard
            title="Sales (30d)"
            value={formatCurrency(analytics.totals.last30Days.sales)}
            icon="S30"
            size="compact"
          />
          <DashboardCard
            title="Orders (7d)"
            value={analytics.totals.last7Days.orders.toLocaleString()}
            icon="O7"
            size="compact"
          />
          <DashboardCard
            title="Orders (30d)"
            value={analytics.totals.last30Days.orders.toLocaleString()}
            icon="O30"
            size="compact"
          />
        </div>
      </div>

      <div className="mt-8 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Status Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <DashboardCard
            title="Delivered Orders"
            value={deliveredOrders.toLocaleString()}
            icon="De"
            size="compact"
          />
          <DashboardCard
            title="Processing Orders"
            value={processingOrders.toLocaleString()}
            icon="Pr"
            size="compact"
          />
          <DashboardCard
            title="Cancelled Orders"
            value={cancelledOrders.toLocaleString()}
            icon="Ca"
            size="compact"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Low Stock Alerts</h2>
        {lowStockProducts.length > 0 ? (
          <ul className="space-y-2">
            {lowStockProducts.slice(0, 5).map((product) => (
              <li key={product._id} className="flex justify-between border-b pb-2">
                <span className="text-gray-800">{product.name}</span>
                <span className="font-medium text-red-600">
                  {product.countInStock ?? product.stock ?? 0} left
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No low stock products.</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        {orders.length > 0 ? (
          <OrdersTable orders={orders.slice(0, 5)} />
        ) : (
          <p className="text-gray-500">No orders found</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Products Overview</h2>
        <p className="text-gray-700">
          Total Products: <span className="font-bold">{products.length.toLocaleString()}</span>
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Sales Analytics (Last 30 Days)</h2>
        <div className="w-full h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.daily}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Revenue</th>
                <th className="text-left p-3">Orders</th>
              </tr>
            </thead>
            <tbody>
              {analytics.daily.map((entry) => (
                <tr key={entry.date} className="border-b hover:bg-gray-50">
                  <td className="p-3">{entry.date}</td>
                  <td className="p-3">{formatCurrency(entry.revenue)}</td>
                  <td className="p-3">{entry.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon, size = "default" }) => (
  <div className={`bg-white rounded-lg shadow p-6 flex flex-col justify-between ${size === "compact" ? "min-h-[132px]" : "min-h-[152px]"}`}>
    <span className={`inline-flex items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-500 ${size === "compact" ? "h-9 w-9 text-xs" : "h-10 w-10 text-sm"}`}>
      {icon}
    </span>
    <div>
      <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">{title}</h3>
      <p className={`${size === "compact" ? "text-2xl" : "text-3xl"} font-semibold text-gray-900 break-words leading-tight`}>{value}</p>
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
        {orders.map((order) => (
          <tr key={order._id} className="border-b hover:bg-gray-50">
            <td className="p-3">{order._id?.slice(0, 8)}...</td>
            <td className="p-3">{order.user?.name || 'Guest'}</td>
            <td className="p-3">{order.totalPrice ? `Rs${order.totalPrice}` : 'N/A'}</td>
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
    delivered: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-500 text-white',
    shipped: 'bg-primary-50 text-primary-700',
    default: 'bg-gray-100 text-gray-700',
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


