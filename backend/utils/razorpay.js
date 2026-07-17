const Razorpay = require('razorpay');
const crypto = require('crypto');

/**
 * Initialize Razorpay instance.
 * Throws if keys are missing.
 */
const initializeRazorpay = () => {
  const key_id = process.env.Razorpay_API_KEY;
  const key_secret = process.env.Razorpay_API_SECRET;

  if (!key_id || !key_secret) {
    throw new Error(
      'Razorpay credentials not configured. Set Razorpay_API_KEY and Razorpay_API_SECRET in .env'
    );
  }

  return new Razorpay({ key_id, key_secret });
};

/**
 * Verify Razorpay HMAC signature.
 * Returns true if valid.
 */
const verifySignature = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  const key_secret = process.env.Razorpay_API_SECRET;
  if (!key_secret) throw new Error('Razorpay_API_SECRET not configured.');

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected = crypto
    .createHmac('sha256', key_secret)
    .update(body)
    .digest('hex');

  return expected === razorpay_signature;
};

/**
 * Create a Razorpay order.
 * @param {number} amount   - Amount in paise (₹ × 100)
 * @param {string} currency - Default 'INR'
 * @param {string} receipt  - Unique receipt string
 * @param {object} notes    - Optional metadata
 */
const createRazorpayOrder = async (amount, currency = 'INR', receipt, notes = {}) => {
  const razorpay = initializeRazorpay();
  return await razorpay.orders.create({
    amount,
    currency,
    receipt,
    notes,
    payment_capture: 1,
  });
};

/**
 * FIX (VULN-004): Fetch payment from Razorpay API and validate amount + status.
 *
 * @param {string} paymentId         - razorpay_payment_id from client
 * @param {number} expectedAmountPaise - amount we calculated server-side (in paise)
 * @returns {object} payment details from Razorpay
 * @throws if amount mismatches or payment is not captured
 */
const validatePaymentAmount = async (paymentId, expectedAmountPaise) => {
  const razorpay = initializeRazorpay();
  const payment = await razorpay.payments.fetch(paymentId);

  if (payment.status !== 'captured') {
    throw new Error(`Payment not captured. Status: ${payment.status}`);
  }

  if (payment.amount !== expectedAmountPaise) {
    throw new Error(
      `Payment amount mismatch. Expected: ${expectedAmountPaise} paise, Got: ${payment.amount} paise`
    );
  }

  if (payment.currency !== 'INR') {
    throw new Error(`Unexpected currency: ${payment.currency}`);
  }

  return payment; // safe to use — verified server-to-server
};

/**
 * Fetch raw payment details (without validation).
 * Use validatePaymentAmount for security-critical flows.
 */
const getPaymentDetails = async (paymentId) => {
  const razorpay = initializeRazorpay();
  return await razorpay.payments.fetch(paymentId);
};

/**
 * Refund a payment.
 * @param {string} paymentId - Razorpay payment ID
 * @param {number} amount    - Amount in paise
 * @param {object} notes     - Optional notes
 */
const refundPayment = async (paymentId, amount, notes = {}) => {
  const razorpay = initializeRazorpay();
  return await razorpay.payments.refund(paymentId, { amount, notes });
};

module.exports = {
  initializeRazorpay,
  verifySignature,
  createRazorpayOrder,
  validatePaymentAmount,
  getPaymentDetails,
  refundPayment,
};