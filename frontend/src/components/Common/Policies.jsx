import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Policies = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Policies & Information
      </h1>

      {/* Terms and Conditions */}
      <section id="terms" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-rose-500 mb-3">Terms & Conditions</h2>
        <p className="text-gray-600 leading-relaxed">
          These Terms and Conditions govern your use of Maclienson Healthcare products
          and website. By accessing the platform, you agree to abide by all rules,
          payment guidelines, product usage policies, and user responsibilities.
        </p>
      </section>

      {/* Shipping and Delivery */}
      <section id="shipping" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-rose-500 mb-3">Shipping & Delivery</h2>
        <p className="text-gray-600 leading-relaxed">
          We provide fast and reliable shipping across India. Orders are usually
          dispatched within 24–48 hours. Delivery time depends on location, usually
          between 3–7 business days. Tracking information is sent once the order is shipped.
        </p>
      </section>

      {/* Privacy Policy */}
      <section id="privacy" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-rose-500 mb-3">Privacy Policy</h2>
        <p className="text-gray-600 leading-relaxed">
          Your privacy matters to us. We collect only essential information required for 
          processing orders, improving user experience, and providing customer support. 
          We never sell or share your data with third parties.
        </p>
      </section>

      {/* How to Order */}
      <section id="howtoorder" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-rose-500 mb-3">How to Order</h2>
        <p className="text-gray-600 leading-relaxed">
          Ordering is simple: Browse products → Add to Cart → Proceed to Checkout →
          Fill shipping details → Complete payment. You will receive a confirmation
          email and updates as your order is processed and delivered.
        </p>
      </section>
    </div>
  );
};

export default Policies;
