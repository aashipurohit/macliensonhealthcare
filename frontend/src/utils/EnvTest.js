// Create a test component to check env variables
// src/utils/EnvTest.js
export const checkEnvVariables = () => {
  console.log('Checking environment variables:');
  console.log('Razorpay_API_KEY:', import.meta.env.Razorpay_API_KEY);
  console.log('VITE_BACKEND_URL:', import.meta.env. VITE_BACKEND_URL);
  return {
    razorpayKey: !!import.meta.env.Razorpay_API_KEY,
    backendUrl: !!import.meta.env. VITE_BACKEND_URL,
  };
};