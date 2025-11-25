import React from 'react';

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  tag?: string;
  rating?: number;
  format?: string; // Changed to string to support non-tea formats like 'Gốm', 'Gỗ'
  categoryId?: string; // To link product to a specific category page
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