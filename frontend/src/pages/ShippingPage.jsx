import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShippingPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "India",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    localStorage.setItem("shippingAddress", JSON.stringify(form));
    navigate("/payment");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>

      <div className="grid grid-cols-1 gap-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            type="text"
            placeholder={key.replace(/([A-Z])/g, " $1")}
            value={form[key]}
            onChange={handleChange}
            className="border p-3 rounded"
          />
        ))}
      </div>

      <button
        onClick={handleContinue}
        className="mt-6 w-full bg-primary-600 text-white py-3 rounded-lg"
      >
        Continue to Payment
      </button>
    </div>
  );
};

export default ShippingPage;

