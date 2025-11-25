
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './Button';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    topic: 'Tu van',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // SIMULATION: In a real app, this would be an API call (e.g., fetch('/api/contact', ...))
    // or an integration with EmailJS / Formspree.
    setTimeout(() => {
      console.log('Form Data Submitted:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen pt-[80px]">
      {/* Header / Breadcrumb Area */}
      <div className="bg-stone-50 py-12 md:py-20 border-b border-stone-100">
        <div className="container mx-auto px-6 lg:px-12 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-stone-900 mb-4">Liên Hệ</h1>
            <p className="text-stone-500 font-light text-lg">Chúng tôi ở đây để lắng nghe và hỗ trợ bạn.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* LEFT COLUMN: Contact Info & Context */}
            <div className="lg:col-span-4 space-y-10">
                <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-4">Kết nối với ChuLeaf</h2>
                    <p className="text-stone-600 leading-relaxed font-light">
                        Bạn có thắc mắc về cách pha trà? Cần tư vấn chọn quà tặng? Hay đơn giản là muốn chia sẻ câu chuyện trà của riêng mình? Đừng ngần ngại nhắn tin cho chúng tôi.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-rust-50 flex items-center justify-center text-rust-600 flex-shrink-0">
                            <Phone size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wide">Hotline</h3>
                            <p className="text-stone-600 font-light mt-1">1900 123 456</p>
                            <p className="text-xs text-stone-400 mt-1">Thứ 2 - Chủ Nhật: 9:00 - 21:00</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-rust-50 flex items-center justify-center text-rust-600 flex-shrink-0">
                            <Mail size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wide">Email</h3>
                            <p className="text-stone-600 font-light mt-1">cskh@chuleaf.co</p>
                            <p className="text-stone-600 font-light">partners@chuleaf.co</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-rust-50 flex items-center justify-center text-rust-600 flex-shrink-0">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wide">Trà Thất</h3>
                            <p className="text-stone-600 font-light mt-1">123 Đường Cầu Đất, TP. Đà Lạt</p>
                            <p className="text-stone-600 font-light">45 Lý Quốc Sư, Hoàn Kiếm, Hà Nội</p>
                        </div>
                    </div>
                </div>

                <div className="bg-stone-900 text-white p-6 rounded-2xl mt-8">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                        <Clock size={18} className="text-rust-400"/> Thời gian phản hồi
                    </h3>
                    <p className="text-stone-300 text-sm font-light leading-relaxed">
                        Chúng tôi thường phản hồi email trong vòng 24 giờ làm việc. Với các yêu cầu gấp, vui lòng gọi hotline để được hỗ trợ nhanh nhất.
                    </p>
                </div>
            </div>

            {/* RIGHT COLUMN: Form */}
            <div className="lg:col-span-8">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-stone-200/50 border border-stone-100">
                    
                    {isSuccess ? (
                        <div className="text-center py-20 animate-fade-in-up">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-stone-900 mb-4">Tin nhắn đã được gửi!</h2>
                            <p className="text-stone-600 font-light max-w-md mx-auto mb-8">
                                Cảm ơn bạn đã liên hệ với ChuLeaf. Chúng tôi đã nhận được thông tin và sẽ phản hồi bạn sớm nhất có thể.
                            </p>
                            <Button onClick={() => {setIsSuccess(false); setFormData({firstName: '', lastName: '', email: '', topic: 'Tu van', message: ''})}} variant="outline">
                                Gửi tin nhắn khác
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-xl font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4">Gửi tin nhắn cho chúng tôi</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="block text-sm font-medium text-stone-700">Tên *</label>
                                    <input 
                                        type="text" 
                                        id="firstName" 
                                        name="firstName" 
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:border-rust-500 focus:ring-1 focus:ring-rust-500 outline-none transition-all"
                                        placeholder="Nhập tên của bạn"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="block text-sm font-medium text-stone-700">Họ *</label>
                                    <input 
                                        type="text" 
                                        id="lastName" 
                                        name="lastName" 
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:border-rust-500 focus:ring-1 focus:ring-rust-500 outline-none transition-all"
                                        placeholder="Nhập họ"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email *</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:border-rust-500 focus:ring-1 focus:ring-rust-500 outline-none transition-all"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="topic" className="block text-sm font-medium text-stone-700">Chủ đề cần hỗ trợ</label>
                                <div className="relative">
                                    <select 
                                        id="topic" 
                                        name="topic" 
                                        value={formData.topic}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:border-rust-500 focus:ring-1 focus:ring-rust-500 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Tu van">Tư vấn sản phẩm</option>
                                        <option value="Don hang">Tình trạng đơn hàng</option>
                                        <option value="Doi tac">Hợp tác doanh nghiệp (B2B)</option>
                                        <option value="Workshop">Đăng ký Workshop</option>
                                        <option value="Khac">Khác</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-stone-500">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-sm font-medium text-stone-700">Lời nhắn *</label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:bg-white focus:border-rust-500 focus:ring-1 focus:ring-rust-500 outline-none transition-all resize-none"
                                    placeholder="Bạn cần chúng tôi giúp gì..."
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <Button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    className="w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <><Loader2 size={18} className="animate-spin" /> Đang gửi...</>
                                    ) : (
                                        <><Send size={18} /> Gửi tin nhắn</>
                                    )}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
