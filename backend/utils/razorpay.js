// backend/utils/razorpay.js
const Razorpay = require('razorpay');
const crypto = require('crypto');

/**
 * Initialize Razorpay instance
 * Throws error if API keys are missing
 */
const initializeRazorpay = () => {
  const key_id = process.env.Razorpay_API_KEY;
  const key_secret = process.env.Razorpay_API_SECRET;

  if (!key_id || !key_secret) {
    throw new Error(
      'Razorpay credentials not configured. Please set Razorpay_API_KEY and Razorpay_API_SECRET in your .env file.'
    );
  }

  return new Razorpay({
    key_id,
    key_secret
  });
};

/**
 * Verify Razorpay payment signature
 * Returns true if signature matches
 */
const verifyPayment = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  const key_secret = process.env.Razorpay_API_SECRET;
  if (!key_secret) {
    throw new Error('Razorpay_API_SECRET not configured.');
  }

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', key_secret)
    .update(body.toString())
    .digest('hex');

  return expectedSignature === razorpay_signature;
};

/**
 * Create Razorpay order
 * @param {number} amount - in paise (INR * 100)
 * @param {string} currency - default 'INR'
 * @param {string} receipt - unique receipt ID
 * @param {object} notes - optional metadata
 */
const createRazorpayOrder = async (amount, currency = 'INR', receipt, notes = {}) => {
  const razorpay = initializeRazorpay();

  const options = {
    amount,
    currency,
    receipt,
    notes,
    payment_capture: 1
  };

  return await razorpay.orders.create(options);
};

/**
 * Fetch payment details by payment ID
 */
const getPaymentDetails = async (paymentId) => {
  const razorpay = initializeRazorpay();
  return await razorpay.payments.fetch(paymentId);
};

/**
 * Refund payment
 * @param {string} paymentId - Razorpay payment ID
 * @param {number} amount - amount in paise
 * @param {object} notes - optional notes
 */
const refundPayment = async (paymentId, amount, notes = {}) => {
  const razorpay = initializeRazorpay();
  return await razorpay.payments.refund(paymentId, { amount, notes });
};

module.exports = {
  initializeRazorpay,
  verifyPayment,
  createRazorpayOrder,
  getPaymentDetails,
  refundPayment
};
