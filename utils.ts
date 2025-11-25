
export const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0;
  // Remove non-numeric characters except for potential decimal points if used differently, 
  // but for "125.000 ₫" we just want the digits.
  return parseInt(priceStr.replace(/\./g, '').replace(/\D/g, ''), 10);
};

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};
