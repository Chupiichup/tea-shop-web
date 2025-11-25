
import React, { useMemo } from 'react';
import { X, Check, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './Button';
import { ALL_PRODUCTS } from '../constants';
import { formatPrice } from '../utils';

export const MiniCart: React.FC = () => {
  const { isMiniCartOpen, closeMiniCart, cartItems, updateQuantity, removeFromCart, cartTotal, addToCart } = useCart();

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeMiniCart();
    }
  };

  const handleCheckout = () => {
      window.location.hash = '#gio-hang';
      closeMiniCart();
  };

  // Upsell: Recommend 2 random products NOT in the cart
  const upsellProducts = useMemo(() => {
     const inCartIds = cartItems.map(i => i.id);
     const available = ALL_PRODUCTS.filter(p => !inCartIds.includes(p.id));
     // Shuffle and take 2
     return available.sort(() => 0.5 - Math.random()).slice(0, 2);
  }, [cartItems]);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isMiniCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={handleOverlayClick}
      />

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isMiniCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
                <div className="flex items-center gap-2 text-green-700 font-medium">
                    <Check size={18} className="bg-green-100 rounded-full p-0.5" />
                    <span>Đã thêm vào giỏ hàng</span>
                </div>
                <button onClick={closeMiniCart} className="text-stone-400 hover:text-stone-900 transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                    <div className="text-center py-10 text-stone-500">
                        Giỏ hàng của bạn đang trống
                    </div>
                ) : (
                    cartItems.map(item => (
                        <div key={item.id} className="flex gap-4">
                             <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                             </div>
                             <div className="flex-1">
                                 <div className="flex justify-between items-start mb-1">
                                     <h4 className="text-stone-900 font-medium text-sm pr-2 line-clamp-2">{item.name}</h4>
                                     <p className="text-stone-900 font-bold text-sm whitespace-nowrap">{item.price}</p>
                                 </div>
                                 <p className="text-xs text-stone-500 mb-3">{item.format || 'Tiêu chuẩn'}</p>
                                 
                                 <div className="flex items-center justify-between">
                                    <div className="flex items-center border border-stone-200 rounded-md">
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-2 py-1 text-stone-500 hover:text-rust-500 hover:bg-stone-50"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-2 py-1 text-stone-500 hover:text-rust-500 hover:bg-stone-50"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-xs text-stone-400 hover:text-red-500 underline"
                                    >
                                        Xóa
                                    </button>
                                 </div>
                             </div>
                        </div>
                    ))
                )}

                {/* Upsell Section (You May Also Like) */}
                {cartItems.length > 0 && upsellProducts.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-stone-100">
                        <h3 className="text-sm font-bold text-stone-900 mb-4">Có thể bạn sẽ thích</h3>
                        <div className="space-y-4">
                            {upsellProducts.map(product => (
                                <div key={product.id} className="flex gap-3 items-center group">
                                    <div className="w-16 h-16 bg-stone-100 rounded-md overflow-hidden flex-shrink-0">
                                         <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-stone-900 font-medium text-xs truncate">{product.name}</h4>
                                        <p className="text-stone-500 text-xs">{product.price}</p>
                                    </div>
                                    <button 
                                        onClick={() => addToCart(product)}
                                        className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-rust-500 hover:border-rust-500 hover:text-white transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-stone-100 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-stone-600 font-medium">Tạm tính ({cartItems.length} món)</span>
                    <span className="text-xl font-bold text-stone-900">{formatPrice(cartTotal)}</span>
                </div>
                <div className="space-y-3">
                    <Button fullWidth onClick={handleCheckout}>Xem giỏ hàng & Thanh toán</Button>
                    <Button fullWidth variant="outline" onClick={closeMiniCart}>Tiếp tục mua sắm</Button>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};
