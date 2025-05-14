// import React from "react";
// import {useState} from "react";
// import {Link } from "react-router-dom";
// import {assets } from "../assets/assets";

// const Register = () => {
//     const [name,setName] = useState("");
//     const [email,setEmail] = useState("");
//     const [password,setPassword] = useState("");

//     const handleSubmit =(e) => {
//       e.preventDefault();
//       console.log("User Registered:",{name,email,password});  
//     };
//   return( 
//     <div className="flex">
//       <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
//        <form 
//        onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
//         <div className="flex justify-center mb-6">
//          <h2 className="text-xl font-medium">Macleinson</h2>
//         </div>
//         <h2 className="text-2xl font-bold text-center mb-6 ">Hey there!  </h2>
//        <p className="text-center mb-6 ">
//         Enter your username and password to login
//        </p>
//        <div className="mb-4">
//         <label className="block text-sm font-semibold mb-2 ">
//             Name
//         </label>
//         <input 
//         type="text"
//          value={name} 
//          onChange={(e) => setName(e.target.value)}
//          className="w-full p-2 border rounded"
//          placeholder="Enter your Name"
//           />
//           </div>


//        <div className="mb-4">
//         <label className="block text-sm font-semibold mb-2 ">
//             Email
//         </label>
//         <input 
//         type="email"
//          value={email} 
//          onChange={(e) => setEmail(e.target.value)}
//          className="w-full p-2 border rounded"
//          placeholder="Enter your email address"
//           />
          
//           <div  className="mb-4">
//         <label className="block text-sm font-semibold mb-2 ">
//             Password
//         </label>
//         <input 
//         type="password"
//          value={password} 
//          onChange={(e) => setPassword(e.target.value)}
//          className="w-full p-2 border rounded"
//          placeholder="Enter your password"
//           />
//           </div>
//            <button type="submit" className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition">
//             Sign Up 
//            </button>
//            <p className="mt-6 text-center text-sm  ">
//             Don't have an account ?<br />
//             <Link to="/login" className="text-blue-500">
//             Login
//             </Link>
//            </p>
//        </div>
//        </form>
//       </div>
//       <div className="hidden md:block w-1/2 bg-white">
//       <div className="h-full flex flex-col justify-center items-center">
//         <img src={assets.register_img} 
//         alt="Register Image"
        
//         />

//       </div>

//       </div>
//     </div>
//   )
 
// }

// export default Register;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Toaster, toast } from "sonner";
import {registerUser } from "../redux/slices/authSlice";
 import { useDispatch} from "react-redux";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch= useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email is invalid";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
      
        if (validateForm()) {
            const {name, email, password, confirmPassword} = formData;
             dispatch(registerUser({ name, email , password, confirmPassword }));
            toast.success("Registration successful!");
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } else {
            toast.error("Please fix the errors in the form");
        }
    };

    return (
        <div className="flex min-h-screen">
            <Toaster position="top-center" richColors />
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
                    <div className="flex justify-center mb-6">
                        <h2 className="text-xl font-medium">Macleinson</h2>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6">Create an account</h2>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : ""}`}
                            placeholder="Enter your full name"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : ""}`}
                            placeholder="Enter your email address"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.password ? "border-red-500" : ""}`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.confirmPassword ? "border-red-500" : ""}`}
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
                    >
                        Create Account
                    </button>
                    
                    <p className="mt-6 text-center text-sm">
                        Already have an account?
                        <Link to="/login" className="text-blue-500 ml-1">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
            
            <div className="hidden md:block w-1/2 bg-white">
                <div className="h-full flex flex-col justify-center items-center">
                    <img
                        src={assets.register_img}
                        alt="Registration"
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;