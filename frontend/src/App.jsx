import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Yprofile from "./pages/Yprofile"; 
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import AboutUs from './pages/AboutUs';
import Career from './pages/Career';
import ContactUs from './pages/ContactUs';
import Certifications from './pages/Certifications';
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import AdminProductDetails from "./components/Admin/AdminProductDetails";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";
import AdminOrderDetails from "./components/Admin/AdminOrderDetails";
import { Provider } from "react-redux";
import store from "./redux/store";
import CartInitializer from "./components/Layout/CartInitializer";
import ProductForm from './components/Admin/ProductForm';
import Policies from "./components/Common/Policies";
import DigDis from "./components/Layout/DigDis";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import ReviewOrderPage from "./pages/ReviewOrderPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import PaymentTerms from "./components/Legal/PaymentTerms";



const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <CartInitializer /> 
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route path="/" index element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/certifications" element={<Certifications />} />   
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="profile" element={<Yprofile/>}/>
            <Route path="collections/:collection" element={<ProductsPage/>} />
            <Route path="product/:id" element={<ProductDetails />} />  
            <Route path="checkout" element={<Checkout/>} /> 
            <Route path="digitaldispensarya" element={<DigDis />}/> 
            <Route path="shipping" element={<ShippingPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="review-order" element={<ReviewOrderPage />} />
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="order/:id" element={<OrderDetailsPage />} />
            <Route path="payment-terms" element={<PaymentTerms />} />
          </Route>

          {/* Admin Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="products/:id" element={<AdminProductDetails />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="orders/:id" element={<AdminOrderDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
