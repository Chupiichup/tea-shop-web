
import React, { useEffect, useMemo } from 'react';
import { BLOG_ARTICLES } from '../constants';
import { ArrowLeft, Clock, User, Share2, ArrowRight } from 'lucide-react';

interface ArticleDetailPageProps {
  articleId: string;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ articleId }) => {
  const article = BLOG_ARTICLES.find(a => a.id === articleId);

  // Filter related articles (same category, excluding current)
  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return BLOG_ARTICLES
        .filter(a => a.categoryId === article.categoryId && a.id !== article.id)
        .slice(0, 3);
  }, [article]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  const goBack = (e: React.MouseEvent) => {
      e.preventDefault();
      window.history.back();
  };

  const handleRelatedClick = (id: string) => {
      window.location.hash = `#article/${id}`;
  };

  if (!article) {
      return (
          <div className="min-h-screen pt-32 text-center">
              <h1 className="text-2xl text-stone-800">Bài viết không tồn tại</h1>
              <a href="#" className="text-rust-500 underline mt-4 block" onClick={(e) => {e.preventDefault(); window.location.hash = '#' }}>Về trang chủ</a>
          </div>
      )
  }

  return (
    <div className="bg-white min-h-screen pt-[80px]">
        {/* Header Image */}
        <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden bg-stone-900">
            <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 lg:p-12 text-white">
                <div className="container mx-auto max-w-4xl">
                    <button onClick={goBack} className="flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm font-medium uppercase tracking-widest transition-colors">
                        <ArrowLeft size={16} /> Quay lại
                    </button>
                    <span className="bg-rust-500 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-widest mb-4 inline-block">
                        {article.categoryId === 'cach-pha-tra' ? 'Cách Pha Trà' : 'Chuyện Trà'}
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 shadow-sm">
                        {article.title}
                    </h1>
                    <div className="flex items-center gap-6 text-sm text-white/90 font-light">
                        <span className="flex items-center gap-2"><Clock size={16}/> {article.date}</span>
                        <span className="flex items-center gap-2"><User size={16}/> {article.author}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Content Body */}
        <div className="container mx-auto px-6 lg:px-12 py-16">
            <article className="max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl text-stone-700 font-serif italic leading-relaxed mb-10 border-l-4 border-rust-500 pl-6">
                    {article.excerpt}
                </p>

                <div 
                    className="prose prose-stone prose-lg max-w-none 
                    prose-headings:font-bold prose-headings:text-stone-900 
                    prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                    prose-p:text-stone-600 prose-p:leading-relaxed prose-p:mb-6
                    prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-6
                    prose-ol:list-decimal prose-ol:pl-5 prose-ol:mb-6
                    prose-li:mb-2 prose-li:text-stone-600
                    prose-strong:text-stone-900
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8"
                >
                    {/* Rendering mock HTML content safely since it comes from our constants */}
                    {typeof article.content === 'string' ? (
                         <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    ) : (
                        article.content
                    )}
                </div>

                {/* Footer Share */}
                <div className="mt-16 pt-8 border-t border-stone-200 flex items-center justify-between">
                    <span className="text-stone-500 font-medium text-sm">Chia sẻ bài viết này:</span>
                    <div className="flex gap-4">
                        <button className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-rust-500 hover:text-white transition-colors">
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>
            </article>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
            <section className="bg-stone-50 py-16 border-t border-stone-200">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-6xl mx-auto">
                        <h3 className="text-2xl font-bold text-stone-900 mb-8 flex items-center gap-2">
                            Bài viết liên quan
                            <div className="h-px bg-stone-300 flex-grow ml-4"></div>
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedArticles.map((item) => (
                                <div 
                                    key={item.id} 
                                    onClick={() => handleRelatedClick(item.id)}
                                    className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className="aspect-[16/10] overflow-hidden relative">
                                        <img 
                                            src={item.image} 
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <span className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-2">{item.date}</span>
                                        <h4 className="text-lg font-bold text-stone-900 mb-3 leading-snug group-hover:text-rust-600 transition-colors line-clamp-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-stone-500 text-sm line-clamp-2 mb-4 flex-grow">
                                            {item.excerpt}
                                        </p>
                                        <div className="flex items-center text-rust-500 font-medium text-sm group-hover:underline">
                                            Đọc tiếp <ArrowRight size={14} className="ml-1" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )}
    </div>
  );
};
