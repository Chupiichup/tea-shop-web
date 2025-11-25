
import React, { useMemo, useEffect, useState } from 'react';
import { ALL_PRODUCTS, BLOG_ARTICLES } from '../constants';
import { ProductCard } from './ProductCard';
import { Button } from './Button';
import { Search, Frown, SlidersHorizontal, ChevronDown, Check, X, ArrowRight, BookOpen } from 'lucide-react';
import { Product } from '../types';

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'articles'>('products');
  
  // Filters State
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<'relevance' | 'priceAsc' | 'priceDesc' | 'nameAsc' | 'newest'>('relevance');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Extract query from hash URL: #search?q=keyword
  useEffect(() => {
    const handleHashChange = () => {
        const hash = window.location.hash; // #search?q=abc
        if (hash.includes('?q=')) {
            const rawQuery = hash.split('?q=')[1];
            setQuery(decodeURIComponent(rawQuery).replace(/\+/g, ' '));
        } else {
            setQuery('');
        }
    };

    handleHashChange(); // Run on mount
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Helper for Vietnamese search
  const normalizeText = (text: string) => {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
  };

  // 1. Logic: Filter Products
  const rawFilteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const searchTerms = normalizeText(query).split(' ').filter(t => t);

    return ALL_PRODUCTS.filter(product => {
        const normalizedName = normalizeText(product.name);
        const normalizedTag = product.tag ? normalizeText(product.tag) : '';
        const normalizedCat = product.categoryId ? normalizeText(product.categoryId) : '';
        const normalizedFormat = product.format ? normalizeText(product.format) : '';

        // Match if ALL search terms are present in ANY of the fields
        return searchTerms.every(term => 
            normalizedName.includes(term) || 
            normalizedTag.includes(term) || 
            normalizedCat.includes(term) ||
            normalizedFormat.includes(term)
        );
    });
  }, [query]);

  // 2. Logic: Apply Filters & Sort to Products
  const finalProducts = useMemo(() => {
      let result = [...rawFilteredProducts];

      // Format Filter
      if (selectedFormats.length > 0) {
          result = result.filter(p => p.format && selectedFormats.includes(p.format));
      }

      // Price Filter
      if (priceRange.length > 0) {
          result = result.filter(p => {
              const priceVal = parseInt(p.price.replace(/\./g, '').replace(/\D/g, ''));
              return priceRange.some(range => {
                  if (range === 'low') return priceVal <= 200000;
                  if (range === 'mid') return priceVal > 200000 && priceVal <= 500000;
                  if (range === 'high') return priceVal > 500000;
                  return false;
              });
          });
      }

      // Sorting
      switch (sortOption) {
          case 'priceAsc':
              result.sort((a, b) => parseInt(a.price.replace(/\D/g,'')) - parseInt(b.price.replace(/\D/g,'')));
              break;
          case 'priceDesc':
              result.sort((a, b) => parseInt(b.price.replace(/\D/g,'')) - parseInt(a.price.replace(/\D/g,'')));
              break;
          case 'nameAsc':
              result.sort((a, b) => a.name.localeCompare(b.name));
              break;
          case 'newest':
              result.sort((a, b) => (a.tag === 'Mới' ? -1 : 1)); // Simple mock sort for "New"
              break;
          default:
              break;
      }

      return result;
  }, [rawFilteredProducts, selectedFormats, priceRange, sortOption]);

  // 3. Logic: Filter Articles
  const filteredArticles = useMemo(() => {
    if (!query.trim()) return [];
    const searchTerms = normalizeText(query).split(' ').filter(t => t);

    return BLOG_ARTICLES.filter(article => {
        const content = normalizeText(article.title + ' ' + article.excerpt);
        return searchTerms.every(term => content.includes(term));
    });
  }, [query]);


  // Available Formats dynamic list
  const availableFormats = useMemo(() => {
      const fmts = new Set<string>();
      rawFilteredProducts.forEach(p => { if (p.format) fmts.add(p.format); });
      return Array.from(fmts);
  }, [rawFilteredProducts]);

  const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setter(prev => prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]);
  };

  const handleArticleClick = (id: string) => {
    window.location.hash = `#article/${id}`;
  };

  return (
    <div className="bg-white min-h-screen pt-[80px]">
      
      {/* 1. Header Area - Dark Theme for Search Results Context */}
      <div className="bg-stone-950 text-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
            <span className="text-stone-400 font-bold tracking-widest uppercase text-xs mb-3 block">Kết quả tìm kiếm</span>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
                "{query}"
            </h1>
            <p className="text-stone-400 font-light">
                Hiển thị kết quả tìm kiếm của bạn bên dưới.
            </p>
        </div>
      </div>

      {/* 2. Tabs Navigation */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-stone-200">
          <div className="container mx-auto px-6 lg:px-12 flex items-center gap-8 overflow-x-auto">
              <button 
                onClick={() => setActiveTab('products')}
                className={`py-4 font-medium text-sm md:text-base border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'products' 
                    ? 'border-rust-500 text-stone-900' 
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                  Sản phẩm ({rawFilteredProducts.length})
              </button>
              <button 
                onClick={() => setActiveTab('articles')}
                className={`py-4 font-medium text-sm md:text-base border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'articles' 
                    ? 'border-rust-500 text-stone-900' 
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                  Bài viết & Công thức ({filteredArticles.length})
              </button>
          </div>
      </div>

      {/* 3. Main Content Area */}
      <div className="container mx-auto px-6 lg:px-12 py-12">
        
        {/* TAB: PRODUCTS */}
        {activeTab === 'products' && (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
                
                {/* Sidebar Filters */}
                <aside className={`
                    fixed inset-0 bg-white z-50 p-6 transition-transform duration-300 ease-in-out lg:static lg:block lg:w-64 lg:p-0 lg:z-0
                    ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    overflow-y-auto lg:overflow-visible shadow-2xl lg:shadow-none
                `}>
                    <div className="flex items-center justify-between mb-8 lg:hidden">
                        <h2 className="text-xl font-bold text-stone-900">Bộ lọc</h2>
                        <button onClick={() => setMobileFiltersOpen(false)} className="p-2 text-stone-500 hover:text-rust-500">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-8 pr-4">
                        <div className="flex items-center justify-between lg:hidden">
                             <span className="text-stone-500">{finalProducts.length} kết quả</span>
                        </div>

                        {/* Filter: Format */}
                        {availableFormats.length > 0 && (
                            <div>
                                <h3 className="font-bold text-stone-900 mb-4 text-xs uppercase tracking-widest border-b border-stone-100 pb-2">Loại Sản Phẩm</h3>
                                <div className="space-y-3">
                                    {availableFormats.map(fmt => (
                                        <label key={fmt} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedFormats.includes(fmt) ? 'bg-rust-500 border-rust-500' : 'border-stone-300 bg-white'}`}>
                                                {selectedFormats.includes(fmt) && <Check size={10} className="text-white" />}
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                className="hidden"
                                                checked={selectedFormats.includes(fmt)}
                                                onChange={() => toggleFilter(setSelectedFormats, fmt)}
                                            />
                                            <span className="text-stone-600 text-sm group-hover:text-rust-600 transition-colors">{fmt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Filter: Price */}
                        <div>
                            <h3 className="font-bold text-stone-900 mb-4 text-xs uppercase tracking-widest border-b border-stone-100 pb-2">Mức Giá</h3>
                            <div className="space-y-3">
                                {[
                                    { label: 'Dưới 200.000đ', val: 'low' },
                                    { label: '200.000đ - 500.000đ', val: 'mid' },
                                    { label: 'Trên 500.000đ', val: 'high' }
                                ].map(item => (
                                    <label key={item.val} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${priceRange.includes(item.val) ? 'bg-rust-500 border-rust-500' : 'border-stone-300 bg-white'}`}>
                                            {priceRange.includes(item.val) && <Check size={10} className="text-white" />}
                                        </div>
                                        <input 
                                            type="checkbox" 
                                            className="hidden"
                                            checked={priceRange.includes(item.val)}
                                            onChange={() => toggleFilter(setPriceRange, item.val)}
                                        />
                                        <span className="text-stone-600 text-sm group-hover:text-rust-600 transition-colors">{item.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-12 lg:hidden sticky bottom-0 bg-white p-4 border-t border-stone-100">
                        <Button fullWidth onClick={() => setMobileFiltersOpen(false)}>Áp dụng ({finalProducts.length})</Button>
                    </div>
                </aside>

                {/* Products Grid Area */}
                <main className="flex-1 w-full">
                    {/* Top Controls */}
                    <div className="flex items-center justify-between mb-8">
                         <h2 className="text-xl md:text-2xl font-bold text-stone-900 hidden lg:block">Sản phẩm</h2>
                         
                         <button 
                            onClick={() => setMobileFiltersOpen(true)}
                            className="lg:hidden flex items-center gap-2 text-stone-800 font-medium border border-stone-200 px-4 py-2 rounded-full hover:bg-stone-50"
                        >
                            <SlidersHorizontal size={18} /> Bộ lọc
                        </button>

                         <div className="relative z-20">
                             <button 
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-rust-600"
                             >
                                 <SlidersHorizontal size={16} className="hidden md:inline" /> 
                                 Sắp xếp theo <ChevronDown size={16} />
                             </button>
                             {isSortOpen && (
                                 <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl rounded-lg border border-stone-100 py-2 flex flex-col animate-fade-in-up">
                                     {[
                                         { label: 'Liên quan nhất', val: 'relevance' },
                                         { label: 'Mới nhất', val: 'newest' },
                                         { label: 'Giá: Thấp đến Cao', val: 'priceAsc' },
                                         { label: 'Giá: Cao đến Thấp', val: 'priceDesc' },
                                         { label: 'Tên: A - Z', val: 'nameAsc' },
                                     ].map(opt => (
                                         <button 
                                            key={opt.val}
                                            onClick={() => { setSortOption(opt.val as any); setIsSortOpen(false); }}
                                            className={`text-left px-4 py-2 text-sm hover:bg-stone-50 ${sortOption === opt.val ? 'text-rust-600 font-bold' : 'text-stone-700'}`}
                                         >
                                             {opt.label}
                                         </button>
                                     ))}
                                 </div>
                             )}
                         </div>
                    </div>

                    {finalProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
                            {finalProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                         <div className="text-center py-20 bg-stone-50 rounded-2xl border border-stone-100">
                             <Frown size={40} className="mx-auto text-stone-300 mb-4" />
                             <h3 className="text-lg font-medium text-stone-700 mb-2">Không có sản phẩm nào</h3>
                             <p className="text-stone-500 text-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
                             <button onClick={() => {setSelectedFormats([]); setPriceRange([])}} className="mt-4 text-rust-500 font-medium hover:underline">Xóa bộ lọc</button>
                         </div>
                    )}
                </main>
            </div>
        )}

        {/* TAB: ARTICLES */}
        {activeTab === 'articles' && (
            <div>
                 {filteredArticles.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         {filteredArticles.map(article => (
                             <div 
                                key={article.id} 
                                className="group cursor-pointer bg-stone-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                                onClick={() => handleArticleClick(article.id)}
                            >
                                 <div className="aspect-[16/10] overflow-hidden relative">
                                     <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                     <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                                 </div>
                                 <div className="p-6">
                                     <div className="flex items-center gap-2 mb-3">
                                        <span className="text-[10px] font-bold uppercase tracking-widest bg-white border border-stone-200 px-2 py-1 rounded text-stone-500">
                                            {article.categoryId === 'cach-pha-tra' ? 'Pha Chế' : 'Câu Chuyện'}
                                        </span>
                                        <span className="text-xs text-stone-400">{article.date}</span>
                                     </div>
                                     <h3 className="text-xl font-bold text-stone-900 mb-3 leading-snug group-hover:text-rust-600 transition-colors">
                                         {article.title}
                                     </h3>
                                     <p className="text-stone-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                                         {article.excerpt}
                                     </p>
                                     <div className="flex items-center text-rust-600 text-sm font-medium group-hover:gap-2 transition-all">
                                         Đọc thêm <ArrowRight size={16} className="ml-1" />
                                     </div>
                                 </div>
                             </div>
                         ))}
                     </div>
                 ) : (
                    <div className="text-center py-20 bg-stone-50 rounded-2xl border border-stone-100">
                        <BookOpen size={40} className="mx-auto text-stone-300 mb-4" />
                        <h3 className="text-lg font-medium text-stone-700 mb-2">Không tìm thấy bài viết nào</h3>
                        <p className="text-stone-500 text-sm">Hãy thử tìm kiếm sản phẩm hoặc từ khóa khác.</p>
                    </div>
                 )}
            </div>
        )}

      </div>
    </div>
  );
};
