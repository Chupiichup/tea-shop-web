
import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Video, CheckCircle, User, Phone, Mail, ChevronDown, ChevronUp, Send, Loader2, MonitorPlay } from 'lucide-react';
import { Button } from './Button';

interface Course {
  id: 'basic' | 'advanced';
  title: string;
  duration: string;
  price: string;
  description: string;
  image: string;
  sessions: { title: string; desc: string }[];
}

const COURSES: Course[] = [
  {
    id: 'basic',
    title: 'Khóa Nhập Môn: 3 Buổi Giới Thiệu',
    duration: '3 Buổi (90 phút/buổi)',
    price: 'Liên hệ',
    description: 'Làm quen với thế giới trà đạo. Hiểu về dụng cụ, nước và phân biệt các loại trà cơ bản. Phù hợp cho người mới bắt đầu.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop',
    sessions: [
      { title: 'Buổi 1: Nhập Môn Trà Đạo', desc: 'Giới thiệu về Bàn trà, Trà Cụ cơ bản, Các quy tắc ứng xử trên bàn trà.' },
      { title: 'Buổi 2: Nước & Hương Vị', desc: 'Vai trò của Nước & Các yếu tố ảnh hưởng trực tiếp đến hương vị chén trà.' },
      { title: 'Buổi 3: Phân Loại Trà', desc: 'Tổng quan về Lục trà (Không lên men), Ô Long (Bán lên men) và Hồng trà/Phổ nhĩ (Lên men).' }
    ]
  },
  {
    id: 'advanced',
    title: 'Khóa Chuyên Sâu: 10 Buổi Nghệ Nhân',
    duration: '10 Buổi (120 phút/buổi)',
    price: 'Liên hệ',
    description: 'Hành trình trở thành người am hiểu trà thực thụ. Đi sâu vào từng dòng trà, kỹ thuật pha chế nâng cao và văn hóa thưởng trà.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop',
    sessions: [
      { title: 'Buổi 1: Không Gian & Tâm Thế', desc: 'Thiết lập bàn trà, Trà cụ chuyên sâu, Quy tắc không gian trà.' },
      { title: 'Buổi 2: Khoa Học Về Nước', desc: 'Phân tích nước, nhiệt độ và tác động hóa học đến lá trà.' },
      { title: 'Buổi 3: Lục Trà (Green Tea)', desc: 'Kỹ thuật pha trà xanh Thái Nguyên, trà xanh Nhật Bản.' },
      { title: 'Buổi 4: Hoàng Trà (Yellow Tea)', desc: 'Khám phá phẩm trà tiến vua và kỹ thuật ủ.' },
      { title: 'Buổi 5: Ô Long (Oolong)', desc: 'Đánh thức hương hương hoa và vị ngọt hậu của trà bán lên men.' },
      { title: 'Buổi 6: Phổ Nhĩ (Pu-erh)', desc: 'Trà bánh, trà lưu niên và kỹ thuật tách trà.' },
      { title: 'Buổi 7: Bạch Trà (White Tea)', desc: 'Sự tinh tế của búp non và cách pha nhiệt độ thấp.' },
      { title: 'Buổi 8: Hồng Trà (Black Tea)', desc: 'Vị ngọt mật ong và sắc nước đỏ thắm.' },
      { title: 'Buổi 9: Trà Ướp Hương', desc: 'Nghệ thuật ướp hương Sen, Lài, Quế tự nhiên.' },
      { title: 'Buổi 10: Văn Hóa Trà Đạo', desc: 'Tổng kết, thực hành pha trà mời khách và đàm đạo.' }
    ]
  }
];

export const OnlineCoursePage: React.FC = () => {
  const [expandedCourse, setExpandedCourse] = useState<string | null>('basic');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    note: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedCourse(expandedCourse === id ? null : id);
  };

  const handleRegisterClick = (courseId: string) => {
      setSelectedCourseId(courseId);
      document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
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
      <div className="relative w-full h-[50vh] min-h-[450px] bg-stone-900 overflow-hidden flex items-center justify-center">
        <img 
            src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2000&auto=format&fit=crop" 
            alt="Online Learning Tea" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-3xl px-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-rust-600/90 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-lg">
                <MonitorPlay size={14} /> E-Learning Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                Kết Nối Văn Hóa Trà <br/> 
                <span className="text-rust-400">Từ Xa</span>
            </h1>
            <p className="text-stone-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                Học cách pha trà và thưởng trà đúng điệu ngay tại nhà. Giáo trình được thiết kế bài bản bởi các nghệ nhân hàng đầu của ChuLeaf.
            </p>
        </div>
      </div>

      {/* 2. COURSE LIST */}
      <section className="py-20 bg-stone-50">
          <div className="container mx-auto px-6 lg:px-12">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-stone-900 mb-4">Lộ trình học tập</h2>
                  <p className="text-stone-500 font-light">Chọn khóa học phù hợp với nhu cầu và thời gian của bạn.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  {COURSES.map((course) => (
                      <div key={course.id} className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-stone-200/50 border border-stone-100 flex flex-col h-full transition-transform hover:-translate-y-1 duration-300">
                          {/* Card Image */}
                          <div className="relative h-56 overflow-hidden">
                              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                              <div className="absolute bottom-4 left-6 text-white">
                                  <div className="flex items-center gap-4 text-sm font-medium mb-1">
                                      <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                                      <span className="flex items-center gap-1"><Video size={14} /> Online qua Zoom</span>
                                  </div>
                                  <h3 className="text-2xl font-bold">{course.title}</h3>
                              </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-8 flex-1 flex flex-col">
                              <p className="text-stone-600 font-light mb-6 leading-relaxed">
                                  {course.description}
                              </p>

                              {/* Syllabus Accordion */}
                              <div className="mb-8 flex-1">
                                  <button 
                                    onClick={() => toggleExpand(course.id)}
                                    className="flex items-center justify-between w-full text-left font-bold text-stone-900 mb-4 hover:text-rust-600 transition-colors"
                                  >
                                      <span>Nội dung chi tiết ({course.sessions.length} buổi)</span>
                                      {expandedCourse === course.id ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                                  </button>
                                  
                                  <div className={`space-y-3 overflow-hidden transition-all duration-500 ${expandedCourse === course.id ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                      {course.sessions.map((session, idx) => (
                                          <div key={idx} className="flex gap-3 text-sm">
                                              <div className="w-6 h-6 rounded-full bg-rust-50 text-rust-600 flex items-center justify-center font-bold flex-shrink-0 text-xs mt-0.5">
                                                  {idx + 1}
                                              </div>
                                              <div>
                                                  <span className="font-bold text-stone-800 block">{session.title}</span>
                                                  <span className="text-stone-500 font-light text-xs">{session.desc}</span>
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                              </div>

                              {/* Footer */}
                              <div className="pt-6 border-t border-stone-100 flex items-center justify-between mt-auto">
                                  <div className="text-stone-500 font-medium text-sm">
                                      Học phí: <span className="text-rust-600 font-bold text-lg ml-1">{course.price}</span>
                                  </div>
                                  <Button onClick={() => handleRegisterClick(course.id)}>
                                      Đăng ký học ngay
                                  </Button>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 3. REGISTRATION FORM */}
      <section id="registration-form" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
              <div className="max-w-4xl mx-auto">
                  <div className="bg-stone-50 rounded-[2.5rem] p-8 md:p-12 border border-stone-100 shadow-lg">
                      {isSuccess ? (
                          <div className="text-center py-12 animate-fade-in-up">
                              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100">
                                  <CheckCircle size={48} />
                              </div>
                              <h2 className="text-3xl font-bold text-stone-900 mb-4">Đăng ký thành công!</h2>
                              <p className="text-stone-600 font-light text-lg mb-8 max-w-md mx-auto">
                                  Cảm ơn <strong>{formData.name}</strong>. Bộ phận tuyển sinh sẽ liên hệ với bạn qua số <strong>{formData.phone}</strong> để tư vấn lịch học và học phí chi tiết.
                              </p>
                              <Button onClick={() => setIsSuccess(false)} variant="outline">Đăng ký thêm</Button>
                          </div>
                      ) : (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                              {/* Form Side */}
                              <div>
                                  <h2 className="text-3xl font-bold text-stone-900 mb-6">Đăng ký tư vấn</h2>
                                  <p className="text-stone-500 font-light mb-8">
                                      Điền thông tin bên dưới để nhận lịch khai giảng và ưu đãi học phí mới nhất.
                                  </p>
                                  
                                  <form onSubmit={handleSubmit} className="space-y-6">
                                      <div className="space-y-2">
                                          <label className={labelClass}>Họ và Tên</label>
                                          <div className="relative">
                                              <User className="absolute top-3.5 left-4 text-stone-400" size={20} />
                                              <input required name="name" value={formData.name} onChange={handleInputChange} className={`${inputClass} pl-12`} placeholder="Nguyễn Văn A" />
                                          </div>
                                      </div>
                                      
                                      <div className="space-y-2">
                                          <label className={labelClass}>Số điện thoại</label>
                                          <div className="relative">
                                              <Phone className="absolute top-3.5 left-4 text-stone-400" size={20} />
                                              <input required name="phone" value={formData.phone} onChange={handleInputChange} className={`${inputClass} pl-12`} placeholder="0912 345 678" />
                                          </div>
                                      </div>

                                      <div className="space-y-2">
                                          <label className={labelClass}>Email</label>
                                          <div className="relative">
                                              <Mail className="absolute top-3.5 left-4 text-stone-400" size={20} />
                                              <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className={`${inputClass} pl-12`} placeholder="email@example.com" />
                                          </div>
                                      </div>

                                      <div className="space-y-2">
                                          <label className={labelClass}>Khóa học quan tâm</label>
                                          <div className="relative">
                                              <select 
                                                name="course" 
                                                value={selectedCourseId} 
                                                onChange={(e) => setSelectedCourseId(e.target.value)}
                                                className={`${inputClass} appearance-none cursor-pointer`}
                                              >
                                                  <option value="basic">Khóa Nhập Môn (3 Buổi)</option>
                                                  <option value="advanced">Khóa Chuyên Sâu (10 Buổi)</option>
                                              </select>
                                              <ChevronDown className="absolute top-3.5 right-4 text-stone-400 pointer-events-none" size={20} />
                                          </div>
                                      </div>

                                      <div className="space-y-2">
                                          <label className={labelClass}>Mong muốn / Thời gian học</label>
                                          <textarea rows={3} name="note" value={formData.note} onChange={handleInputChange} className={inputClass} placeholder="VD: Tôi rảnh vào tối thứ 3-5-7..." />
                                      </div>

                                      <Button type="submit" fullWidth size="lg" disabled={isSubmitting} className="mt-4 py-4 text-lg font-bold shadow-xl shadow-rust-500/20">
                                          {isSubmitting ? <><Loader2 className="animate-spin mr-2" /> Đang gửi...</> : <><Send className="mr-2" /> Gửi đăng ký</>}
                                      </Button>
                                  </form>
                              </div>

                              {/* Info Side (Desktop) */}
                              <div className="hidden lg:flex flex-col justify-center relative">
                                  <div className="absolute inset-0 bg-rust-50 rounded-3xl -rotate-3 transform scale-95 z-0"></div>
                                  <div className="relative z-10 bg-stone-900 rounded-3xl p-8 text-white shadow-2xl">
                                      <h3 className="text-2xl font-serif font-bold mb-6 text-rust-400">Quyền lợi học viên</h3>
                                      <ul className="space-y-6">
                                          <li className="flex gap-4">
                                              <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-rust-400 flex-shrink-0 border border-stone-700">
                                                  <Video size={20} />
                                              </div>
                                              <div>
                                                  <h4 className="font-bold mb-1">Học trực tuyến (Zoom)</h4>
                                                  <p className="text-stone-400 text-sm font-light">Tương tác trực tiếp với giảng viên, xem lại video bài giảng trọn đời.</p>
                                              </div>
                                          </li>
                                          <li className="flex gap-4">
                                              <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-rust-400 flex-shrink-0 border border-stone-700">
                                                  <BookOpen size={20} />
                                              </div>
                                              <div>
                                                  <h4 className="font-bold mb-1">Tài liệu độc quyền</h4>
                                                  <p className="text-stone-400 text-sm font-light">Giáo trình PDF và Ebook văn hóa trà được biên soạn riêng.</p>
                                              </div>
                                          </li>
                                          <li className="flex gap-4">
                                              <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-rust-400 flex-shrink-0 border border-stone-700">
                                                  <CheckCircle size={20} />
                                              </div>
                                              <div>
                                                  <h4 className="font-bold mb-1">Chứng nhận hoàn thành</h4>
                                                  <p className="text-stone-400 text-sm font-light">Nhận chứng nhận online từ ChuLeaf Co. sau khi kết thúc khóa học.</p>
                                              </div>
                                          </li>
                                      </ul>
                                      
                                      <div className="mt-10 pt-8 border-t border-stone-800 text-center">
                                          <p className="text-stone-400 text-sm mb-2">Cần hỗ trợ gấp?</p>
                                          <p className="text-2xl font-bold text-white">0987 654 321</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};
