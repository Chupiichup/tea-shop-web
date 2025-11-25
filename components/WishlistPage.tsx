
import React, { useState } from 'react';
import { ArrowLeft, Trash2, ShoppingBag, Share2 } from 'lucide-react';
import { Button } from './Button';
import { formatPrice } from '../utils';

export const WishlistPage: React.FC = () => {
  // Mock Data
  const [items, setItems] = useState([
    {
        id: 'w1',
        name: 'Toulouse Small Teapot Midnight',
        price: 88000,
        originalPrice: 0,
        category: 'Teapots',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400&auto=format&fit=crop'
    },
    {
        id: 'w2',
        name: 'Gorgeous Geisha Tea Bag Cube 25 pack',
        price: 21000,
        originalPrice: 26000,
        category: 'Green Tea | Tea Bag | Cube 25pk',
        tag: 'Take 20% off!',
        image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=400&auto=format&fit=crop'
    },
    {
        id: 'w3',
        name: 'Gorgeous Geisha Loose Leaf Cube 100g',
        price: 21000,
        originalPrice: 0,
        category: 'Green Tea | Loose Leaf | Cube 100g-3.5oz',
        image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=400&auto=format&fit=crop'
    }
  ]);

  const removeItem = (id: string) => {
      setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="bg-white min-h-screen pt-[80px]">
      {/* Header Banner */}
      <div className="bg-stone-950 py-12">
        <div className="container mx-auto px-6 lg:px-12">
            <a href="#account" className="inline-flex items-center gap-2 text-stone-400 hover:text-white mb-6 text-sm font-bold transition-colors">
                <ArrowLeft size={16} /> Back to My Account
            </a>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
                <span className="text-rust-500">Thao's</span> Wishlist
            </h1>
            <p className="text-stone-400 font-light mt-2">View and manage the items in your wishlist.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12">
          <div className="space-y-4">
              {/* Tools Bar */}
              <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-6">
                  <h2 className="text-2xl font-bold text-stone-900">My Items ({items.length})</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Share2 size={16} /> Share list
                    </Button>
                  </div>
              </div>

              {/* List */}
              <div className="space-y-6">
                  {items.map(item => (
                      <div key={item.id} className="flex flex-col md:flex-row gap-6 border-b border-stone-100 pb-6 items-start md:items-center group">
                          {/* Image */}
                          <div className="w-full md:w-32 md:h-32 bg-stone-50 rounded-lg overflow-hidden flex-shrink-0 relative">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                          </div>
                          
                          {/* Details */}
                          <div className="flex-1">
                              <h3 className="font-bold text-stone-900 text-lg mb-1">{item.name}</h3>
                              <p className="text-xs text-stone-500 mb-2">{item.category}</p>
                              
                              {item.tag && (
                                  <span className="inline-block text-[10px] font-bold text-rust-600 uppercase tracking-wider mb-2">
                                      {item.tag}
                                  </span>
                              )}

                              <div className="flex gap-4 mt-2">
                                  <button onClick={() => removeItem(item.id)} className="flex items-center gap-1 text-xs font-bold text-stone-500 hover:text-red-500 transition-colors">
                                      <Trash2 size={14} /> Remove
                                  </button>
                              </div>
                          </div>

                          {/* Price & Action */}
                          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                              <div className="text-right">
                                  <span className="block font-bold text-stone-900 text-lg">{formatPrice(item.price)}</span>
                                  {item.originalPrice > 0 && (
                                      <span className="block text-xs text-stone-400 line-through">Was: {formatPrice(item.originalPrice)}</span>
                                  )}
                              </div>
                              <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap hover:bg-rust-500 hover:text-white hover:border-rust-500">
                                  <ShoppingBag size={16} /> Add to cart
                              </Button>
                          </div>
                      </div>
                  ))}
              </div>
              
              {items.length === 0 && (
                   <div className="text-center py-20 bg-stone-50 rounded-2xl">
                       <p className="text-stone-500 mb-4 text-lg">Your wishlist is empty.</p>
                       <p className="text-stone-400 text-sm mb-6">The perfect cuppa is just a wish away.</p>
                       <Button onClick={() => window.location.hash = '#'} className="px-8">Go Shopping</Button>
                   </div>
              )}
          </div>
      </div>
    </div>
  );
};
