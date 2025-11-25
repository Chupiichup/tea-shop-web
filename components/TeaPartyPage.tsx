
import React, { useState, useEffect } from 'react';
import { Calendar, Users, Mail, Phone, CheckCircle, Coffee, Star, Flower, Music, MapPin, Clock, Send, Loader2, User } from 'lucide-react';
import { Button } from './Button';

export const TeaPartyPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guestCount: '',
    eventType: 'personal',
    date: '',
    services: {
        teaMaster: false,
        sweets: false,
        workshop: false,
        decor: false
    },
    note: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setFormData(prev => ({
          ...prev,
          services: { ...prev.services, [name]: checked }
      }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
    }, 1500);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-stone-800 border border-stone-600 focus:border-rust-500 focus:ring-2 focus:ring-rust-500/50 outline-none text-lg font-medium text-white placeholder:text-stone-500 transition-all";
  const labelClass = "block text-sm font-bold text-stone-700 mb-2";

  return (
    <div className="bg-white min-h-screen pt-[80px]">
      
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[60vh] min-h-[500px] bg-stone-900 overflow-hidden flex items-center justify-center">
        <img 
            src="https://images.unsplash.com/photo-1529690250154-362033f630a4?q=80&w=2000&auto=format&fit=crop" 
            alt="Tea Party Aesthetics" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-4xl px-6 animate-fade-in-up">
            <span className="text-rust-400 font-bold tracking-[0.2em] uppercase text-sm mb-6 block">Dịch Vụ Sự Kiện Đẳng Cấp</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 leading-tight shadow-sm">
                Nghệ Thuật Tiệc Trà <br/> 
                <span className="text-rust-500">ChuLeaf Co.</span>
            </h1>
            <p className="text-stone-200 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                Mang không gian trà đạo tinh tế, tĩnh tại và sang trọng đến sự kiện của bạn. Một trải nghiệm văn hóa độc bản để kết nối và sẻ chia.
            </p>
            <div className="mt-10">
                <Button onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })} size="lg" className="px-10 py-4 text-lg shadow-xl shadow-rust-500/20">
                    Đặt tiệc ngay
                </Button>
            </div>
        </div>
      </div>

      {/* 2. LOẠI HÌNH TIỆC (AUDIENCE) */}
      <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Không gian trà cho mọi khoảnh khắc</h2>
                  <p className="text-stone-500 font-light">Chúng tôi thiết kế trải nghiệm phù hợp riêng cho từng tính chất sự kiện.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="group p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                          <Star size={28} className="text-rust-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-stone-900 mb-4">Tiệc Cá Nhân</h3>
                      <p className="text-stone-600 font-light leading-relaxed">
                          Sinh nhật, họp mặt gia đình hay những buổi trà chiều thân mật. Tạo nên kỷ niệm ấm cúng và đáng nhớ bên người thân yêu.
                      </p>
                  </div>
                  
                  {/* Card 2 */}
                  <div className="group p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                          <Users size={28} className="text-rust-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-stone-900 mb-4">Tiệc Doanh Nghiệp</h3>
                      <p className="text-stone-600 font-light leading-relaxed">
                          Tiếp khách VIP, hội nghị hay tiệc cuối năm. Nâng tầm hình ảnh doanh nghiệp với sự tinh tế và chuyên nghiệp.
                      </p>
                  </div>

                  {/* Card 3 */}
                  <div className="group p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                          <Flower size={28} className="text-rust-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-stone-900 mb-4">Sự Kiện Văn Hóa</h3>
                      <p className="text-stone-600 font-light leading-relaxed">
                          Triển lãm nghệ thuật, ra mắt sách hay các sự kiện mang tính truyền thống. Điểm nhấn văn hóa độc đáo.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* 3. CHI TIẾT DỊCH VỤ (SERVICES LIST) */}
      <section className="py-20 bg-stone-900 text-white overflow-hidden relative">
          {/* Decor BG */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-rust-900/20 blur-3xl rounded-full"></div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <span className="text-rust-400 font-bold tracking-widest uppercase text-xs mb-4 block">Dịch vụ trọn gói</span>
                      <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                          Sự Tinh Tế Trong <br/> Từng Chi Tiết
                      </h2>
                      <div className="space-y-8">
                          <div className="flex gap-5">
                              <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-rust-400 flex-shrink-0">
                                  <User size={24} />
                              </div>
                              <div>
                                  <h4 className="text-xl font-bold mb-2">Trà Nhân Chuyên Nghiệp</h4>
                                  <p className="text-stone-400 font-light">Đội ngũ nghệ nhân pha trà am hiểu, phục vụ chuẩn mực trà đạo.</p>
                              </div>
                          </div>
                          <div className="flex gap-5">
                              <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-rust-400 flex-shrink-0">
                                  <Coffee size={24} />
                              </div>
                              <div>
                                  <h4 className="text-xl font-bold mb-2">Bộ Sưu Tập Trà Quý</h4>
                                  <p className="text-stone-400 font-light">Những phẩm trà Shan Tuyết cổ thụ, Ô Long thượng hạng được tuyển chọn kỹ lưỡng.</p>
                              </div>
                          </div>
                          <div className="flex gap-5">
                              <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-rust-400 flex-shrink-0">
                                  <Flower size={24} />
                              </div>
                              <div>
                                  <h4 className="text-xl font-bold mb-2">Bánh Ngọt & Trang Trí</h4>
                                  <p className="text-stone-400 font-light">Bánh đậu xanh, Wagashi tinh xảo cùng không gian bày trí hoa và trầm hương.</p>
                              </div>
                          </div>
                          <div className="flex gap-5">
                              <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-rust-400 flex-shrink-0">
                                  <Music size={24} />
                              </div>
                              <div>
                                  <h4 className="text-xl font-bold mb-2">Biểu Diễn & Workshop</h4>
                                  <p className="text-stone-400 font-light">Màn biểu diễn pha trà nghệ thuật hoặc workshop hướng dẫn ngắn cho khách tham dự.</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div className="relative">
                      <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border-4 border-stone-800 shadow-2xl">
                          <img 
                            src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1000&auto=format&fit=crop" 
                            alt="Tea Ceremony" 
                            className="w-full h-full object-cover opacity-90"
                          />
                      </div>
                      {/* Floating Badge */}
                      <div className="absolute bottom-10 -left-6 bg-rust-600 p-6 rounded-2xl shadow-xl text-white max-w-[200px]">
                          <p className="font-serif italic text-2xl font-bold mb-1">"Độc bản"</p>
                          <p className="text-xs opacity-90">Mỗi bữa tiệc là một tác phẩm nghệ thuật riêng biệt.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 4. BOOKING FORM SECTION */}
      <section id="booking-form" className="py-20 lg:py-32 bg-stone-50">
          <div className="container mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                  
                  {/* Sidebar Info */}
                  <div className="lg:col-span-4 space-y-8">
                      <div>
                          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Liên hệ đặt tiệc</h2>
                          <p className="text-stone-600 font-light text-lg leading-relaxed">
                              Để lại thông tin, chuyên viên sự kiện của ChuLeaf sẽ liên hệ tư vấn kịch bản và báo giá chi tiết trong vòng 24h.
                          </p>
                      </div>

                      <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 space-y-6">
                          <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-rust-50 flex items-center justify-center text-rust-600 flex-shrink-0">
                                  <Phone size={20} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-stone-900">Hotline Tư Vấn</h4>
                                  <p className="text-rust-600 font-bold text-xl">0987 654 321</p>
                              </div>
                          </div>
                          <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-rust-50 flex items-center justify-center text-rust-600 flex-shrink-0">
                                  <Mail size={20} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-stone-900">Email Hợp Tác</h4>
                                  <p className="text-stone-600">event@chuleaf.co</p>
                              </div>
                          </div>
                          <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-rust-50 flex items-center justify-center text-rust-600 flex-shrink-0">
                                  <MapPin size={20} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-stone-900">Văn Phòng</h4>
                                  <p className="text-stone-600 text-sm">45 Lý Quốc Sư, Hoàn Kiếm, Hà Nội</p>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Main Form */}
                  <div className="lg:col-span-8">
                      <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-stone-200/50 border border-stone-100">
                          {isSuccess ? (
                              <div className="text-center py-20 animate-fade-in-up">
                                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100">
                                      <CheckCircle size={48} />
                                  </div>
                                  <h2 className="text-3xl font-bold text-stone-900 mb-4">Đăng ký thành công!</h2>
                                  <p className="text-stone-600 font-light text-lg mb-8 max-w-md mx-auto">
                                      Cảm ơn bạn đã quan tâm. ChuLeaf sẽ liên hệ với bạn qua số điện thoại <strong>{formData.phone}</strong> sớm nhất để tư vấn chi tiết.
                                  </p>
                                  <Button onClick={() => setIsSuccess(false)} variant="outline">Gửi yêu cầu khác</Button>
                              </div>
                          ) : (
                              <form onSubmit={handleSubmit} className="space-y-8">
                                  {/* Personal Info */}
                                  <div>
                                      <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-b border-stone-100 pb-4">
                                          <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm">1</span>
                                          Thông tin liên hệ
                                      </h3>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          <div className="space-y-2">
                                              <label className={labelClass}>Họ và Tên</label>
                                              <input required name="name" value={formData.name} onChange={handleInputChange} className={inputClass} placeholder="Nguyễn Văn A" />
                                          </div>
                                          <div className="space-y-2">
                                              <label className={labelClass}>Số điện thoại</label>
                                              <input required name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass} placeholder="0912 345 678" />
                                          </div>
                                          <div className="space-y-2 md:col-span-2">
                                              <label className={labelClass}>Email</label>
                                              <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass} placeholder="email@example.com" />
                                          </div>
                                      </div>
                                  </div>

                                  {/* Event Info */}
                                  <div>
                                      <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-b border-stone-100 pb-4">
                                          <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm">2</span>
                                          Thông tin sự kiện
                                      </h3>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          <div className="space-y-2">
                                              <label className={labelClass}>Loại hình tiệc</label>
                                              <div className="relative">
                                                  <select name="eventType" value={formData.eventType} onChange={handleInputChange} className={`${inputClass} appearance-none cursor-pointer`}>
                                                      <option value="personal">Tiệc Cá Nhân (Sinh nhật, Gia đình)</option>
                                                      <option value="corporate">Tiệc Doanh Nghiệp</option>
                                                      <option value="event">Sự Kiện Văn Hóa / Khác</option>
                                                  </select>
                                                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">▼</div>
                                              </div>
                                          </div>
                                          <div className="space-y-2">
                                              <label className={labelClass}>Số lượng khách (Dự kiến)</label>
                                              <input type="number" name="guestCount" value={formData.guestCount} onChange={handleInputChange} className={inputClass} placeholder="VD: 20" />
                                          </div>
                                          <div className="space-y-2">
                                              <label className={labelClass}>Ngày dự kiến</label>
                                              <input type="date" name="date" value={formData.date} onChange={handleInputChange} className={inputClass} />
                                          </div>
                                      </div>
                                  </div>

                                  {/* Details & Checkboxes */}
                                  <div>
                                      <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-b border-stone-100 pb-4">
                                          <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm">3</span>
                                          Yêu cầu chi tiết
                                      </h3>
                                      
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                          <label className="flex items-center p-4 rounded-xl border border-stone-200 cursor-pointer hover:border-rust-500 hover:bg-rust-50/50 transition-all">
                                              <input type="checkbox" name="teaMaster" checked={formData.services.teaMaster} onChange={handleCheckboxChange} className="w-5 h-5 text-rust-500 rounded focus:ring-rust-500 border-gray-300 mr-3" />
                                              <span className="font-medium text-stone-800">Cần Trà Nhân phục vụ</span>
                                          </label>
                                          <label className="flex items-center p-4 rounded-xl border border-stone-200 cursor-pointer hover:border-rust-500 hover:bg-rust-50/50 transition-all">
                                              <input type="checkbox" name="sweets" checked={formData.services.sweets} onChange={handleCheckboxChange} className="w-5 h-5 text-rust-500 rounded focus:ring-rust-500 border-gray-300 mr-3" />
                                              <span className="font-medium text-stone-800">Bánh ngọt / Teabreak</span>
                                          </label>
                                          <label className="flex items-center p-4 rounded-xl border border-stone-200 cursor-pointer hover:border-rust-500 hover:bg-rust-50/50 transition-all">
                                              <input type="checkbox" name="workshop" checked={formData.services.workshop} onChange={handleCheckboxChange} className="w-5 h-5 text-rust-500 rounded focus:ring-rust-500 border-gray-300 mr-3" />
                                              <span className="font-medium text-stone-800">Workshop / Hướng dẫn</span>
                                          </label>
                                          <label className="flex items-center p-4 rounded-xl border border-stone-200 cursor-pointer hover:border-rust-500 hover:bg-rust-50/50 transition-all">
                                              <input type="checkbox" name="decor" checked={formData.services.decor} onChange={handleCheckboxChange} className="w-5 h-5 text-rust-500 rounded focus:ring-rust-500 border-gray-300 mr-3" />
                                              <span className="font-medium text-stone-800">Trang trí không gian</span>
                                          </label>
                                      </div>

                                      <div className="space-y-2">
                                          <label className={labelClass}>Ghi chú thêm</label>
                                          <textarea rows={4} name="note" value={formData.note} onChange={handleInputChange} className={inputClass} placeholder="Chia sẻ thêm về ý tưởng hoặc yêu cầu đặc biệt của bạn..." />
                                      </div>
                                  </div>

                                  <div className="pt-4">
                                      <Button type="submit" fullWidth size="lg" disabled={isSubmitting} className="text-lg font-bold py-4">
                                          {isSubmitting ? <><Loader2 className="animate-spin mr-2" /> Đang gửi...</> : <><Send className="mr-2" /> Gửi yêu cầu đặt tiệc</>}
                                      </Button>
                                  </div>
                              </form>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};
