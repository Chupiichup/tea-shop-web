
import React from 'react';
import { Button } from './Button';

export const BrandStory: React.FC = () => {
  const handleReadMore = () => {
    window.location.hash = '#ve-chung-toi';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full bg-stone-50 py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side */}
            <div className="relative order-2 lg:order-1">
                <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-stone-200/50 bg-stone-200">
                    <img 
                        // Using a reliable Unsplash ID for "Pouring tea / cozy vibe"
                        src="https://images.unsplash.com/photo-1737279146334-3a6debeec98d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1600&auto=format&fit=crop" 
                        alt="Cozy Tea Table"
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                    />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rust-200 rounded-full blur-3xl opacity-60 -z-10"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-stone-300 rounded-full blur-3xl opacity-60 -z-10"></div>
            </div>
            
            {/* Content Side */}
            <div className="order-1 lg:order-2">
                <span className="text-rust-500 font-bold tracking-widest uppercase text-xs mb-6 block">Triết Lý Thương Hiệu</span>
                <h2 className="text-4xl md:text-6xl font-light text-stone-900 mb-8 leading-tight">
                    Chuyện Trà Ở <br/>
                    <span className="font-medium text-rust-500">ChuLeaf Co</span>
                </h2>
                <div className="space-y-6 text-stone-600 text-lg font-light leading-relaxed">
                    <p>
                        Trà không chỉ là thức uống, đó là một khoảng lặng dịu dàng giữa nhịp sống hối hả. Tại ChuLeaf, chúng tôi gom góp những búp trà non từ những đồi cao sương phủ, mang về phố thị để bạn tìm lại sự bình yên.
                    </p>
                    <p>
                        Mỗi tách trà là một câu chuyện, một hương vị của quê hương, của đất trời và của sự chân thành. Chúng tôi tin rằng, hạnh phúc đôi khi chỉ đơn giản là một tách trà nóng trong tay.
                    </p>
                </div>
                <div className="mt-10">
                    <Button 
                        variant="outline" 
                        className="rounded-full px-10"
                        onClick={handleReadMore}
                    >
                        Đọc thêm về chúng tôi
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
