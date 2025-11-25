import React from 'react';

export const Newsletter: React.FC = () => {
  return (
    <section className="bg-stone-900 text-white py-24 relative overflow-hidden">
        {/* Background Texture - subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 to-stone-950"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-rust-900/10 blur-3xl rounded-full transform translate-x-1/2"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-light mb-6 tracking-tight">
          Join the ChuLeaf Community
        </h2>
        <p className="text-stone-300 mb-12 max-w-xl mx-auto text-lg font-light">
          Đăng ký để nhận ưu đãi & câu chuyện trà mới mỗi tuần. Mang bình yên về nhà.
        </p>

        <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email address"
            className="px-8 py-4 rounded-full text-stone-900 flex-grow focus:outline-none focus:ring-2 focus:ring-rust-500 placeholder-stone-400 border-none shadow-xl"
            required
          />
          <button
            type="submit"
            className="bg-rust-500 hover:bg-rust-600 text-white font-medium px-10 py-4 rounded-full transition-all shadow-xl hover:shadow-rust-500/20"
          >
            Đăng ký
          </button>
        </form>
        
        <p className="text-xs text-stone-500 mt-8">
            By signing up, you agree to our Terms & Conditions and Privacy Policy.
        </p>
      </div>
    </section>
  );
};