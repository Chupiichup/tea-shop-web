
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit2, Plus, Eye, EyeOff, Check, X } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';
import { verifyBeforeUpdateEmail } from 'firebase/auth';

export const AccountDetailsPage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailChangeSent, setEmailChangeSent] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const [details, setDetails] = useState({
      firstName: 'Thao',
      lastName: 'Chu',
      email: user?.email || 'chuthao112@gmail.com',
      phone: '0943831155',
      dobDay: '17',
      dobMonth: '10',
      dobYear: '2012'
  });

  // Cập nhật email khi user thay đổi
  useEffect(() => {
    if (user?.email) {
      setDetails(prev => ({ ...prev, email: user.email || prev.email }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      // Nếu đổi email, mở modal thay vì cập nhật trực tiếp
      if (name === 'email' && value !== user?.email) {
        setNewEmail(value);
        setShowEmailModal(true);
      } else {
        setDetails({...details, [name]: value});
      }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Bạn cần đăng nhập để đổi email.');
      return;
    }

    if (!newEmail || newEmail === user.email) {
      setShowEmailModal(false);
      return;
    }

    setIsChangingEmail(true);
    
    try {
      // Gửi email xác nhận đến email mới
      await verifyBeforeUpdateEmail(user, newEmail);
      setEmailChangeSent(true);
      setDetails(prev => ({ ...prev, email: newEmail }));
    } catch (error: any) {
      let errorMessage = "Đã xảy ra lỗi khi đổi email. Vui lòng thử lại.";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Email này đã được sử dụng bởi tài khoản khác. Vui lòng dùng email khác.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Email không hợp lệ. Vui lòng kiểm tra lại.";
      } else if (error.code === 'auth/requires-recent-login') {
        errorMessage = "Vui lòng đăng nhập lại để thực hiện thay đổi này.";
      }
      
      alert(errorMessage);
      console.error("Lỗi đổi email:", error);
    } finally {
      setIsChangingEmail(false);
    }
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
    setNewEmail('');
    setEmailChangeSent(false);
    // Reset về email cũ
    if (user?.email) {
      setDetails(prev => ({ ...prev, email: user.email || prev.email }));
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-md bg-stone-50 border border-stone-200 focus:bg-white focus:border-rust-500 outline-none transition-colors text-stone-900";
  const labelClass = "block text-sm font-medium text-stone-500 mb-1";

  // Date Generators
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="bg-stone-50 min-h-screen pt-[80px]">
        {/* Header Banner */}
        <div className="bg-stone-950 py-12">
            <div className="container mx-auto px-6 lg:px-12">
                <a href="#account" className="inline-flex items-center gap-2 text-stone-400 hover:text-white mb-6 text-sm font-bold transition-colors">
                    <ArrowLeft size={16} /> Back to My Account
                </a>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    My details
                </h1>
                <p className="text-stone-400 font-light mt-2">View and manage your account details.</p>
            </div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 py-12 space-y-8 max-w-4xl">
            
            {/* 1. Personal Details */}
            <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-4">
                    <h2 className="text-2xl font-bold text-stone-900">Personal details</h2>
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-sm font-bold text-stone-900 hover:text-rust-600">
                            Edit <Edit2 size={14} />
                        </button>
                    )}
                </div>

                {isEditing ? (
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>First Name</label>
                                <input type="text" name="firstName" value={details.firstName} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Last Name</label>
                                <input type="text" name="lastName" value={details.lastName} onChange={handleChange} className={inputClass} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className={labelClass}>Email</label>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={details.email} 
                                        onChange={handleChange} 
                                        className={inputClass} 
                                    />
                                    {user?.email && details.email !== user.email && (
                                        <span className="text-xs text-rust-600 font-medium">(Chưa xác nhận)</span>
                                    )}
                                </div>
                                {user?.email && (
                                    <p className="text-xs text-stone-400 mt-1">
                                        Email hiện tại: <strong>{user.email}</strong>
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelClass}>Phone</label>
                                <input type="tel" name="phone" value={details.phone} onChange={handleChange} className={inputClass} />
                            </div>
                        </div>

                         <div>
                            <label className={labelClass}>Date of birth</label>
                            <div className="grid grid-cols-3 gap-4">
                                <select name="dobDay" value={details.dobDay} onChange={handleChange} className={inputClass}>
                                    <option value="">Day</option>
                                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                                <select name="dobMonth" value={details.dobMonth} onChange={handleChange} className={inputClass}>
                                    <option value="">Month</option>
                                    {months.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
                                </select>
                                <select name="dobYear" value={details.dobYear} onChange={handleChange} className={inputClass}>
                                    <option value="">Year</option>
                                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>
                            <p className="text-xs text-stone-400 mt-2">Enter to receive a birthday reward</p>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button onClick={() => setIsEditing(false)}>Save changes</Button>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                            <div>
                                <p className={labelClass}>First Name</p>
                                <p className="font-medium text-stone-900">{details.firstName}</p>
                            </div>
                            <div>
                                <p className={labelClass}>Last Name</p>
                                <p className="font-medium text-stone-900">{details.lastName}</p>
                            </div>
                             <div>
                                <p className={labelClass}>Email</p>
                                <p className="font-medium text-stone-900">{user?.email || details.email}</p>
                            </div>
                            <div>
                                <p className={labelClass}>Phone</p>
                                <p className="font-medium text-stone-900">{details.phone}</p>
                            </div>
                             <div>
                                <p className={labelClass}>Date of birth</p>
                                <p className="font-medium text-stone-900">
                                    {details.dobDay ? details.dobDay : 'Enter to receive a birthday reward'}
                                    {details.dobMonth && `/${details.dobMonth}`}
                                    {details.dobYear && `/${details.dobYear}`}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 2. Address Book */}
            <div className="bg-white rounded-lg shadow-sm p-8">
                 <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-4">
                    <h2 className="text-2xl font-bold text-stone-900">Address book</h2>
                    <button className="flex items-center gap-2 text-sm font-bold text-stone-900 hover:text-rust-600">
                        Add <Plus size={14} />
                    </button>
                </div>
                <div className="text-center py-8">
                     <p className="text-stone-500 mb-2">You have no saved address! Add a new address to get shipping even quicker when you check out.</p>
                </div>
            </div>

            {/* 3. Password */}
            <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4">Password</h2>
                
                <form className="space-y-6 max-w-lg">
                    <div className="relative">
                        <label className={labelClass}>Current password*</label>
                        <input 
                            type={showCurrentPass ? "text" : "password"} 
                            placeholder="Enter your password" 
                            className={inputClass} 
                        />
                         <button type="button" onClick={() => setShowCurrentPass(!showCurrentPass)} className="absolute right-3 top-9 text-stone-400">
                             {showCurrentPass ? <EyeOff size={18} /> : <Eye size={18} />}
                         </button>
                    </div>

                    <div className="relative">
                        <label className={labelClass}>Choose a new password*</label>
                        <input 
                            type={showNewPass ? "text" : "password"} 
                            placeholder="Enter a new password" 
                            className={inputClass} 
                        />
                        <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-3 top-9 text-stone-400">
                             {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                         </button>
                        <p className="text-xs text-stone-400 mt-2">At least 8 characters, including 1 uppercase letter and 1 number</p>
                    </div>

                    <Button variant="outline" fullWidth className="mt-4">Update password</Button>
                </form>
            </div>

            {/* 4. Delete Account */}
            <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-stone-900 mb-4 border-b border-stone-100 pb-4">Not your cup of tea?</h2>
                <p className="text-stone-600 mb-6 text-sm">
                    If you’d like to change the emails you get, you can update your email preferences. If you’d like to say goodbye altogether, you can delete your Tea Society account now.
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                    <Button variant="outline" onClick={() => window.location.hash = '#email-preferences'} className="border-rust-500 text-rust-600 hover:bg-rust-50">
                        Update my email preferences
                    </Button>
                    <Button variant="outline" className="text-stone-500 border-stone-300 hover:border-red-500 hover:text-red-500 hover:bg-red-50">
                        Delete my Tea Society account
                    </Button>
                </div>
            </div>

        </div>

        {/* Email Change Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
              <button
                onClick={closeEmailModal}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-900"
              >
                <X size={24} />
              </button>

              {!emailChangeSent ? (
                <>
                  <h2 className="text-2xl font-bold text-stone-900 mb-2">Đổi email</h2>
                  <p className="text-stone-600 mb-6">
                    Chúng tôi sẽ gửi email xác nhận đến địa chỉ email mới của bạn. 
                    Vui lòng kiểm tra email và click vào link xác nhận để hoàn tất việc đổi email.
                  </p>
                  <form onSubmit={handleEmailChange} className="space-y-4">
                    <div>
                      <label className={labelClass}>
                        Email hiện tại
                      </label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className={`${inputClass} bg-stone-100 text-stone-500 cursor-not-allowed`}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Email mới <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Nhập email mới"
                        className={inputClass}
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={closeEmailModal}
                        className="flex-1"
                      >
                        Hủy
                      </Button>
                      <Button
                        type="submit"
                        disabled={isChangingEmail || !newEmail || newEmail === user?.email}
                        className="flex-1 bg-stone-900 hover:bg-stone-800 text-white"
                      >
                        {isChangingEmail ? 'Đang gửi...' : 'Gửi email xác nhận'}
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-rust-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-rust-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-2">Email xác nhận đã được gửi!</h2>
                  <p className="text-stone-600 mb-4">
                    Chúng tôi đã gửi email xác nhận đến <strong>{newEmail}</strong>.
                  </p>
                  <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-stone-700">
                      <strong>💡 Lưu ý:</strong> Vui lòng kiểm tra hộp thư đến (và cả thư mục Spam) của email mới và click vào link xác nhận để hoàn tất việc đổi email.
                    </p>
                  </div>
                  <Button
                    onClick={closeEmailModal}
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
