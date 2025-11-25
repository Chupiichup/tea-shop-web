
import React from 'react';
import { Product } from '../types';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent navigation if parent is clickable
      addToCart(product);
  };

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-stone-200/50 border border-stone-100">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {product.tag && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-bold uppercase px-3 py-1.5 rounded-full tracking-wider shadow-sm z-10">
            {product.tag}
          </div>
        )}

        {/* Action Button - Appears on Hover */}
        <div className="absolute bottom-4 right-4 z-20 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button 
                onClick={handleAddToCart}
                className="bg-rust-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-rust-600 transition-colors"
                aria-label="Add to cart"
            >
                <ShoppingBag size={20} />
            </button>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-2">
            <h3 className="text-stone-800 font-medium text-lg group-hover:text-rust-600 transition-colors">
            {product.name}
            </h3>
        </div>
        
        <div className="flex items-center gap-1 mb-3">
            {[1,2,3,4,5].map((s) => (
                <Star key={s} size={12} className="text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-xs text-stone-400 ml-1">(24)</span>
        </div>

        <p className="text-stone-600 font-bold mt-auto">{product.price}</p>
      </div>
    </div>
  );
};
