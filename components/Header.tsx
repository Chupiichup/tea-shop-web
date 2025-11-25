
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, User, ShoppingBag, ChevronDown, ChevronUp, Clock, ArrowRight } from 'lucide-react';
import { NAV_ITEMS, CATEGORIES, TRENDING_PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  
  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(['Trà xanh', 'Ấm tử sa', 'Quà tặng']);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Use Cart Context
  const { cartCount, openMiniCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        // Only close if it's not containing text
        if (!searchQuery) {
            setIsSearchOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery]);

  useEffect(() => {
      if (isSearchOpen && searchInputRef.current) {
          searchInputRef.current.focus();
      }
  }, [isSearchOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#' || href === '') {
        if (window.location.hash && window.location.hash !== '#') {
            window.location.hash = ''; 
        } 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.location.hash = href;
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
          // Add to recent searches if not exists
          if (!recentSearches.includes(searchQuery)) {
            setRecentSearches(prev => [searchQuery, ...prev].slice(0, 5));
          }
          window.location.hash = `#search?q=${encodeURIComponent(searchQuery.trim())}`;
          setIsSearchOpen(false);
          searchInputRef.current?.blur();
      }
  };

  const toggleSearch = () => {
      setIsSearchOpen(!isSearchOpen);
      if (!isSearchOpen) {
          setTimeout(() => searchInputRef.current?.focus(), 100);
      }
  };

  const toggleMobileExpand = (label: string) => {
    setMobileExpanded(mobileExpanded === label ? null : label);
  };

  // Mock Suggested Products based on search
  const suggestedProducts = searchQuery 
    ? TRENDING_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2)
    : [];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-stone-950 py-3 shadow-md' : 'bg-stone-950 py-4'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="flex items-center justify-between gap-4">
          
          {/* 1. LOGO */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" onClick={(e) => handleNavClick(e, '#')} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-rust-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner group-hover:bg-rust-600 transition-colors">
                c
              </div>
              <span className="text-xl font-bold text-stone-100 tracking-tight group-hover:text-white transition-colors">
                ChuLeaf Co.
              </span>
            </a>
          </div>

          {/* 2. NAVIGATION (Desktop) */}
          <nav className={`hidden xl:flex items-center space-x-6 ${isSearchOpen ? 'opacity-0 pointer-events-none w-0 overflow-hidden' : 'opacity-100'} transition-all duration-300`}>
            {NAV_ITEMS.map((item) => (
              <div 
                key={item.label} 
                className="relative group"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-stone-300 hover:text-white px-2 py-2 font-medium text-sm tracking-wide transition-colors flex items-center gap-1 ${activeDropdown === item.label ? 'text-white' : ''}`}
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} className="opacity-70" />}
                </a>

                {/* DROPDOWN LOGIC */}
                {item.children && (
                  <div 
                    className={`absolute left-0 top-full pt-4 transition-all duration-200 transform origin-top-left z-50 ${
                        activeDropdown === item.label 
                        ? 'opacity-100 scale-100 visible' 
                        : 'opacity-0 scale-95 invisible'
                    }`}
                  >
                    {/* MEGA MENU FOR "SẢN PHẨM" */}
                    {item.label === 'Sản Phẩm' ? (
                         <div className="bg-white rounded-xl shadow-2xl border border-stone-100 overflow-hidden p-8 w-[800px] grid grid-cols-3 gap-x-8 gap-y-12">
                             {/* Map specifically through the first 6 items to ensure 2x3 grid layout 
                                 Indices 0,1,2 = Top Row. Indices 3,4,5 = Bottom Row.
                             */}
                             {item.children.slice(0, 6).map((sub, idx) => (
                                 <div key={idx} className="flex flex-col">
                                     <a href={sub.href} onClick={(e) => handleNavClick(e, sub.href)} className="font-bold text-stone-900 text-base hover:text-rust-600 block mb-3 border-b border-stone-100 pb-2">
                                         {sub.label}
                                     </a>
                                     {sub.children && (
                                         <div className="space-y-2">
                                             {sub.children.map((child, cIdx) => (
                                                 <a 
                                                    key={cIdx} 
                                                    href={child.href} 
                                                    onClick={(e) => handleNavClick(e, child.href)}
                                                    className="block text-sm text-stone-600 hover:text-rust-500 hover:translate-x-1 transition-all"
                                                 >
                                                     {child.label}
                                                 </a>
                                             ))}
                                         </div>
                                     )}
                                 </div>
                             ))}
                         </div>
                    ) : (
                        /* STANDARD DROPDOWN FOR OTHERS (Like Khám Phá) */
                        <div className="bg-white rounded-lg shadow-xl border border-stone-100 overflow-hidden py-2 w-[200px]">
                            {item.children.map((child, idx) => (
                                <a 
                                    key={idx}
                                    href={child.href}
                                    onClick={(e) => handleNavClick(e, child.href)}
                                    className="block px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-rust-600 font-medium"
                                >
                                    {child.label}
                                </a>
                            ))}
                        </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 3. SEARCH BAR (Center/Right) */}
          <div className={`flex-1 relative mx-4 transition-all duration-300 ${isSearchOpen ? 'max-w-3xl' : 'max-w-xs'}`} ref={searchContainerRef}>
              <form onSubmit={handleSearchSubmit} className="relative group">
                  <div className={`relative flex items-center w-full rounded-full transition-all duration-300 border ${
                      isSearchOpen 
                      ? 'bg-stone-800 border-stone-700' 
                      : 'bg-transparent border-transparent hover:bg-stone-800'
                  }`}>
                      {/* Search Icon Trigger when closed */}
                      {!isSearchOpen && (
                          <button 
                            type="button" 
                            onClick={toggleSearch}
                            className="absolute right-0 p-2 text-stone-300 hover:text-white"
                          >
                             <Search size={20} />
                          </button>
                      )}

                      <input 
                        ref={searchInputRef}
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchOpen(true)}
                        placeholder={isSearchOpen ? "Tìm kiếm trà, dụng cụ..." : ""}
                        className={`w-full py-2.5 pl-5 pr-12 rounded-full border-none outline-none font-medium transition-all ${
                            isSearchOpen
                            ? 'opacity-100 visible bg-stone-800 text-white placeholder-stone-400' 
                            : 'opacity-0 invisible w-0'
                        }`}
                      />
                      
                      {isSearchOpen && (
                        <>
                            <button 
                                type="submit"
                                className="absolute right-8 p-2 text-stone-400 hover:text-rust-500"
                            >
                                <Search size={18} />
                            </button>
                            <button 
                                type="button"
                                onClick={() => {setSearchQuery(''); setIsSearchOpen(false);}}
                                className="absolute right-2 p-2 text-stone-400 hover:text-stone-300"
                            >
                                <X size={18} />
                            </button>
                        </>
                      )}
                  </div>

                  {/* SEARCH DROPDOWN */}
                  {isSearchOpen && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-stone-100 overflow-hidden animate-fade-in z-50">
                          
                          {/* Case 1: Typing - Show Suggestions */}
                          {searchQuery ? (
                              <div className="p-4">
                                  <div className="mb-2 text-xs font-bold text-stone-400 uppercase tracking-wider">Gợi ý tìm kiếm</div>
                                  <ul className="mb-4 space-y-1">
                                      <li>
                                          <button className="w-full text-left px-3 py-2 text-stone-700 hover:bg-stone-50 rounded-lg flex items-center gap-2 font-medium">
                                              <Search size={14} className="text-stone-400"/> "{searchQuery}"
                                          </button>
                                      </li>
                                      {/* Mock Categories matching */}
                                      {CATEGORIES.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase())).map(c => (
                                          <li key={c.id}>
                                              <button onClick={() => window.location.hash = c.link} className="w-full text-left px-3 py-2 text-stone-700 hover:bg-stone-50 rounded-lg flex items-center gap-2">
                                                  <span className="w-1.5 h-1.5 bg-rust-500 rounded-full"></span> Danh mục: {c.title}
                                              </button>
                                          </li>
                                      ))}
                                  </ul>

                                  {suggestedProducts.length > 0 && (
                                    <>
                                        <div className="mb-2 text-xs font-bold text-stone-400 uppercase tracking-wider border-t border-stone-100 pt-3">Sản phẩm phù hợp</div>
                                        <div className="grid grid-cols-1 gap-2">
                                            {suggestedProducts.map(p => (
                                                <div key={p.id} className="flex items-center gap-3 p-2 hover:bg-stone-50 rounded-lg cursor-pointer" onClick={() => window.location.hash = `#search?q=${p.name}`}>
                                                    <img src={p.image} className="w-10 h-10 rounded object-cover" alt="" />
                                                    <div>
                                                        <div className="text-sm font-bold text-stone-800">{p.name}</div>
                                                        <div className="text-xs text-stone-500">{p.price}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                  )}
                                  
                                  <button type="submit" className="w-full mt-3 py-3 bg-stone-900 text-white text-sm font-bold rounded-lg hover:bg-rust-500 transition-colors">
                                      Xem tất cả kết quả cho "{searchQuery}"
                                  </button>
                              </div>
                          ) : (
                              /* Case 2: Empty - Show Recent & Popular */
                              <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-stone-100">
                                  <div className="p-5 w-full md:w-1/2">
                                      <div className="mb-3 text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
                                          <Clock size={12} /> Tìm kiếm gần đây
                                      </div>
                                      <ul className="space-y-1">
                                          {recentSearches.map((term, i) => (
                                              <li key={i}>
                                                  <button 
                                                    onClick={() => {setSearchQuery(term); handleSearchSubmit({preventDefault:()=>{}} as any)}}
                                                    className="block w-full text-left px-3 py-2 text-sm text-stone-600 hover:text-rust-600 hover:bg-stone-50 rounded-lg transition-colors"
                                                  >
                                                      {term}
                                                  </button>
                                              </li>
                                          ))}
                                      </ul>
                                  </div>
                                  <div className="p-5 w-full md:w-1/2 bg-stone-50/50">
                                      <div className="mb-3 text-xs font-bold text-stone-400 uppercase tracking-wider">
                                          Xu hướng tìm kiếm
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                          {['Hồng trà', 'Bạch trà', 'Ấm tử sa', 'Quà tết', 'Matcha'].map((tag) => (
                                              <button 
                                                key={tag}
                                                onClick={() => {setSearchQuery(tag); handleSearchSubmit({preventDefault:()=>{}} as any)}}
                                                className="px-3 py-1.5 bg-white border border-stone-200 rounded-full text-xs text-stone-600 hover:border-rust-500 hover:text-rust-500 transition-colors shadow-sm"
                                              >
                                                  {tag}
                                              </button>
                                          ))}
                                      </div>
                                  </div>
                              </div>
                          )}
                      </div>
                  )}
              </form>
          </div>

          {/* 4. ACTIONS (Right) */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <a 
              href="#account"
              onClick={(e) => handleNavClick(e, '#account')}
              className="hidden md:flex items-center gap-2 text-stone-300 hover:text-white px-3 py-2 rounded-full hover:bg-stone-800 transition-colors"
            >
              <User size={20} />
              <span className="text-sm font-medium hidden lg:inline">Tài khoản</span>
            </a>
            
            <button 
                onClick={openMiniCart}
                className="relative flex items-center gap-2 text-stone-300 hover:text-white px-3 py-2 rounded-full hover:bg-stone-800 transition-colors group"
            >
              <ShoppingBag size={20} className="group-hover:text-rust-400 transition-colors" />
              <span className="text-sm font-medium hidden lg:inline">Giỏ hàng</span>
              {cartCount > 0 && (
                  <span className="absolute top-1 right-1 lg:top-1 lg:right-2 bg-rust-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-stone-900">
                      {cartCount}
                  </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden text-stone-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      <div
        className={`xl:hidden fixed inset-0 z-40 bg-stone-950 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } pt-[80px]`}
      >
        <nav className="h-full overflow-y-auto px-6 py-4 pb-20">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => (
                <div key={item.label} className="border-b border-stone-800 last:border-0">
                    <div 
                        className="flex items-center justify-between text-lg font-medium text-stone-200 py-4 cursor-pointer"
                        onClick={() => item.children ? toggleMobileExpand(item.label) : null}
                    >
                        <a 
                            href={item.href}
                            onClick={(e) => {
                                if(!item.children) handleNavClick(e, item.href);
                                else e.preventDefault();
                            }}
                        >
                            {item.label}
                        </a>
                        {item.children && (
                            <button className="p-2 text-stone-500">
                                {mobileExpanded === item.label ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                        )}
                    </div>
                    
                    {/* Mobile Submenu */}
                    {item.children && mobileExpanded === item.label && (
                        <div className="bg-stone-900 rounded-xl mb-4 p-4 space-y-4">
                            {item.children.map((child, idx) => (
                                <div key={idx}>
                                    <a 
                                        href={child.href}
                                        onClick={(e) => handleNavClick(e, child.href)}
                                        className="block text-stone-300 font-medium mb-2 hover:text-rust-400"
                                    >
                                        {child.label}
                                    </a>
                                    {child.children && (
                                        <div className="pl-4 border-l border-stone-700 space-y-2 mt-2">
                                            {child.children.map((sub, sIdx) => (
                                                <a 
                                                    key={sIdx}
                                                    href={sub.href}
                                                    onClick={(e) => handleNavClick(e, sub.href)}
                                                    className="block text-sm text-stone-500 hover:text-white"
                                                >
                                                    {sub.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
             {/* Mobile User Link */}
            <div className="border-b border-stone-800">
                <a 
                  href="#account"
                  onClick={(e) => handleNavClick(e, '#account')}
                  className="flex items-center justify-between text-lg font-medium text-stone-200 py-4"
                >
                    Tài khoản
                </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
