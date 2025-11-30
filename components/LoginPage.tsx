
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { Button } from './Button';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Đăng nhập với Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      
      // Đăng nhập thành công
      window.location.hash = '#account';
    } catch (error: any) {
      // Xử lý lỗi
      let errorMessage = "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "Email này chưa được đăng ký. Vui lòng kiểm tra lại hoặc đăng ký tài khoản mới.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Mật khẩu không đúng. Vui lòng kiểm tra lại.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Email không hợp lệ. Vui lòng kiểm tra lại.";
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = "Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Quá nhiều lần thử đăng nhập sai. Vui lòng thử lại sau vài phút.";
      }
      
      alert(errorMessage);
      console.error("Lỗi đăng nhập:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingReset(true);
    
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSent(true);
    } catch (error: any) {
      let errorMessage = "Đã xảy ra lỗi khi gửi email đặt lại mật khẩu. Vui lòng thử lại.";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "Email này chưa được đăng ký. Vui lòng kiểm tra lại.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Email không hợp lệ. Vui lòng kiểm tra lại.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Quá nhiều yêu cầu. Vui lòng thử lại sau vài phút.";
      }
      
      alert(errorMessage);
      console.error("Lỗi gửi email reset:", error);
    } finally {
      setIsSendingReset(false);
    }
  };

  const closeForgotPassword = () => {
    setShowForgotPassword(false);
    setResetEmail('');
    setResetSent(false);
  };

  // Shared input styles for consistency
  const inputClasses = "w-full px-5 py-4 rounded-xl bg-stone-900 text-white text-lg border border-stone-700 focus:border-rust-500 focus:ring-1 focus:ring-rust-500 outline-none transition-all placeholder:text-stone-500";
  const modalInputClasses = "w-full px-4 py-3 rounded-lg border border-stone-300 bg-white text-stone-900 text-base focus:border-stone-900 focus:ring-1 focus:ring-stone-900 outline-none transition-all placeholder:text-stone-400";
  const labelClasses = "block text-base font-bold text-stone-800 mb-2";

  return (
    <div className="bg-white min-h-screen pt-[80px]">
      {/* 1. Hero Banner with Logo Overlay (T2 Style) */}
      <div className="relative w-full h-[300px] md:h-[350px] bg-stone-900 overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1555529733-0e670560f7e1?q=80&w=2000&auto=format&fit=crop" 
          alt="Tea Society Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>

        {/* Circular Badge Logo -> Replaced with Brand Logo */}
        <div className="relative z-10 flex flex-col items-center justify-center drop-shadow-xl">
            <div className="w-20 h-20 bg-rust-500 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-lg mb-3 border-4 border-white/20">
                c
            </div>
            <span className="font-bold text-3xl text-white tracking-tight">ChuLeaf Co.</span>
        </div>
      </div>

      {/* 2. Login Form Section */}
      <div className="container mx-auto px-6 lg:px-12 py-16 md:py-20">
        <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">Chào mừng trở lại</h1>
                <p className="text-stone-500 font-light text-lg">Đăng nhập vào tài khoản thành viên ChuLeaf</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-8 bg-white md:p-8 rounded-2xl">
                {/* Email Field */}
                <div className="space-y-1">
                    <label htmlFor="email" className={labelClasses}>
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="email" 
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập địa chỉ email của bạn"
                        className={inputClasses}
                    />
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className={labelClasses}>
                            Mật khẩu <span className="text-red-500">*</span>
                        </label>
                    </div>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu"
                            className={`${inputClasses} pr-12`}
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-white p-2"
                        >
                            {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                        </button>
                    </div>
                </div>

                {/* Actions Row */}
                <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${keepLoggedIn ? 'bg-stone-900 border-stone-900' : 'border-stone-300 bg-white'}`}>
                            {keepLoggedIn && <Check size={16} className="text-white" />}
                        </div>
                        <input 
                            type="checkbox" 
                            className="hidden"
                            checked={keepLoggedIn}
                            onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                        />
                        <span className="text-stone-700 text-base font-medium group-hover:text-stone-900">Duy trì đăng nhập</span>
                    </label>

                    <button 
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-base font-medium text-stone-500 hover:text-stone-900 underline underline-offset-4"
                    >
                        Quên mật khẩu?
                    </button>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <Button 
                        type="submit" 
                        fullWidth 
                        disabled={isLoading}
                        className="bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 text-lg rounded-xl shadow-xl transition-transform active:scale-[0.99]"
                    >
                        {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                    </Button>
                </div>

                {/* Register Link */}
                <div className="text-center pt-6 border-t border-stone-100 mt-8">
                    <p className="text-stone-600 text-lg">
                        Chưa là thành viên? {' '}
                        <a href="#register" className="font-bold text-rust-600 hover:text-rust-700 underline underline-offset-4">
                            Đăng ký ngay
                        </a>
                    </p>
                </div>
            </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={closeForgotPassword}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900"
            >
              <X size={24} />
            </button>

            {!resetSent ? (
              <>
                <h2 className="text-2xl font-bold text-stone-900 mb-2">Quên mật khẩu?</h2>
                <p className="text-stone-600 mb-6">
                  Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn link để đặt lại mật khẩu.
                </p>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label htmlFor="resetEmail" className={labelClasses}>
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="resetEmail"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="Nhập địa chỉ email của bạn"
                      className={modalInputClasses}
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={closeForgotPassword}
                      className="flex-1"
                    >
                      Hủy
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSendingReset}
                      className="flex-1 bg-stone-900 hover:bg-stone-800 text-white"
                    >
                      {isSendingReset ? 'Đang gửi...' : 'Gửi email'}
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-rust-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-rust-600" />
                </div>
                <h2 className="text-2xl font-bold text-stone-900 mb-2">Email đã được gửi!</h2>
                <p className="text-stone-600 mb-4">
                  Chúng tôi đã gửi link đặt lại mật khẩu đến <strong>{resetEmail}</strong>.
                </p>
                <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-stone-700">
                    <strong>💡 Lưu ý:</strong> Nếu không thấy email trong hộp thư đến, vui lòng kiểm tra thư mục <strong>Spam</strong> hoặc <strong>Junk Mail</strong>. Email được gửi từ <strong>ChuLeaf Co.</strong>
                  </p>
                </div>
                <Button
                  onClick={closeForgotPassword}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white"
                >
                  Đóng
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
