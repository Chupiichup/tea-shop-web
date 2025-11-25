
import React from 'react';
import { Button } from './Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Background Image - High Res Mountain Tea View */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transform scale-105 animate-slow-zoom"
        style={{ 
          // Using a new reliable Unsplash ID for "Tea with mountain view" vibe
          backgroundImage: "url('https://images.unsplash.com/photo-1522747776116-64ee03be1dad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=2500&auto=format&fit=crop')"
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col items-start justify-center h-full pt-20">
        <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8 border border-white/20 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-rust-400"></span>
                Welcome to ChuLeaf Co.
            </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 font-light text-white tracking-tight drop-shadow-lg">
            Quán trà nhỏ <br/>
            <span className="font-medium text-rust-100">giữa lòng phố thị</span>
          </h1>
          
          <p className="text-lg md:text-2xl mb-12 font-light text-white leading-relaxed max-w-xl drop-shadow-md text-shadow">
            Một chiếc shop nhỏ, dẫn bạn đến với trà giản dị thôi.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <Button size="lg" variant="white" className="shadow-xl">
              Khám phá menu
            </Button>
            <Button size="lg" variant="primary" className="border border-white/20 bg-rust-500/90 backdrop-blur-sm shadow-xl">
              Đặt mua ngay
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white drop-shadow-md">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};
