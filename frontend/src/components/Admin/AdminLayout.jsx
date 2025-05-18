import React, { useEffect, useState } from 'react';
import { FaBars } from "react-icons/fa";
import { Outlet } from 'react-router-dom';
import AdminSidebar from "./AdminSidebar";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, setSidebar } from '../../redux/slices/adminSlice';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state) => state.admin);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sync Redux state with screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        dispatch(setSidebar(true));
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  const handleToggle = () => {
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      dispatch(toggleSidebar());
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile Header */}
      <div className="flex md:hidden p-4 bg-gray-800 text-white items-center">
        <button
          onClick={handleToggle}
          className="mr-4 focus:outline-none"
        >
          <FaBars size={20} />
        </button>
        <h1 className="text-xl font-medium">Admin Dashboard</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`
          bg-gray-800 w-64 text-white
          ${isMobileSidebarOpen ? 'fixed z-50 transform translate-x-0' : 'fixed transform -translate-x-full'}
          md:relative md:translate-x-0 md:block
          transition-transform duration-300 ease-in-out
          min-h-screen
        `}
      >
        <AdminSidebar />
      </div>

      {/* Overlay for mobile */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div
        className={`
          flex-grow p-4 md:p-6
          transition-all duration-300
          ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'}
        `}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
