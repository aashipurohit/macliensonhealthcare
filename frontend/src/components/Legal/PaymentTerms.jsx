// components/Legal/PaymentTerms.js
import React from 'react';

const PaymentTerms = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Payment Terms & Conditions</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Payment Security</h2>
          <p className="text-gray-700">
            All transactions on our website are secured with 256-bit SSL encryption. 
            We do not store your credit card details on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Razorpay Integration</h2>
          <p className="text-gray-700">
            We use Razorpay, a PCI DSS compliant payment gateway, for processing payments.
            Razorpay is certified for compliance with the highest level of PCI DSS.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Refund Policy</h2>
          <p className="text-gray-700">
            Refunds for online payments will be processed within 7-10 business days.
            The amount will be credited back to the original payment method.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Privacy Policy</h2>
          <p className="text-gray-700">
            We collect only necessary information for order processing and do not 
            share your payment details with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Contact Information</h2>
          <p className="text-gray-700">
            For payment-related queries, contact: payments@yourstore.com
            <br />
            Phone: +91-XXXXXX-XXXX (Mon-Sat, 10AM-6PM)
          </p>
        </section>
      </div>
    </div>
  );
};

export default PaymentTerms;