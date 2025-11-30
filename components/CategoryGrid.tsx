
import React from 'react';
import { CATEGORIES } from '../constants';
import { ArrowRight } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const handleNav = (link: string) => {
    window.location.hash = link;
  };

  return (
    <section className="py-24 bg-stone-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
             <span className="text-rust-500 font-bold tracking-widest uppercase text-xs mb-3 block">Bộ Sưu Tập</span>
             <h2 className="text-3xl md:text-5xl font-light text-stone-900 tracking-tight">Khám Phá Thế Giới Trà</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <div 
              key={category.id} 
              onClick={() => handleNav(category.link)}
              className="relative group overflow-hidden h-[400px] rounded-3xl cursor-pointer shadow-sm"
            >
              <div className="absolute inset-0 bg-stone-900">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-medium text-white mb-2">
                    {category.title}
                    </h3>
                    <p className="text-stone-300 text-sm mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                    {category.description}
                    </p>
                    <div className="flex items-center gap-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                        <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-stone-900 transition-colors">
                             <ArrowRight size={14} />
                        </span>
                        <span>Xem sản phẩm</span>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
