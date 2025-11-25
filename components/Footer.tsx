
import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.hash && window.location.hash !== '#') {
        window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-50 text-stone-600 pt-24 pb-12 border-t border-stone-200">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Column 1: Brand/Home */}
          <div>
            <a href="#" onClick={goHome} className="inline-block group">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-rust-500 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:bg-rust-600 transition-colors">c</div>
                    <h3 className="font-bold text-2xl text-stone-900 group-hover:text-rust-600 transition-colors">ChuLeaf Co.</h3>
                </div>
            </a>
            
            <p className="text-stone-500 mb-8 leading-relaxed font-light">
              Quán trà nhỏ giữa lòng phố thị, mang đến những hương vị trà Việt tinh tế và hiện đại nhất.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center hover:bg-rust-500 hover:border-rust-500 hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center hover:bg-rust-500 hover:border-rust-500 hover:text-white transition-all"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center hover:bg-rust-500 hover:border-rust-500 hover:text-white transition-all"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center hover:bg-rust-500 hover:border-rust-500 hover:text-white transition-all"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Column 2: Về Chúng Tôi (Moved here) */}
          <div>
            <h4 className="font-bold text-stone-900 mb-6">Về Chúng Tôi</h4>
            <ul className="space-y-4 font-light">
              <li><a href="#ve-chung-toi" className="hover:text-rust-500 transition-colors">Câu chuyện thương hiệu</a></li>
              <li><a href="#ve-chung-toi" className="hover:text-rust-500 transition-colors">Phát triển bền vững</a></li>
              <li><a href="#ve-chung-toi" className="hover:text-rust-500 transition-colors">Tuyển dụng</a></li>
              <li><a href="#blog" className="hover:text-rust-500 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Column 3: Sản Phẩm (Shifted here) */}
          <div>
            <h4 className="font-bold text-stone-900 mb-6">Sản Phẩm</h4>
            <ul className="space-y-4 font-light">
              <li><a href="#tra-nguyen-ban" className="hover:text-rust-500 transition-colors">Danh mục trà</a></li>
              <li><a href="#tra-cu" className="hover:text-rust-500 transition-colors">Trà cụ</a></li>
              <li><a href="#qua-tang" className="hover:text-rust-500 transition-colors">Quà tặng</a></li>
              <li><a href="#tiec-tra" className="hover:text-rust-500 transition-colors">Tiệc trà</a></li>
              <li><a href="#" className="hover:text-rust-500 transition-colors">Khuyến mãi</a></li>
            </ul>
          </div>

          {/* Column 4: Chăm Sóc Khách Hàng (Shifted here) */}
          <div>
            <h4 className="font-bold text-stone-900 mb-6">Chăm Sóc Khách Hàng</h4>
            <ul className="space-y-4 font-light">
              <li><a href="#lien-he" className="hover:text-rust-500 transition-colors">Liên hệ</a></li>
              <li><a href="#" className="hover:text-rust-500 transition-colors">Vận chuyển & Giao hàng</a></li>
              <li><a href="#" className="hover:text-rust-500 transition-colors">Đổi trả</a></li>
              <li><a href="#" className="hover:text-rust-500 transition-colors">Hỏi đáp (FAQs)</a></li>
              <li><a href="#" className="hover:text-rust-500 transition-colors">Hệ thống cửa hàng</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center text-stone-400 text-sm font-light">
          <p>&copy; 2024 ChuLeaf Co. Bảo lưu mọi quyền.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-stone-800">Chính sách bảo mật</a>
            <a href="#" className="hover:text-stone-800">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
