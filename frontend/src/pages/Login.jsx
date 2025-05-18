// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { loginUser } from "../redux/slices/authSlice";
// import { useDispatch } from "react-redux";
// import { Toaster, toast } from "sonner";
// import { useLocation } from "react-router-dom"; 
// import { useSelector } from "react-redux";
// import { useEffect } from "react"; // <-- Missing import
// import { mergeCart } from "../redux/slices/cartSlice"; // <-- Assuming this is the correct path


// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, guestId } = useSelector((state) => state.auth)

//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const { cart } = useSelector((state) => state.cart);

//   //Get redirect parameter and check if it's checkout or something
//   const redirect = new URLSearchParams(location.search).get("redirect") || "/"
//   const isCheckoutRedirect = redirect.includes("checkout");

//   useEffect(() => {
//     if (user) {
//       if (cart?.products.length > 0 && guestId) {
//         dispatch(mergeCart({ guestId, user})).then(() => {
//           navigate(isCheckoutRedirect ? "/checkout" : "/" );
//         });
//       } else {
//         navigate(isCheckoutRedirect ? "/checkout" : "/");
//       }
//     }
//   }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]
// );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//    const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error("Please fix the errors in the form.");
//       return;
//     }

//     try {
//       await dispatch(loginUser(formData)).unwrap();
//       toast.success("Login successful!");
//     } catch (error) {
//       toast.error(error?.message ?? "Login failed");
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       <Toaster position="top-center" richColors />
//       <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
//         <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
//           <div className="flex justify-center mb-6">
//             <h2 className="text-xl font-medium">Macleinson</h2>
//           </div>
//           <h2 className="text-2xl font-bold text-center mb-6">Hey there!</h2>
//           <p className="text-center mb-6">Enter your username and password to login</p>

//           <div className="mb-4">
//             <label className="block text-sm font-semibold mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               autoComplete="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : ""}`}
//               placeholder="Enter your email address"
//             />
//             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-semibold mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               autoComplete="current-password"
//               value={formData.password}
//               onChange={handleChange}
//               className={`w-full p-2 border rounded ${errors.password ? "border-red-500" : ""}`}
//               placeholder="Enter your password"
//             />
//             {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//           </div>

//           <button 
//              type="submit" 
//             className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
//             aria-label="Sign in to your account"
//              >
//             Sign In
//           </button>

//           <p className="mt-6 text-center text-sm">
//             Don't have an account? <br />
//             <Link 
//                to={`/register?redirect=${encodeURIComponent(redirect)}`} 
//                className="text-rose-500"
//                 aria-label="Register a new account"
//                  >
//                 Register
//                </Link>
//           </p>
//         </form>
//       </div>

//       <div className="hidden md:block w-1/2 bg-white">
//         <div className="h-full flex flex-col justify-center items-center p-8">
//           {Boolean(assets.login_2?.trim()) && (
//   <img src={assets.login_2} alt="Login Image"
//   onError={(e) => {
//     e.target.style.display = 'none'; // Hide if image fails to load
//   }} className="max-w-full h-auto object-contain"
//  />
// )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster, toast } from 'sonner';
import { loginUser } from '../redux/slices/authSlice';
import { assets } from '../assets/assets';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';
  const isCheckoutRedirect = redirect.includes('checkout');

  const validateForm = () => {
    const newErrors = {};
    const { email, password } = formData;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await dispatch(loginUser(formData)).unwrap();
      toast.success('Login successful');
      navigate(isCheckoutRedirect ? '/checkout' : redirect);
    } catch (error) {
      toast.error(error?.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-center" richColors />
      
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center mb-8">
            <img 
              src={assets.logo_maclienson_br} 
              alt="Company Logo" 
              className="h-12 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-600 mt-2">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="font-medium text-rose-600 hover:text-rose-500"
            >
              Create one
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="hidden md:block w-1/2 bg-gray-50
      ">
        <div className="h-full flex items-center justify-center p-12">
          <img
            src={assets.login_2}
            alt="Login illustration"
            className="max-w-full h-auto object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;



