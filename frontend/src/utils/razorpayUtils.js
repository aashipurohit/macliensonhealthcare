// utils/razorpayUtils.js
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const getPaymentMethodIcon = (method) => {
  const icons = {
    card: '💳',
    upi: '📱',
    netbanking: '🏦',
    wallet: '👛',
    cod: '💰',
  };
  return icons[method] || '💳';
};