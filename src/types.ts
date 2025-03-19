export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  colors: string[];
  imageUrl: string;
  category: 'mugs' | 'office' | 'home' | 'travel' | 'seasonal';
  inventory: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  color: string;
}

// Pricing tiers for bulk discounts
export const PRICING_TIERS = [
  { min: 1, max: 9, discount: 0, label: 'Regular Price' },
  { min: 10, max: 49, discount: 0.10, label: '10% off (10-49 items)' },
  { min: 50, max: 99, discount: 0.20, label: '20% off (50-99 items)' },
  { min: 100, max: 499, discount: 0.30, label: '30% off (100-499 items)' },
  { min: 500, max: Infinity, discount: 0.40, label: '40% off (500+ items)' }
];

export const formatPrice = (price: number): string => {
  return `₪${price.toFixed(2)}`;
};