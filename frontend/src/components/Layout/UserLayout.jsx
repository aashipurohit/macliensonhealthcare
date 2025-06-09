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
    <>
    {/*Header*/}
    <Header />
    

    {/* Main Content*/ }
<main>
  <Outlet />
</main>

    {/* Footer */ }
    <Footer />
    </>
  );
};

export default UserLayout;
