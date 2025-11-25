
import React, { useRef } from 'react';
import { TRENDING_PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const TrendingSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="flex items-end justify-between mb-12">
          <div>
             <h2 className="text-3xl md:text-5xl font-light text-stone-900 mb-4 tracking-tight">Sản Phẩm Nổi Bật</h2>
             <p className="text-stone-500 font-light text-lg max-w-md">Những hương vị được yêu thích nhất mùa này.</p>
          </div>
          
          <div className="flex gap-3">
            <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:border-stone-900 hover:text-white transition-all duration-300 active:scale-95"
            >
                <ChevronLeft size={20} />
            </button>
            <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:border-stone-900 hover:text-white transition-all duration-300 active:scale-95"
            >
                <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TRENDING_PRODUCTS.map((product) => (
            <div key={product.id} className="min-w-[280px] md:min-w-[340px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
