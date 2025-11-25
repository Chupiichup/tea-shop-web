
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils';
import { Trash2, Minus, Plus, ArrowLeft, Check, PhoneCall } from 'lucide-react';
import { Button } from './Button';
import { CheckoutModal } from './CheckoutModal';

export const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const shippingCost = cartItems.length > 0 ? 25000 : 0; // Flat rate 25k
  const finalTotal = cartTotal + shippingCost;

  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  const handleCheckoutSuccess = (newOrderId: string) => {
      setIsCheckoutOpen(false);
      setOrderId(newOrderId);
      setIsOrderSuccess(true);
      clearCart();
      window.scrollTo(0, 0);
  };

  // 1. SUCCESS VIEW
  if (isOrderSuccess) {
      return (
          <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 text-center animate-fade-in-up">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100">
                  <Check size={48} strokeWidth={3} />
              </div>
              
              <h1 className="text-4xl font-light text-stone-900 mb-4">Đặt hàng thành công!</h1>
              
              <div className="bg-stone-50 rounded-3xl p-8 mb-8 border border-stone-100 max-w-lg mx-auto shadow-sm">
                  <p className="text-stone-800 font-medium text-lg mb-2">
                      Mã đơn hàng: <span className="text-rust-600 font-bold">{orderId}</span>
                  </p>
                  <p className="text-stone-600 leading-relaxed text-lg font-light">
                      Cảm ơn bạn đã lựa chọn ChuLeaf. Hệ thống đã ghi nhận đơn hàng của bạn. <br/>
                      <strong className="font-medium text-stone-900">Vui lòng để ý điện thoại</strong>, nhân viên của chúng tôi sẽ gọi điện xác nhận trong vòng 30 phút.
                  </p>
              </div>

              {/* Support Section */}
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 mb-10 max-w-lg mx-auto flex items-start gap-4 text-left">
                   <div className="bg-white p-3 rounded-full shadow-sm text-rust-500 flex-shrink-0">
                       <PhoneCall size={24} />
                   </div>
                   <div>
                       <h4 className="font-bold text-stone-900 text-base">Cần hỗ trợ đơn hàng?</h4>
                       <p className="text-stone-600 text-sm mb-2 font-light">Nếu bạn muốn thay đổi thông tin hoặc có yêu cầu đặc biệt:</p>
                       <a href="tel:1900123456" className="text-rust-600 font-bold text-xl hover:underline">Hotline: 1900 123 456</a>
                   </div>
              </div>

              <div className="flex justify-center gap-4">
                  <Button onClick={() => { setIsOrderSuccess(false); window.location.hash = '#'; }} size="lg">Tiếp tục mua sắm</Button>
              </div>
          </div>
      );
  }

  // 2. EMPTY CART VIEW
  if (cartItems.length === 0) {
      return (
          <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 text-center">
              <h1 className="text-3xl font-light text-stone-900 mb-6">Giỏ hàng của bạn đang trống</h1>
              <p className="text-stone-500 mb-8 font-light text-lg">Hãy khám phá thêm các sản phẩm trà tuyệt vời của chúng tôi.</p>
              <Button onClick={() => window.location.hash = '#'} variant="primary">Quay lại cửa hàng</Button>
          </div>
      );
  }

  // 3. CART LIST VIEW
  return (
    <div className="bg-white min-h-screen pt-[120px] pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        
        <button onClick={() => window.history.back()} className="flex items-center gap-2 text-stone-500 hover:text-rust-500 mb-8 text-sm font-medium">
            <ArrowLeft size={16} /> Tiếp tục mua sắm
        </button>

        <h1 className="text-3xl md:text-4xl font-light text-stone-900 mb-10">Giỏ hàng của bạn ({cartItems.length} món)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 space-y-8">
             {/* List Header */}
             <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-stone-200 text-sm font-bold text-stone-900 uppercase tracking-wider">
                 <div className="col-span-6">Sản phẩm</div>
                 <div className="col-span-2 text-center">Đơn giá</div>
                 <div className="col-span-2 text-center">Số lượng</div>
                 <div className="col-span-2 text-right">Tổng</div>
             </div>

             <div className="space-y-6">
                 {cartItems.map((item) => {
                     const itemTotal = parseInt(item.price.replace(/\./g, '').replace(/\D/g, '')) * item.quantity;
                     return (
                        <div key={item.id} className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center border-b border-stone-100 pb-6">
                             {/* Product Info */}
                             <div className="col-span-6 w-full flex gap-4">
                                 <div className="w-24 h-24 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                 </div>
                                 <div className="flex flex-col justify-between py-1">
                                     <div>
                                        <h3 className="font-medium text-stone-900 text-lg leading-tight">{item.name}</h3>
                                        <p className="text-sm text-stone-500 mt-1">{item.format || 'Tiêu chuẩn'}</p>
                                     </div>
                                     <div className="flex gap-4 mt-2 md:mt-0">
                                         <button 
                                            onClick={() => removeFromCart(item.id)}
                                            className="flex items-center gap-1 text-xs text-stone-400 hover:text-red-500 transition-colors"
                                         >
                                            <Trash2 size={12} /> Xóa
                                         </button>
                                     </div>
                                 </div>
                             </div>

                             {/* Mobile Price Label */}
                             <div className="md:hidden w-full flex justify-between items-center text-sm">
                                 <span className="text-stone-500">Đơn giá:</span>
                                 <span className="font-medium">{item.price}</span>
                             </div>

                             {/* Desktop Price */}
                             <div className="hidden md:block col-span-2 text-center text-stone-600">
                                 {item.price}
                             </div>

                             {/* Quantity */}
                             <div className="col-span-2 w-full flex justify-center">
                                 <div className="flex items-center border border-stone-200 rounded-md">
                                     <button 
                                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                         className="p-2 text-stone-500 hover:text-rust-500 hover:bg-stone-50"
                                     >
                                         <Minus size={16} />
                                     </button>
                                     <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                     <button 
                                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                         className="p-2 text-stone-500 hover:text-rust-500 hover:bg-stone-50"
                                     >
                                         <Plus size={16} />
                                     </button>
                                 </div>
                             </div>

                             {/* Mobile Total Label */}
                             <div className="md:hidden w-full flex justify-between items-center text-lg font-bold border-t border-stone-50 pt-2 mt-2">
                                 <span>Thành tiền:</span>
                                 <span>{formatPrice(itemTotal)}</span>
                             </div>

                             {/* Desktop Total */}
                             <div className="hidden md:block col-span-2 text-right font-bold text-stone-900">
                                 {formatPrice(itemTotal)}
                             </div>
                        </div>
                     )
                 })}
             </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-4">
              <div className="bg-stone-50 p-6 md:p-8 rounded-3xl sticky top-24">
                  <h2 className="text-xl font-bold text-stone-900 mb-6">Tổng đơn hàng</h2>
                  
                  <div className="space-y-4 text-sm text-stone-600 mb-6 border-b border-stone-200 pb-6">
                      <div className="flex justify-between">
                          <span>{cartItems.length} sản phẩm</span>
                          <span className="font-medium text-stone-900">{formatPrice(cartTotal)}</span>
                      </div>
                      <div className="flex justify-between">
                          <span>Phí vận chuyển (Dự kiến)</span>
                          <span className="font-medium text-stone-900">{formatPrice(shippingCost)}</span>
                      </div>
                  </div>

                  <div className="flex justify-between items-end mb-8">
                      <span className="text-lg font-bold text-stone-900">Tổng cộng</span>
                      <span className="text-2xl font-bold text-stone-900">{formatPrice(finalTotal)}</span>
                  </div>

                  <Button fullWidth size="lg" onClick={() => setIsCheckoutOpen(true)}>Thanh toán ngay</Button>
                  
                  <div className="mt-6">
                      <p className="text-xs text-stone-500 text-center underline cursor-pointer hover:text-rust-500">
                          Thêm mã giảm giá
                      </p>
                  </div>
              </div>
          </div>

        </div>
      </div>
      
      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        onSuccess={handleCheckoutSuccess}
        total={finalTotal} 
      />
    </div>
  );
};
