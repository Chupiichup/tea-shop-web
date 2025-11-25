
import React, { useEffect } from 'react';
import { BLOG_ARTICLES } from '../constants';
import { ArrowRight, BookOpen } from 'lucide-react';

interface ArticleLandingPageProps {
  categoryId: 'cach-pha-tra' | 'chuyen-tra';
}

export const ArticleLandingPage: React.FC<ArticleLandingPageProps> = ({ categoryId }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  const categoryConfig = {
    'cach-pha-tra': {
      title: 'Cách Pha Trà',
      subtitle: 'Nâng tầm kỹ năng pha chế với những hướng dẫn đơn giản từ chuyên gia.',
      heroImage: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1600&auto=format&fit=crop',
      themeColor: 'bg-rust-500', // Orange/Rust theme for brewing
      icon: <BookOpen className="w-12 h-12 text-white mb-4" />
    },
    'chuyen-tra': {
      title: 'Chuyện Trà',
      subtitle: 'Khám phá văn hóa, lịch sử và những câu chuyện thú vị xoay quanh lá trà.',
      heroImage: 'https://images.unsplash.com/photo-1533658298282-3783a5df6124?q=80&w=1600&auto=format&fit=crop',
      themeColor: 'bg-stone-800', // Darker theme for stories
      icon: <BookOpen className="w-12 h-12 text-white mb-4" />
    }
  };

  const config = categoryConfig[categoryId];
  const articles = BLOG_ARTICLES.filter(article => article.categoryId === categoryId);

  const handleArticleClick = (id: string) => {
    window.location.hash = `#article/${id}`;
  };

  return (
    <div className="bg-white min-h-screen pt-[80px]">
      {/* Hero Section - T2 Tea Style (Bold Color + Image) */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden flex items-center">
        {/* Background Split: Left Color, Right Image (Desktop) */}
        <div className={`absolute inset-0 ${config.themeColor} w-full lg:w-1/2 z-0`}></div>
        <div className="absolute inset-0 left-auto w-full lg:w-1/2 bg-stone-200 z-0">
             <img 
                src={config.heroImage} 
                alt={config.title}
                className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-black/20 lg:bg-transparent"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 flex h-full items-center">
            <div className="max-w-xl text-white py-12">
                {config.icon}
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                    {config.title}
                </h1>
                <p className="text-lg md:text-xl font-light opacity-90 leading-relaxed">
                    {config.subtitle}
                </p>
            </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
            
            {/* Breadcrumb-ish indicator */}
            <div className="mb-12 flex items-center justify-center">
                <span className="h-px w-12 bg-stone-300"></span>
                <span className="px-4 text-stone-400 text-sm uppercase tracking-widest font-medium">Danh sách bài viết</span>
                <span className="h-px w-12 bg-stone-300"></span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {articles.map((article) => (
                    <div key={article.id} className="group cursor-pointer flex flex-col" onClick={() => handleArticleClick(article.id)}>
                        {/* Image Card */}
                        <div className="aspect-square overflow-hidden mb-6 bg-stone-100 relative">
                            <img 
                                src={article.image} 
                                alt={article.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col">
                            <h3 className="text-2xl font-bold text-stone-900 mb-3 leading-tight group-hover:text-rust-600 transition-colors">
                                {article.title}
                            </h3>
                            <p className="text-stone-600 font-light mb-6 line-clamp-3 leading-relaxed flex-grow">
                                {article.excerpt}
                            </p>
                            
                            <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                                <span className="text-xs text-stone-400 font-medium uppercase tracking-wider">{article.date}</span>
                                <button className="px-6 py-2 border border-stone-300 text-stone-800 text-sm font-medium rounded-full hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all flex items-center gap-2 group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900">
                                    Tìm hiểu <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {articles.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-stone-500">Chưa có bài viết nào trong mục này.</p>
                </div>
            )}
        </div>
      </section>
    </div>
  );
};
