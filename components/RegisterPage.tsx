
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, ChevronDown, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    password: '',
    marketingConsent: false,
    termsConsent: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsConsent) {
        setError("Vui lòng đồng ý với Điều khoản và Chính sách bảo mật.");
        return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      // Success - user is now logged in
      alert("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
      window.location.hash = '#login';
    } catch (error: any) {
      let errorMessage = "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Email này đã được sử dụng. Vui lòng dùng email khác hoặc đăng nhập.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Email không hợp lệ. Vui lòng kiểm tra lại.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Mật khẩu quá yếu. Vui lòng tạo mật khẩu mạnh hơn (ít nhất 6 ký tự).";
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = "Tính năng đăng ký tạm thời không khả dụng. Vui lòng thử lại sau.";
      }
      setError(errorMessage);
      console.error("Lỗi đăng ký:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Date Options
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const inputClass = "w-full px-4 py-3.5 rounded-lg border border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all placeholder:font-light bg-white text-stone-900";
  const labelClass = "block text-sm font-bold text-stone-800 mb-2";

  return (
    <div className="bg-white min-h-screen pt-[80px] pb-20">
      <div className="container mx-auto px-6 lg:px-12 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
            
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                    Trở thành thành viên ChuLeaf Society
                </h1>
                <p className="text-stone-600 text-lg font-light leading-relaxed">
                    Nhận ngay <span className="font-bold text-rust-600">ưu đãi 10%</span> cho đơn hàng đầu tiên (Online hoặc tại Cửa hàng). 
                    <br/>
                    Khám phá thêm nhiều đặc quyền dành riêng cho hội viên.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="firstName" className={labelClass}>Tên <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Tên của bạn"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className={labelClass}>Họ <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Họ"
                        />
                    </div>
                </div>

                {/* Contact Row */}
                <div className="space-y-6">
                    <div>
                        <label htmlFor="email" className={labelClass}>Email <span className="text-red-500">*</span></label>
                        <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="email@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className={labelClass}>Số điện thoại <span className="text-red-500">*</span></label>
                        <input 
                            type="tel" 
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="0912 345 678"
                        />
                    </div>
                </div>

                {/* Date of Birth */}
                <div>
                    <label className={labelClass}>Ngày sinh</label>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="relative">
                            <select 
                                name="dobDay" 
                                value={formData.dobDay} 
                                onChange={handleChange} 
                                className={`${inputClass} appearance-none cursor-pointer`}
                            >
                                <option value="">Ngày</option>
                                {days.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-500 pointer-events-none" />
                        </div>
                        <div className="relative">
                            <select 
                                name="dobMonth" 
                                value={formData.dobMonth} 
                                onChange={handleChange} 
                                className={`${inputClass} appearance-none cursor-pointer`}
                            >
                                <option value="">Tháng</option>
                                {months.map((m, idx) => <option key={idx} value={idx + 1}>{m}</option>)}
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-500 pointer-events-none" />
                        </div>
                         <div className="relative">
                            <select 
                                name="dobYear" 
                                value={formData.dobYear} 
                                onChange={handleChange} 
                                className={`${inputClass} appearance-none cursor-pointer`}
                            >
                                <option value="">Năm</option>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-500 pointer-events-none" />
                        </div>
                    </div>
                    <p className="text-xs text-stone-500 mt-2 italic">(Để chúng tôi gửi quà sinh nhật cho bạn!)</p>
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className={labelClass}>
                        Tạo mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className={`${inputClass} pr-12`}
                            placeholder="Nhập mật khẩu"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <p className="text-xs text-stone-500 mt-2">
                        Ít nhất 8 ký tự, bao gồm 1 chữ hoa và 1 chữ số.
                    </p>
                </div>

                {/* Checkboxes */}
                <div className="space-y-4 pt-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${formData.marketingConsent ? 'bg-stone-900 border-stone-900' : 'border-stone-300 bg-white'}`}>
                            {formData.marketingConsent && <Check size={14} className="text-white" />}
                        </div>
                        <input 
                            type="checkbox" 
                            name="marketingConsent"
                            className="hidden"
                            checked={formData.marketingConsent}
                            onChange={handleChange}
                        />
                        <span className="text-stone-600 text-sm leading-snug group-hover:text-stone-900">
                            Có! Đăng ký nhận thông tin từ ChuLeaf Society bao gồm mã giảm giá, quyền truy cập sớm sự kiện VIP và xem trước sản phẩm mới.
                        </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${formData.termsConsent ? 'bg-rust-600 border-rust-600' : 'border-stone-300 bg-white'}`}>
                            {formData.termsConsent && <Check size={14} className="text-white" />}
                        </div>
                        <input 
                            type="checkbox" 
                            name="termsConsent"
                            className="hidden"
                            checked={formData.termsConsent}
                            onChange={handleChange}
                            required
                        />
                        <span className="text-stone-600 text-sm leading-snug group-hover:text-stone-900">
                            Tôi đồng ý với <a href="#" className="underline font-bold text-stone-800">Điều khoản & Điều kiện</a> và <a href="#" className="underline font-bold text-stone-800">Chính sách bảo mật</a> của ChuLeaf Co.<span className="text-red-500">*</span>
                        </span>
                    </label>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-red-800 font-medium">{error}</p>
                    </div>
                    <button
                      onClick={() => setError(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <span className="text-lg">×</span>
                    </button>
                  </div>
                )}

                <div className="pt-6">
                    <Button 
                        type="submit" 
                        fullWidth 
                        disabled={isLoading}
                        className="bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 text-base rounded-lg shadow-xl disabled:opacity-50"
                    >
                        {isLoading ? 'Đang tạo tài khoản...' : 'Đăng ký ngay'}
                    </Button>
                </div>

                <div className="text-center pt-2">
                    <p className="text-stone-500 text-sm">
                        Đã là thành viên? {' '}
                        <a href="#login" className="font-bold text-stone-900 hover:text-rust-600 underline">
                            Đăng nhập
                        </a>
                    </p>
                </div>

            </form>
        </div>
      </div>
    </div>
  );
};
