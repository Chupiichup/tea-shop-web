import React from 'react';

export interface ProductSize {
  id: string;
  name: string;
  weight: string;
  price: string;
  image?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  color?: string;
  price: string;
  image?: string;
}

export interface BrewingGuide {
  quantity: string;
  temperature: string;
  time: string;
  hot?: string; // Instructions for hot tea
  iced?: string; // Instructions for iced tea
}

export interface ProductReview {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  imageHover?: string; // Second image that shows on hover (optional)
  images?: string[]; // Array of images for product detail gallery
  tag?: string;
  rating?: number;
  format?: string; // Changed to string to support non-tea formats like 'Gốm', 'Gỗ'
  categoryId?: string; // DEPRECATED: Use categoryIds instead. Kept for backward compatibility
  categoryIds?: string[]; // Array of category IDs - allows product to belong to multiple categories
  sku?: string; // Product SKU/item number
  sizes?: ProductSize[]; // Size options for tea products
  variants?: ProductVariant[]; // Color/variant options for teaware products
  ingredients?: string; // Ingredients list
  brewingGuide?: BrewingGuide; // Brewing instructions
  material?: string; // Material information (for teaware)
  capacity?: string; // Capacity information (for teaware)
  reviews?: ProductReview[]; // Product reviews
  description?: string; // Full product description
}

export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface CategoryDetail {
  id: string;
  title: string;
  description: string;
  breadcrumb: string;
  parent?: {
    label: string;
    href: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Article {
  id: string;
  categoryId: 'cach-pha-tra' | 'chuyen-tra';
  title: string;
  excerpt: string;
  content: React.ReactNode; // simplified for rich text rendering
  image: string;
  date: string;
  author: string;
}

// --- CART TYPES ---
export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isMiniCartOpen: boolean;
  openMiniCart: () => void;
  closeMiniCart: () => void;
  cartTotal: number;
  cartCount: number;
}