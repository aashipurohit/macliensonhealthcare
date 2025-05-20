import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import {Toaster} from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Yprofile from "./pages/Yprofile"; 
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import AboutUs from './pages/AboutUs';
import Career from './pages/Career';
import ContactUs from './pages/ContactUs';
import Certifications from './pages/Certifications';
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";
//import ProductDetails from "../components/Products/ProductDetails";
//import ProtectedRoute from "./components/Common/ProtectedRoute";

import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
      <Provider store={store}>
      <BrowserRouter future={{v7_startTransition: true, v7_relativeSplaPath: true}}>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
           <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/" index element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/certifications" element={<Certifications />} />   
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<ContactUs />} />

            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="profile" element={<Yprofile/>}/>
            <Route path="collections/:collection" element={<ProductsPage/>} />
            <Route path="product/:id" element={<ProductDetails />} />  
            <Route path="checkout" element ={ <Checkout/>} /> 
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />   
            </Route>

            {/*Admin Layout */}
          <Route path="/admin" 
           element ={
          //  <ProtectedRoute role="admin">
          <AdminLayout />
          // </ProtectedRoute>
            } >
          <Route index element= {<AdminHomePage />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/:id/edit" element={<EditProductPage />} />
          <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
   
  );
}

export default App