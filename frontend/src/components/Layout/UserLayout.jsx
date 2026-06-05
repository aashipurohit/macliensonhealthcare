import React, { useEffect } from 'react';
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { useDispatch } from 'react-redux';
import { fetchCart } from '../../redux/slices/cartSlice';

import {Outlet} from "react-router-dom";

const UserLayout = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart()); // fetch cart on layout mount
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900  ">
    {/*Header*/}
    <Header />
    

    {/* Main Content*/ }
<main>
  <Outlet />
</main>

    {/* Footer */ }
    <Footer />
    </div>
  );
};

export default UserLayout;

