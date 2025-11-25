
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, User, Phone, Mail, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Button } from './Button';

interface Workshop {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  duration: string;
  level: string;
}

const WORKSHOPS: Workshop[] = [
  {
    id: 'ws-knowledge',
    title: 'Hành Trình Hương Vị: Khám Phá 6 Loại Trà Việt',
    description: 'Khóa học nhập môn dành cho người mới bắt đầu. Bạn sẽ được tìm hiểu về lịch sử, cách phân biệt Lục trà, Hồng trà, Bạch trà... và trực tiếp nếm thử các phẩm trà thượng hạng.',
    price: '500.000 ₫ / người',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop',
    duration: '2.5 Giờ',
    level: 'Cơ bản'
  },
  {
    id: 'ws-brewing',
    title: 'Nghệ Nhân Pha Chế: Kỹ Thuật Trà Đạo Ứng Dụng',
    description: 'Đi sâu vào kỹ thuật. Học cách kiểm soát nhiệt độ nước, thời gian hãm cho từng loại ấm (Tử sa, Gốm, Sứ). Thực hành pha trà ngon chuẩn vị.',
    price: '850.000 ₫ / người',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop',
    duration: '3.5 Giờ',
    level: 'Nâng cao'
  }
];

// Mock slots for logic
const TIME_SLOTS = [
    { id: 'slot1', time: '09:00 - 11:30', seats: 4 },
    { id: 'slot2', time: '14:00 - 16:30', seats: 6 }
];

export const WorkshopPage: React.FC = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [bookingStep, setBookingStep] = useState<'calendar' | 'info' | 'success'>('calendar');
  
  // Booking State
  const [selectedDate, setSelectedDate] = useState<number | null>(null); // Day of month
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      note: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- Calendar Logic Helper (Mock for current month) ---
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0 = Sun
  
  // Generate calendar grid days
  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) calendarDays.push(null); // Padding
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  // Mock availability: Weekends (Sat/Sun) are available
  const isDateAvailable = (day: number) => {
      const date = new Date(currentYear, currentMonth - 1, day);
      const dayOfWeek = date.getDay();
      return dayOfWeek === 0 || dayOfWeek === 6; // Sun or Sat
  };

  const handleOpenBooking = (ws: Workshop) => {
      setSelectedWorkshop(ws);
      setBookingStep('calendar');
      setSelectedDate(null);
      setSelectedSlot(null);
  };

  const handleDateClick = (day: number) => {
      if (isDateAvailable(day)) {
          setSelectedDate(day);
          setSelectedSlot(null); // Reset slot when date changes
      }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Simulate API
      setTimeout(() => {
          setBookingStep('success');
      }, 1000);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-stone-600 bg-stone-800 focus:border-rust-500 focus:ring-2 focus:ring-rust-500/50 outline-none text-lg font-semibold text-white placeholder:font-normal placeholder:text-stone-500 transition-all";

  return (
    <div className="bg-white min-h-screen pt-[80px]">
        
        {/* Header */}
        <div className="bg-stone-950 text-white py-16 md:py-24 text-center">
            <div className="container mx-auto px-6">
                <span className="text-rust-500 font-bold tracking-widest uppercase text-xs mb-4 block">Tiệc Trà & Workshop</span>
                <h1 className="text-4xl md:text-6xl font-light mb-6">Trải Nghiệm Văn Hóa Trà</h1>
                <p className="text-stone-400 text-lg font-light max-w-2xl mx-auto">
                    Kết nối với chính mình và những người bạn đồng điệu qua những buổi workshop trà đạo ấm cúng tại ChuLeaf.
                </p>
            </div>
        </div>

        {/* Workshop List */}
        <div className="container mx-auto px-6 lg:px-12 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {WORKSHOPS.map(ws => (
                    <div key={ws.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-lg hover:shadow-2xl transition-all duration-500">
                        <div className="relative h-[300px] overflow-hidden">
                            <img src={ws.image} alt={ws.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-stone-900 uppercase tracking-wider">
                                {ws.level}
                            </div>
                        </div>
                        <div className="p-8 flex-1 flex flex-col">
                            <div className="flex items-center gap-4 text-sm text-stone-500 mb-4">
                                <span className="flex items-center gap-1"><Clock size={16}/> {ws.duration}</span>
                                <span className="flex items-center gap-1"><MapPin size={16}/> ChuLeaf Tea House</span>
                            </div>
                            <h3 className="text-2xl font-bold text-stone-900 mb-4 leading-tight group-hover:text-rust-600 transition-colors">
                                {ws.title}
                            </h3>
                            <p className="text-stone-600 font-light mb-8 leading-relaxed flex-grow">
                                {ws.description}
                            </p>
                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-stone-100">
                                <span className="text-xl font-bold text-stone-900">{ws.price}</span>
                                <Button onClick={() => handleOpenBooking(ws)}>Đăng ký ngay</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* BOOKING MODAL WIZARD */}
        {selectedWorkshop && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm" onClick={() => setSelectedWorkshop(null)}></div>
                
                <div className="relative bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-fade-in-up">
                    
                    {/* Modal Header */}
                    <div className="bg-stone-50 px-8 py-6 border-b border-stone-100 flex justify-between items-start">
                        <div>
                            {bookingStep === 'success' ? (
                                <span className="text-green-600 font-bold uppercase text-xs tracking-wider">Hoàn tất</span>
                            ) : (
                                <span className="text-rust-500 font-bold uppercase text-xs tracking-wider">
                                    {bookingStep === 'calendar' ? 'Bước 1/2: Chọn lịch' : 'Bước 2/2: Thông tin'}
                                </span>
                            )}
                            <h3 className="font-bold text-xl text-stone-900 mt-1 line-clamp-1">{selectedWorkshop.title}</h3>
                        </div>
                        <button onClick={() => setSelectedWorkshop(null)} className="text-stone-400 hover:text-stone-900">
                            <ChevronRight className="rotate-90" />
                        </button>
                    </div>

                    {/* Wizard Content */}
                    <div className="p-8 overflow-y-auto">
                        
                        {/* STEP 1: CALENDAR */}
                        {bookingStep === 'calendar' && (
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-stone-900">Tháng {currentMonth}/{currentYear}</h4>
                                        <div className="flex gap-2">
                                            <span className="flex items-center text-xs text-stone-500"><div className="w-3 h-3 rounded-full bg-white border border-stone-300 mr-1"></div> Trống</span>
                                            <span className="flex items-center text-xs text-stone-500"><div className="w-3 h-3 rounded-full bg-rust-500 mr-1"></div> Chọn</span>
                                        </div>
                                    </div>
                                    
                                    {/* Calendar Grid */}
                                    <div className="grid grid-cols-7 gap-2 text-center mb-2">
                                        {['CN','T2','T3','T4','T5','T6','T7'].map(d => <span key={d} className="text-xs font-bold text-stone-400 uppercase">{d}</span>)}
                                    </div>
                                    <div className="grid grid-cols-7 gap-2">
                                        {calendarDays.map((day, idx) => {
                                            if (!day) return <div key={idx}></div>;
                                            const available = isDateAvailable(day);
                                            const isSelected = selectedDate === day;
                                            return (
                                                <button
                                                    key={idx}
                                                    disabled={!available}
                                                    onClick={() => handleDateClick(day)}
                                                    className={`
                                                        h-10 rounded-lg text-sm font-medium transition-all
                                                        ${isSelected 
                                                            ? 'bg-rust-500 text-white shadow-md transform scale-105' 
                                                            : available 
                                                                ? 'bg-stone-100 text-stone-900 hover:bg-rust-100 hover:text-rust-600' 
                                                                : 'bg-white text-stone-300 cursor-not-allowed'
                                                        }
                                                    `}
                                                >
                                                    {day}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Slots Selection */}
                                {selectedDate && (
                                    <div className="animate-fade-in-up">
                                        <h4 className="font-bold text-stone-900 mb-3">Khung giờ ngày {selectedDate}/{currentMonth}</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {TIME_SLOTS.map(slot => (
                                                <button
                                                    key={slot.id}
                                                    onClick={() => setSelectedSlot(slot.time)}
                                                    className={`
                                                        border-2 rounded-xl p-4 text-left transition-all flex justify-between items-center
                                                        ${selectedSlot === slot.time 
                                                            ? 'border-rust-500 bg-rust-50' 
                                                            : 'border-stone-200 hover:border-stone-300'
                                                        }
                                                    `}
                                                >
                                                    <div>
                                                        <div className={`font-bold ${selectedSlot === slot.time ? 'text-rust-700' : 'text-stone-900'}`}>{slot.time}</div>
                                                        <div className="text-xs text-stone-500">Còn {slot.seats} chỗ</div>
                                                    </div>
                                                    {selectedSlot === slot.time && <CheckCircle size={20} className="text-rust-500" />}
                                                </button>
                                            ))}
                                        </div>
                                        
                                        <div className="bg-blue-50 p-4 rounded-xl mt-4 flex gap-3 items-start">
                                            <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-blue-800 leading-relaxed">
                                                Lưu ý: Buổi workshop sẽ bao gồm toàn bộ dụng cụ và nguyên liệu pha chế. Bạn không cần chuẩn bị gì thêm.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 flex justify-end">
                                    <Button disabled={!selectedDate || !selectedSlot} onClick={() => setBookingStep('info')} size="lg" className="w-full sm:w-auto">Tiếp tục</Button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: INFO FORM */}
                        {bookingStep === 'info' && (
                            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
                                <div className="flex gap-2 mb-2 text-sm text-stone-500 bg-stone-50 p-3 rounded-lg">
                                    <Calendar size={16} /> {selectedDate}/{currentMonth}/{currentYear} 
                                    <span className="mx-2">|</span>
                                    <Clock size={16} /> {selectedSlot}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="font-bold text-stone-800 flex items-center gap-2"><User size={16}/> Họ tên</label>
                                        <input required name="name" value={formData.name} onChange={handleInputChange} className={inputClass} placeholder="Nguyễn Văn A" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-bold text-stone-800 flex items-center gap-2"><Phone size={16}/> Số điện thoại</label>
                                        <input required name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass} placeholder="0912 345 678" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-stone-800 flex items-center gap-2"><Mail size={16}/> Email</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass} placeholder="email@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-stone-800">Ghi chú thêm (Dị ứng, yêu cầu...)</label>
                                    <textarea rows={3} name="note" value={formData.note} onChange={handleInputChange} className={inputClass} placeholder="VD: Tôi bị dị ứng phấn hoa..." />
                                </div>

                                <div className="pt-4 flex justify-between items-center gap-4">
                                    <button type="button" onClick={() => setBookingStep('calendar')} className="text-stone-500 font-bold hover:text-stone-900">Quay lại</button>
                                    <Button type="submit" size="lg" className="flex-1 sm:flex-none">Xác nhận đặt lịch</Button>
                                </div>
                            </form>
                        )}

                        {/* STEP 3: SUCCESS */}
                        {bookingStep === 'success' && (
                            <div className="text-center py-12 animate-fade-in-up">
                                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle size={48} />
                                </div>
                                <h2 className="text-3xl font-bold text-stone-900 mb-4">Đăng ký thành công!</h2>
                                <p className="text-stone-600 mb-8 text-lg">
                                    Cảm ơn <strong>{formData.name}</strong>. Chúng tôi đã gửi email xác nhận đến <strong>{formData.email}</strong>.
                                </p>
                                
                                <div className="bg-stone-50 rounded-2xl p-6 max-w-md mx-auto mb-10 text-left space-y-3 border border-stone-200">
                                    <div className="flex justify-between">
                                        <span className="text-stone-500">Workshop:</span>
                                        <span className="font-bold text-stone-900 text-right">{selectedWorkshop.title}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-500">Thời gian:</span>
                                        <span className="font-bold text-stone-900">{selectedSlot}, {selectedDate}/{currentMonth}/{currentYear}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-500">Địa điểm:</span>
                                        <span className="font-bold text-stone-900">ChuLeaf Tea House</span>
                                    </div>
                                </div>

                                <Button onClick={() => setSelectedWorkshop(null)}>Đóng cửa sổ</Button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        )}
    </div>
  );
};
