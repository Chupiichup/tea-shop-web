
import React, { useState, useEffect, useMemo } from 'react';
import { Filter, ChevronDown, Heart, ShoppingBag, X, SlidersHorizontal, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { ALL_PRODUCTS, CATEGORY_DETAILS, TEA_TYPES_VISUALS } from '../constants';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface CategoryPageProps {
  categoryId?: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId = 'luc-tra' }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { addToCart } = useCart();
  
  // Filter States
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);

  // Get Category Metadata with fallback
  const categoryInfo = CATEGORY_DETAILS[categoryId] || {
    id: categoryId,
    title: 'Sản Phẩm',
    description: 'Khám phá các sản phẩm chất lượng của ChuLeaf.',
    breadcrumb: 'Sản phẩm',
    parent: { label: 'Trang chủ', href: '#' }
  };

  // Safe navigation handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = href;
    }
  };

  const handleSubCategoryClick = (subCatId: string) => {
    window.location.hash = `#${subCatId}`;
  };

  // Reset filters when category changes
  useEffect(() => {
    setSelectedOrigins([]);
    setSelectedFormats([]);
    setSelectedPrices([]);
    window.scrollTo(0, 0);
  }, [categoryId]);

  // Derived filtered products
  const filteredProducts = useMemo(() => {
    if (!ALL_PRODUCTS) return [];

    return ALL_PRODUCTS.filter(product => {
      // 1. Filter by Category
      // If we are on the main "Trà Nguyên Bản" page (tra-nguyen-ban), we want to show products 
      // from ALL sub-categories (luc-tra, bach-tra, etc.) OR just filter by that overarching ID if you tagged them.
      // Current data structure uses specific IDs (luc-tra, bach-tra) for products. 
      // So if categoryId is 'tra-nguyen-ban', we should technically show ALL tea types.
      
      const isTraNguyenBanParent = categoryId === 'tra-nguyen-ban';
      const traNguyenBanSubIds = ['luc-tra', 'bach-tra', 'hoang-tra', 'o-long', 'pho-nhi', 'hong-tra'];

      if (isTraNguyenBanParent) {
         if (!traNguyenBanSubIds.includes(product.categoryId || '')) return false;
      } else {
         if (product.categoryId !== categoryId) return false;
      }

      // 2. Filter by Origin (Mock logic: check if name contains origin)
      if (selectedOrigins.length > 0) {
        const matchesOrigin = selectedOrigins.some(origin => product.name.includes(origin));
        if (!matchesOrigin) return false;
      }

      // 3. Filter by Format/Type
      if (selectedFormats.length > 0) {
        if (!product.format || !selectedFormats.includes(product.format)) return false;
      }

      // 4. Filter by Price
      if (selectedPrices.length > 0 && product.price) {
        try {
            const priceVal = parseInt(product.price.replace(/\./g, '').replace(/\D/g, ''));
            const matchesPrice = selectedPrices.some(range => {
            if (range === 'low') return priceVal <= 200000;
            if (range === 'mid') return priceVal > 200000 && priceVal <= 500000; // Increased range for furniture
            if (range === 'high') return priceVal > 500000;
            return false;
            });
            if (!matchesPrice) return false;
        } catch (e) {
            console.warn("Error parsing price", product.price);
        }
      }

      return true;
    });
  }, [categoryId, selectedOrigins, selectedFormats, selectedPrices]);

  // Dynamic available formats based on current category products
  const availableFormats = useMemo(() => {
    const formats = new Set<string>();
    ALL_PRODUCTS.forEach(p => {
        // Similar logic for Parent category check
        const isTraNguyenBanParent = categoryId === 'tra-nguyen-ban';
        const traNguyenBanSubIds = ['luc-tra', 'bach-tra', 'hoang-tra', 'o-long', 'pho-nhi', 'hong-tra'];
        
        if (isTraNguyenBanParent) {
             if (traNguyenBanSubIds.includes(p.categoryId || '') && p.format) formats.add(p.format);
        } else {
             if (p.categoryId === categoryId && p.format) formats.add(p.format);
        }
    });
    // Fallback default list if empty (visual consistency)
    if (formats.size === 0) return ['Lá rời', 'Túi lọc', 'Bánh', 'Viên', 'Hộp quà', 'Tử Sa', 'Gốm', 'Sứ'];
    return Array.from(formats);
  }, [categoryId]);

  const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setter(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="bg-white min-h-screen pt-[120px] pb-20">
      {/* Category Header Section */}
      <div className="container mx-auto px-6 lg:px-12 mb-12">
        {/* Dynamic Breadcrumbs */}
        <nav className="flex items-center text-xs md:text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap">
          <a href="#" onClick={(e) => handleNavClick(e, '#')} className="hover:text-rust-500 transition-colors">Trang Chủ</a>
          
          {categoryInfo.parent && (
            <>
                <span className="mx-2">/</span>
                <a 
                    href={categoryInfo.parent.href} 
                    onClick={(e) => handleNavClick(e, categoryInfo.parent?.href || '#')} 
                    className="hover:text-rust-500 transition-colors"
                >
                    {categoryInfo.parent.label}
                </a>
            </>
          )}

          <span className="mx-2">/</span>
          <span className="text-stone-900 font-medium">{categoryInfo.breadcrumb}</span>
        </nav>

        {/* Title & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-100 pb-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-light text-stone-900 mb-4 tracking-tight">
              {categoryInfo.title}
            </h1>
            <p className="text-stone-600 text-lg font-light leading-relaxed max-w-xl">
              {categoryInfo.description}
            </p>
          </div>
        </div>
      </div>

      {/* SPECIAL SECTION: Tea Types Grid (Only for Trà Nguyên Bản) */}
      {categoryId === 'tra-nguyen-ban' && (
        <div className="container mx-auto px-6 lg:px-12 mb-20">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-stone-900 mb-2">Các loại trà</h2>
                <p className="text-stone-500 font-light max-w-2xl mx-auto">
                    Với hơn 6 loại trà trứ danh từ khắp các vùng miền Việt Nam, chúng tôi có đủ hương vị cho mọi gu thưởng thức.
                </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {TEA_TYPES_VISUALS.map((type) => (
                    <div 
                        key={type.id} 
                        onClick={() => handleSubCategoryClick(type.id)}
                        className="flex flex-col items-center text-center group cursor-pointer"
                    >
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all duration-300 border-2 border-transparent group-hover:border-rust-500">
                            <img 
                                src={type.image} 
                                alt={type.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <h3 className="font-bold text-stone-900 mb-2 group-hover:text-rust-600 transition-colors">{type.title}</h3>
                        <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed px-2">
                            {type.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Shop by Format Quick Links */}
            <div className="mt-16 text-center">
                 <h2 className="text-2xl font-bold text-stone-900 mb-8">Mua theo quy cách</h2>
                 <div className="flex flex-wrap justify-center gap-4">
                     {['Lá rời', 'Túi lọc', 'Bánh trà', 'Hộp quà'].map(fmt => (
                         <button 
                            key={fmt}
                            onClick={() => toggleFilter(setSelectedFormats, fmt)}
                            className={`px-8 py-3 rounded border transition-all duration-200 ${
                                selectedFormats.includes(fmt) 
                                ? 'bg-stone-900 text-white border-stone-900' 
                                : 'bg-white text-stone-700 border-stone-200 hover:border-rust-500 hover:text-rust-500'
                            }`}
                         >
                            <span className="flex items-center gap-2 font-medium">
                                {fmt}
                            </span>
                         </button>
                     ))}
                 </div>
            </div>
        </div>
      )}

      <div className="container mx-auto px-6 lg:px-12">
        {/* Sorting & Filter Controls (Top Bar) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sticky top-[80px] z-30 bg-white/95 backdrop-blur-sm py-4 -mx-6 px-6 lg:-mx-0 lg:px-0 border-b border-stone-100 lg:border-none">
          <button 
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 text-stone-800 font-medium border border-stone-200 px-4 py-2 rounded-full hover:bg-stone-50 transition-colors"
          >
            <SlidersHorizontal size={18} />
            Bộ lọc
          </button>
          
          <div className="hidden lg:flex items-center gap-2 text-stone-500 text-sm">
            <span className="flex items-center gap-2">
                <SlidersHorizontal size={16} /> 
                Bộ lọc
            </span>
            <span className="mx-2">|</span>
            <span>Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm</span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="relative group">
              <button className="flex items-center gap-2 text-stone-900 font-medium hover:text-rust-600 transition-colors">
                <span className="hidden sm:inline text-stone-500 font-normal mr-1">Sắp xếp:</span> 
                Phổ biến 
                <ChevronDown size={16} />
              </button>
              
              <div className="absolute right-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
                <div className="bg-white rounded-xl shadow-xl border border-stone-100 py-2 flex flex-col">
                  <button className="text-left px-4 py-2 text-sm hover:bg-stone-50 text-stone-800 transition-colors">Phổ biến nhất</button>
                  <button className="text-left px-4 py-2 text-sm hover:bg-stone-50 text-stone-800 transition-colors">Mới nhất</button>
                  <button className="text-left px-4 py-2 text-sm hover:bg-stone-50 text-stone-800 transition-colors">Giá tăng dần</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8 lg:gap-12 relative">
          {/* Filters Sidebar */}
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
              {/* Origin Filter - Only show if relevant (has matching products with these names) or keep as standard */}
              <div>
                <h3 className="font-bold text-stone-900 mb-4 text-xs uppercase tracking-widest border-b border-stone-100 pb-2">Xuất Xứ</h3>
                <div className="space-y-3">
                  {['Thái Nguyên', 'Tà Xùa', 'Hà Giang', 'Lâm Đồng', 'Nghi Hưng', 'Bát Tràng'].map(origin => (
                    <label key={origin} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedOrigins.includes(origin)}
                        onChange={() => toggleFilter(setSelectedOrigins, origin)}
                        className="w-4 h-4 rounded border-stone-300 text-rust-500 focus:ring-rust-500 cursor-pointer" 
                      />
                      <span className="text-stone-600 text-sm group-hover:text-rust-600 transition-colors">{origin}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Format/Type Filter - Dynamically populated or Static list */}
              <div>
                <h3 className="font-bold text-stone-900 mb-4 text-xs uppercase tracking-widest border-b border-stone-100 pb-2">Phân Loại</h3>
                <div className="space-y-3">
                  {availableFormats.map(val => (
                    <label key={val} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedFormats.includes(val)}
                        onChange={() => toggleFilter(setSelectedFormats, val)}
                        className="w-4 h-4 rounded border-stone-300 text-rust-500 focus:ring-rust-500 cursor-pointer" 
                      />
                      <span className="text-stone-600 text-sm group-hover:text-rust-600 transition-colors">{val}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-bold text-stone-900 mb-4 text-xs uppercase tracking-widest border-b border-stone-100 pb-2">Mức Giá</h3>
                <div className="space-y-3">
                   {[
                    { label: 'Dưới 200.000đ', val: 'low' },
                    { label: '200.000đ - 500.000đ', val: 'mid' },
                    { label: 'Trên 500.000đ', val: 'high' }
                  ].map(item => (
                    <label key={item.val} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                         type="checkbox" 
                         checked={selectedPrices.includes(item.val)}
                         onChange={() => toggleFilter(setSelectedPrices, item.val)}
                         className="w-4 h-4 rounded border-stone-300 text-rust-500 focus:ring-rust-500 cursor-pointer" 
                      />
                      <span className="text-stone-600 text-sm group-hover:text-rust-600 transition-colors">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 lg:hidden sticky bottom-0 bg-white p-4 border-t border-stone-100">
              <Button fullWidth onClick={() => setMobileFiltersOpen(false)}>Xem kết quả ({filteredProducts.length})</Button>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 w-full min-h-[500px]">
            {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-stone-50 rounded-2xl border border-stone-100">
                    <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                        <SlidersHorizontal size={24} />
                    </div>
                    <h3 className="text-xl text-stone-800 font-light mb-2">Không tìm thấy sản phẩm</h3>
                    <p className="text-stone-500 text-sm mb-6">Hãy thử bỏ bớt bộ lọc để xem nhiều kết quả hơn.</p>
                    <Button variant="outline" size="sm" onClick={() => {setSelectedOrigins([]); setSelectedFormats([]); setSelectedPrices([]);}}>
                        Xóa bộ lọc
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="group relative flex flex-col">
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-stone-100 mb-4 cursor-pointer shadow-sm group-hover:shadow-md transition-all duration-300">
                        <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        
                        {/* Tags */}
                        {product.tag && (
                        <div className="absolute top-2 left-2 bg-rust-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded tracking-wider shadow-sm z-10">
                            {product.tag}
                        </div>
                        )}

                        {/* Hover Actions */}
                        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                            <button 
                                onClick={(e) => handleAddToCart(e, product)}
                                className="w-10 h-10 bg-white text-stone-900 rounded-full flex items-center justify-center shadow-lg hover:bg-rust-500 hover:text-white transition-colors"
                            >
                                <ShoppingBag size={18} />
                            </button>
                            <button className="w-10 h-10 bg-white text-stone-900 rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 hover:text-red-500 transition-colors">
                                <Heart size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-1">
                        {product.format && (
                            <span className="text-[10px] text-stone-500 font-bold tracking-widest uppercase border border-stone-200 rounded px-1.5 py-0.5 inline-block mb-1 bg-stone-50">{product.format}</span>
                        )}
                        <h3 className="text-stone-900 font-medium text-base leading-snug group-hover:text-rust-600 transition-colors cursor-pointer line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                        </h3>
                        <div className="pt-1 flex items-center justify-between">
                            <span className="text-stone-900 font-bold">{product.price}</span>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            )}

            {/* Pagination / Load More */}
            {filteredProducts.length > 0 && (
                <div className="mt-20 text-center">
                <span className="text-stone-400 text-xs tracking-widest uppercase block mb-4">Đang hiển thị {filteredProducts.length} sản phẩm</span>
                <div className="w-48 h-1 bg-stone-200 rounded-full mx-auto overflow-hidden">
                    <div className="w-full h-full bg-rust-500"></div>
                </div>
                </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
