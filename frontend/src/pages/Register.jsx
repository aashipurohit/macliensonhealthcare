import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { Toaster, toast } from "sonner";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
//import { mergeCart } from "../redux/slices/cartSlice"; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId } = useSelector((state) => state.auth);
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
    }
  }, [user, guestId, navigate, isCheckoutRedirect]);

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
      const { name, email, password, confirmPassword } = formData;
      dispatch(registerUser({ name, email, password, confirmPassword }))
        .unwrap()
        .then(() => {
          toast.success("Registration successful!");
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        })
        .catch((err) => {
          toast.error(err?.message || "Registration failed");
        });
    } else {
      toast.error("Please fix the errors in the form");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      <Toaster position="top-center" richColors />
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm  ">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium text-gray-900 ">Macleinson</h2>
          </div>
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 ">Create an account</h2>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold text-gray-700 ">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded border bg-white p-2 text-gray-900   ${errors.name ? "border-red-500 " : "border-gray-300 "}`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold text-gray-700 ">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded border bg-white p-2 text-gray-900   ${errors.email ? "border-red-500 " : "border-gray-300 "}`}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold text-gray-700 ">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full rounded border bg-white p-2 text-gray-900   ${errors.password ? "border-red-500 " : "border-gray-300 "}`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700 ">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full rounded border bg-white p-2 text-gray-900   ${errors.confirmPassword ? "border-red-500 " : "border-gray-300 "}`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary-600 p-2 font-semibold text-white transition hover:bg-primary-700  "
          >
            Create Account
          </button>

          <p className="mt-6 text-center text-sm text-gray-600 ">
            Already have an account?
            <Link to="/login" className="ml-1 text-primary-600 ">
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden w-1/2 bg-white  md:block">
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


