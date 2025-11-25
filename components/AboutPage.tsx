
import React, { useEffect } from 'react';
import { Leaf, Heart, Coffee } from 'lucide-react';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-[80px]">
      {/* 1. Hero / Intro Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <span className="text-rust-500 font-bold tracking-widest uppercase text-xs mb-4 block">Câu chuyện thương hiệu</span>
            <h1 className="text-4xl md:text-6xl font-light text-stone-900 mb-8 leading-tight">
              Mang trà nghệ nhân Việt <br />
              <span className="font-medium text-rust-500">đến gần hơn với người trẻ</span>
            </h1>
            <p className="text-xl text-stone-600 font-light leading-relaxed max-w-2xl mx-auto">
              ChuLeaf Co. sinh ra từ một mong muốn rất đơn giản nhưng đẹp: Sự bình dị, chân thành và chất lượng cao nhất trong tầm giá.
            </p>
          </div>
        </div>
      </section>

      {/* 2. The 2013 Story Section (Split Layout) */}
      <section className="bg-stone-50 py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side */}
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1625125083293-c3bc94eff374?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1200&auto=format&fit=crop" 
                  alt="Đồi chè Cầu Đất" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="font-bold text-sm tracking-widest uppercase">Cầu Đất, Đà Lạt</p>
                  <p className="text-xs opacity-80">Est. 2013</p>
                </div>
              </div>
              {/* Decorative Blob */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-rust-200 rounded-full blur-3xl opacity-50 -z-10"></div>
            </div>

            {/* Text Side */}
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-stone-900 leading-tight">
                Khoảnh khắc <br/>
                <span className="font-serif italic text-rust-600">"trót yêu"</span> mãi mãi
              </h2>
              <div className="space-y-6 text-stone-600 font-light text-lg leading-relaxed">
                <p>
                  Hành trình bắt đầu từ năm 2013, khi tôi có dịp bước vào nhà máy trà tại Cầu Đất, Đà Lạt. 
                </p>
                <p className="border-l-4 border-rust-300 pl-6 italic text-stone-800">
                  "Giây phút mở cửa nhà xưởng, hương ô long ấm nồng phả vào mặt – nhẹ như sương, say như rượu."
                </p>
                <p>
                  Từ đó, tôi khám phá từng loại trà Việt Nam – từ Shan Tuyết cổ thụ miền Bắc, đến đồi chè Mộc Châu, rồi Thái Nguyên đầy nắng gió. Càng tìm hiểu, tôi càng thấy tiếc: <br/>
                  <strong className="font-medium text-stone-800">Vì trà Việt Nam tuyệt vời đến thế, mà nhiều người trẻ lại chưa từng được thưởng thức đúng cách.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Mission (Cards) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-light text-stone-900 mb-6">ChuLeaf Co. ra đời để thay đổi điều đó</h2>
            <p className="text-stone-500 font-light">Chúng tôi không bán sự xa xỉ. Chúng tôi bán những câu chuyện bình dị.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Coffee className="text-rust-500" size={28} />
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-3">Phá bỏ rào cản</h3>
              <p className="text-stone-500 font-light leading-relaxed">
                Trà không phải là thứ gì đó quá cao sang, kén người. Trà là thức uống cho mọi người, cho mọi câu chuyện.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Leaf className="text-rust-500" size={28} />
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-3">Về đúng bản chất</h3>
              <p className="text-stone-500 font-light leading-relaxed">
                Giản dị – Gần gũi – Ai cũng có thể yêu. Chúng tôi tôn trọng hương vị mộc mạc nguyên bản của lá trà.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Heart className="text-rust-500" size={28} />
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-3">Tinh thần nghệ nhân</h3>
              <p className="text-stone-500 font-light leading-relaxed">
                Giữ sự tỉ mỉ của nghệ nhân làm trà, nhưng bỏ đi những hình thức rườm rà không cần thiết.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Closing Quote */}
      <section className="bg-stone-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <Leaf className="mx-auto mb-8 text-rust-400 opacity-80" size={40} />
          <h2 className="text-2xl md:text-4xl font-serif italic leading-relaxed max-w-4xl mx-auto">
            "Tại ChuLeaf Co., mỗi sản phẩm đều là một câu chuyện về vùng đất, về nghệ nhân, về hương vị độc bản của Việt Nam."
          </h2>
          <div className="mt-12 w-24 h-1 bg-rust-500 mx-auto rounded-full"></div>
        </div>
      </section>
    </div>
  );
};
