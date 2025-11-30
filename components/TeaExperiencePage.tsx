import React from 'react';
import { TEA_EXPERIENCE_FEATURES } from '../constants';
import { ArrowRight } from 'lucide-react';

export const TeaExperiencePage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-stone-50 min-h-screen">
      <section className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mb-16">
          <span className="text-rust-500 font-bold tracking-[0.35em] uppercase text-xs mb-5 block">
            Trải Nghiệm Trà
          </span>
          <h1 className="text-3xl md:text-5xl font-light text-stone-900 tracking-tight mb-6">
            Tiệc Trà & Khóa Học ChuLeaf
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            Một hành trình chuyên sâu giúp bạn chạm đến tinh túy của trà Việt. Chọn workshop trực tiếp, dịch vụ tiệc trà thiết kế riêng hoặc khóa học online linh hoạt — tất cả đều được dẫn dắt bởi nghệ nhân ChuLeaf.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEA_EXPERIENCE_FEATURES.map((feature) => (
            <article
              key={feature.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70"></div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs uppercase tracking-[0.4em] opacity-70 mb-2">Dịch Vụ</p>
                  <h2 className="text-2xl font-medium">{feature.title}</h2>
                </div>
              </div>

              <div className="p-8 flex flex-col gap-6 flex-1">
                <p className="text-stone-600 leading-relaxed flex-1">{feature.description}</p>
                <a
                  href={feature.link}
                  className="flex items-center justify-between text-stone-900 font-medium group"
                >
                  <span>{feature.cta}</span>
                  <span className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-colors">
                    <ArrowRight size={20} />
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};


