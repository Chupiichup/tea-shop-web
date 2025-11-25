
import React, { useState } from 'react';
import { X, Truck, QrCode, Smartphone, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { formatPrice } from '../utils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (orderId: string) => void;
  total: number;
}

type PaymentMethod = 'cod' | 'banking' | 'momo';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess, total }) => {
  const [step, setStep] = useState<'info' | 'payment'>('info');
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('cod');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Hồ Chí Minh',
    note: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      const newOrderId = `#CL${Math.floor(Math.random() * 10000)}`;
      onSuccess(newOrderId); // Signal parent to show success page
      setStep('info'); // Reset for next time
    }, 2000);
  };

  const handleClose = () => {
    setStep('info'); // Reset for next time
    onClose();
  };

  // High visibility inputs (Dark bg, White text)
  const inputClass = "w-full px-4 py-3 rounded-xl border border-stone-600 bg-stone-800 focus:border-rust-500 focus:ring-2 focus:ring-rust-500/50 outline-none text-lg font-semibold text-white placeholder:font-normal placeholder:text-stone-500 transition-all";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" onClick={handleClose}></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in-up flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-stone-100 flex justify-between items-center bg-stone-50">
          <h2 className="text-xl font-bold text-stone-900">
            {step === 'info' ? 'Thông tin giao hàng' : 'Thanh toán'}
          </h2>
          <button onClick={handleClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors text-stone-500">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto">
          
          {/* STEP 1: INFORMATION */}
          {step === 'info' && (
            <form onSubmit={handleNextToPayment} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-base font-bold text-stone-800 block">Họ và tên <span className="text-red-500">*</span></label>
                  <input 
                    required 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="Nguyễn Văn A" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base font-bold text-stone-800 block">Số điện thoại <span className="text-red-500">*</span></label>
                  <input 
                    required 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="0912 345 678" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-base font-bold text-stone-800 block">Địa chỉ nhận hàng <span className="text-red-500">*</span></label>
                <input 
                  required 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Số nhà, tên đường, phường/xã" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-base font-bold text-stone-800 block">Tỉnh / Thành phố</label>
                  <select 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={inputClass}
                  >
                    <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Khác">Tỉnh thành khác</option>
                  </select>
                </div>
                <div className="space-y-2">
                   <label className="text-base font-bold text-stone-800 block">Ghi chú (Tùy chọn)</label>
                   <input 
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="VD: Giao giờ hành chính" 
                   />
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <Button type="submit" size="lg" className="px-12 font-bold text-base">Tiếp tục thanh toán</Button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 mb-6">
                 <div className="flex justify-between text-stone-600 mb-2">
                    <span className="font-medium">Tổng tiền hàng:</span>
                    <span className="font-bold text-xl text-stone-900">{formatPrice(total)}</span>
                 </div>
                 <div className="text-xs text-stone-400">Đã bao gồm phí vận chuyển</div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg text-stone-900">Chọn phương thức thanh toán</h3>
                
                {/* Method: COD */}
                <label className={`flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all ${selectedMethod === 'cod' ? 'border-rust-500 bg-rust-50 shadow-md' : 'border-stone-100 hover:border-stone-300'}`}>
                  <input type="radio" name="payment" className="hidden" checked={selectedMethod === 'cod'} onChange={() => setSelectedMethod('cod')} />
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${selectedMethod === 'cod' ? 'border-rust-500' : 'border-stone-300'}`}>
                    {selectedMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-rust-500"></div>}
                  </div>
                  <div className="flex items-center gap-4 flex-1">
                     <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-stone-100 text-green-600 shadow-sm">
                        <Truck size={24} />
                     </div>
                     <div>
                        <div className="font-bold text-stone-900 text-lg">Thanh toán khi nhận hàng (COD)</div>
                        <div className="text-sm text-stone-500">Thanh toán tiền mặt cho shipper khi nhận hàng</div>
                     </div>
                  </div>
                </label>

                {/* Method: Bank Transfer (QR) */}
                <label className={`flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all ${selectedMethod === 'banking' ? 'border-rust-500 bg-rust-50 shadow-md' : 'border-stone-100 hover:border-stone-300'}`}>
                  <input type="radio" name="payment" className="hidden" checked={selectedMethod === 'banking'} onChange={() => setSelectedMethod('banking')} />
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${selectedMethod === 'banking' ? 'border-rust-500' : 'border-stone-300'}`}>
                    {selectedMethod === 'banking' && <div className="w-3 h-3 rounded-full bg-rust-500"></div>}
                  </div>
                  <div className="flex items-center gap-4 flex-1">
                     <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-stone-100 text-blue-600 shadow-sm">
                        <QrCode size={24} />
                     </div>
                     <div>
                        <div className="font-bold text-stone-900 text-lg">Chuyển khoản ngân hàng (VietQR)</div>
                        <div className="text-sm text-stone-500">Quét mã QR, xác nhận tức thì</div>
                     </div>
                  </div>
                </label>
                
                 {/* Method: E-Wallet */}
                 <label className={`flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all ${selectedMethod === 'momo' ? 'border-rust-500 bg-rust-50 shadow-md' : 'border-stone-100 hover:border-stone-300'}`}>
                  <input type="radio" name="payment" className="hidden" checked={selectedMethod === 'momo'} onChange={() => setSelectedMethod('momo')} />
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${selectedMethod === 'momo' ? 'border-rust-500' : 'border-stone-300'}`}>
                    {selectedMethod === 'momo' && <div className="w-3 h-3 rounded-full bg-rust-500"></div>}
                  </div>
                  <div className="flex items-center gap-4 flex-1">
                     <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center border border-pink-200 text-pink-600 shadow-sm">
                        <Smartphone size={24} />
                     </div>
                     <div>
                        <div className="font-bold text-stone-900 text-lg">Ví MoMo / ZaloPay</div>
                        <div className="text-sm text-stone-500">Thanh toán qua ứng dụng ví điện tử</div>
                     </div>
                  </div>
                </label>
              </div>
              
              {/* Conditional Display for Banking */}
              {selectedMethod === 'banking' && (
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 animate-fade-in-up flex gap-6 items-center">
                      <div className="w-28 h-28 bg-white p-2 rounded-lg flex-shrink-0 shadow-sm">
                          {/* Fake QR for demo */}
                          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ChuLeafPaymentDemo" alt="QR" className="w-full h-full" />
                      </div>
                      <div className="text-sm text-stone-700 space-y-1">
                          <p className="font-bold text-lg text-blue-800">Ngân hàng MB Bank</p>
                          <p className="text-base">STK: <span className="font-mono font-bold select-all bg-white px-2 py-0.5 rounded border border-blue-100">0987654321</span></p>
                          <p>Chủ TK: CHULEAF CO</p>
                          <p>Nội dung: <span className="font-bold text-rust-600">CHULEAF {Math.floor(Math.random() * 1000)}</span></p>
                          <p className="text-xs text-stone-500 mt-2 italic">* Hệ thống sẽ tự động cập nhật sau 1-2 phút.</p>
                      </div>
                  </div>
              )}

              <div className="pt-6 flex justify-between items-center border-t border-stone-100 mt-6">
                 <button onClick={() => setStep('info')} className="text-stone-500 hover:text-stone-800 underline text-base font-medium">Quay lại</button>
                 <Button onClick={handlePlaceOrder} disabled={loading} size="lg" className="min-w-[200px] text-base font-bold">
                    {loading ? <Loader2 className="animate-spin" size={24} /> : (selectedMethod === 'cod' ? 'Xác nhận đặt hàng' : 'Tôi đã chuyển khoản')}
                 </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
