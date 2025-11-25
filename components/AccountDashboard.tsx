
import React, { useState } from 'react';
import { Gift, Package, Heart, Mail, User, X, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { formatPrice } from '../utils';

export const AccountDashboard: React.FC = () => {
  const [showBirthdayBanner, setShowBirthdayBanner] = useState(true);

  const mockWishlist = [
    {
        id: 'w1',
        name: 'Toulouse Small Teapot Midnight',
        price: 88000,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400&auto=format&fit=crop'
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-[80px]">
      {/* 1. Hero / Welcome Banner */}
      <div className="relative bg-stone-950 text-white overflow-hidden h-[300px] flex items-center">
         <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=2000&auto=format&fit=crop" 
                alt="Tea Leaves" 
                className="w-full h-full object-cover opacity-40"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent"></div>
         </div>
         
         <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col justify-center h-full">
             {/* T2 Society Logo -> Brand Logo */}
             <div className="flex flex-col items-center justify-center mb-6">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-rust-600 font-bold text-3xl shadow-lg mb-2">
                     c
                 </div>
                 <span className="text-white/90 font-bold text-lg tracking-wider">ChuLeaf Co.</span>
             </div>
             
             <h1 className="text-4xl md:text-5xl font-bold mb-2">
                 Hello <span className="text-rust-500">Thao</span>
             </h1>
             <p className="text-stone-300 text-lg font-light">Manage your Tea Society membership</p>
         </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12 -mt-16 relative z-20">
          
          {/* Birthday Banner */}
          {showBirthdayBanner && (
              <div className="bg-white rounded-lg shadow-xl p-6 mb-8 flex items-start justify-between border-l-4 border-rust-500 animate-fade-in-up">
                  <div className="flex gap-4">
                      <div className="w-12 h-12 bg-rust-50 rounded-full flex items-center justify-center text-rust-600 flex-shrink-0">
                          <Gift size={24} />
                      </div>
                      <div>
                          <h3 className="font-bold text-stone-900 text-lg">Is your Birthday Coming up?</h3>
                          <p className="text-stone-500 font-light text-sm mb-3">Let us know when to send you a surprise.</p>
                          <a href="#account-details" className="text-rust-600 font-bold text-sm hover:underline flex items-center gap-1">
                              Add my birthday <ArrowRight size={14} />
                          </a>
                      </div>
                  </div>
                  <button onClick={() => setShowBirthdayBanner(false)} className="text-stone-400 hover:text-stone-900">
                      <X size={20} />
                  </button>
              </div>
          )}

          <div className="space-y-6">
              
              {/* Orders Section */}
              <div className="bg-white rounded-lg shadow-sm border border-stone-100 p-8">
                  <h2 className="text-2xl font-bold text-stone-900 mb-2">Orders</h2>
                  <p className="text-stone-500 font-light mb-8">View your order history</p>
                  
                  <div className="text-center py-8">
                      <p className="text-stone-400 mb-6">You have zero transactions!</p>
                      <Button onClick={() => window.location.hash = '#'} variant="outline">Get sipping</Button>
                  </div>
              </div>

              {/* Wishlist Section */}
              <div className="bg-white rounded-lg shadow-sm border border-stone-100 p-8">
                  <h2 className="text-2xl font-bold text-stone-900 mb-2">Wishlist</h2>
                  <p className="text-stone-500 font-light mb-6">View and manage the items in your wishlist.</p>

                  {mockWishlist.length > 0 ? (
                       <div className="mb-6">
                           {mockWishlist.map(item => (
                               <div key={item.id} className="flex items-center gap-4 mb-4 p-4 bg-stone-50 rounded-lg">
                                   <img src={item.image} alt="" className="w-16 h-16 object-cover rounded" />
                                   <div>
                                       <h4 className="font-bold text-stone-900">{item.name}</h4>
                                       <p className="text-sm text-stone-500">{formatPrice(item.price)}</p>
                                   </div>
                               </div>
                           ))}
                           <Button onClick={() => window.location.hash = '#wishlist'} variant="outline" fullWidth>See full list</Button>
                       </div>
                  ) : (
                    <div className="text-center py-8">
                        <p className="text-stone-400 mb-6">Your wishlist is empty!</p>
                        <p className="text-stone-400 mb-6 text-sm">The perfect cuppa is just a wish away.</p>
                        <Button onClick={() => window.location.hash = '#'} variant="outline">Wish, click and sip</Button>
                    </div>
                  )}
              </div>

              {/* Menu Links */}
              <div className="bg-white rounded-lg shadow-sm border border-stone-100 overflow-hidden divide-y divide-stone-100">
                  <a href="#email-preferences" className="flex items-center justify-between p-6 hover:bg-stone-50 transition-colors group">
                      <div>
                          <h3 className="font-bold text-stone-900 text-lg group-hover:text-rust-600 transition-colors">Email preferences</h3>
                          <p className="text-stone-500 font-light text-sm">Opt in and manage your email subscription notification preferences.</p>
                      </div>
                      <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                          Update preferences <ArrowRight size={16} />
                      </div>
                  </a>

                  <a href="#account-details" className="flex items-center justify-between p-6 hover:bg-stone-50 transition-colors group">
                      <div>
                          <h3 className="font-bold text-stone-900 text-lg group-hover:text-rust-600 transition-colors">My details</h3>
                          <p className="text-stone-500 font-light text-sm">View and manage your account details.</p>
                      </div>
                      <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                          Edit your details <ArrowRight size={16} />
                      </div>
                  </a>
                  
                  {/* Payment Removed as requested */}
              </div>
              
              <div className="text-center pt-8">
                  <button onClick={() => window.location.hash = '#login'} className="text-stone-500 hover:text-rust-600 font-medium underline text-sm">
                      Log out
                  </button>
              </div>

          </div>
      </div>
    </div>
  );
};
