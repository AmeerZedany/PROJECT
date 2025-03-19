import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'GIFT-001',
    name: 'Premium Ceramic Mug',
    description: 'High-quality ceramic mug perfect for custom designs and logos',
    basePrice: 45.99,
    colors: ['white', 'black', 'navy'],
    imageUrl: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&q=80&w=800',
    category: 'mugs',
    inventory: 500
  },
  {
    id: 'GIFT-002',
    name: 'Travel Tumbler',
    description: 'Double-walled stainless steel tumbler for hot and cold drinks',
    basePrice: 89.99,
    colors: ['black', 'white', 'navy'],
    imageUrl: 'https://images.unsplash.com/photo-1578766415570-db37e724c6d5?auto=format&fit=crop&q=80&w=800',
    category: 'travel',
    inventory: 300
  },
  {
    id: 'GIFT-003',
    name: 'Desk Organizer Set',
    description: 'Elegant desk organizer set with pen holder and accessories tray',
    basePrice: 109.99,
    colors: ['black', 'white', 'natural'],
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800',
    category: 'office',
    inventory: 200
  },
  {
    id: 'GIFT-004',
    name: 'Insulated Water Bottle',
    description: 'Premium insulated water bottle keeps drinks cold for 24 hours',
    basePrice: 69.99,
    colors: ['black', 'white', 'navy'],
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800',
    category: 'travel',
    inventory: 400
  },
  {
    id: 'GIFT-005',
    name: 'Decorative Candle Set',
    description: 'Set of 3 scented candles in elegant glass containers',
    basePrice: 129.99,
    colors: ['white', 'black', 'natural'],
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800',
    category: 'home',
    inventory: 150
  },
  {
    id: 'GIFT-006',
    name: 'Holiday Ornament Set',
    description: 'Set of 6 customizable holiday ornaments',
    basePrice: 79.99,
    colors: ['white', 'navy', 'natural'],
    imageUrl: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?auto=format&fit=crop&q=80&w=800',
    category: 'seasonal',
    inventory: 250
  },
  {
    id: 'GIFT-007',
    name: 'Mousepad with Wrist Rest',
    description: 'Ergonomic mousepad with memory foam wrist support',
    basePrice: 59.99,
    colors: ['black', 'gray', 'navy'],
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800',
    category: 'office',
    inventory: 350
  },
  {
    id: 'GIFT-008',
    name: 'Photo Frame Set',
    description: 'Set of 3 elegant photo frames in different sizes',
    basePrice: 149.99,
    colors: ['white', 'black', 'natural'],
    imageUrl: 'https://images.unsplash.com/photo-1581612129334-551ccd069e63?auto=format&fit=crop&q=80&w=800',
    category: 'home',
    inventory: 180
  }
];