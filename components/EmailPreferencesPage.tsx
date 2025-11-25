
import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from './Button';

export const EmailPreferencesPage: React.FC = () => {
  const inputClass = "w-full px-4 py-3 rounded-md bg-white border border-stone-200 focus:border-rust-500 outline-none transition-colors text-stone-900";
  const labelClass = "block text-sm font-bold text-stone-900 mb-1";

  return (
    <div className="bg-white min-h-screen pt-[80px]">
        {/* Header Banner */}
        <div className="bg-stone-950 py-12 relative overflow-hidden">
             {/* Background graphic simulation */}
             <div className="absolute top-0 right-0 h-full w-1/2 opacity-20 bg-[url('https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
             
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <a href="#account" className="inline-flex items-center gap-2 text-stone-400 hover:text-white mb-6 text-sm font-bold transition-colors">
                    <ArrowLeft size={16} /> Back to My Account
                </a>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Email preferences
                </h1>
                <p className="text-stone-400 font-light mt-2">Opt in and manage your email subscription notification preferences.</p>
            </div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 py-16 flex flex-col lg:flex-row gap-16">
            
            <div className="flex-1 max-w-2xl">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-stone-900 mb-4">Email preferences</h2>
                    <p className="text-stone-600 mb-2">Sign up to receive marketing email from T2 Tea.</p>
                    {/* Illustration placeholder */}
                    <div className="w-full h-48 bg-stone-50 rounded-xl my-6 flex items-center justify-center border border-stone-100 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=600&auto=format&fit=crop" alt="Tea Illustration" className="w-full h-full object-cover opacity-80" />
                    </div>
                </div>

                <form className="space-y-6">
                    <div>
                        <label className={labelClass}>Email<span className="text-red-500">*</span></label>
                        <input type="email" defaultValue="chuthao112@gmail.com" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>First name</label>
                        <input type="text" defaultValue="Thao" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Last name</label>
                        <input type="text" defaultValue="Chu" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Country<span className="text-red-500">*</span></label>
                        <p className="text-xs text-stone-500 mb-2">To ensure you receive relevant communications, please select your country.</p>
                        <select className={inputClass}>
                            <option>Singapore</option>
                            <option>Vietnam</option>
                            <option>Australia</option>
                        </select>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-stone-100 mt-6">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="mt-0.5 w-5 h-5 rounded border border-stone-300 bg-white flex items-center justify-center transition-colors group-hover:border-rust-500">
                                <Check size={14} className="text-transparent group-hover:text-stone-200" /> 
                                {/* Assuming checked state logic here, simplistic for static view */}
                            </div>
                            <input type="checkbox" className="hidden" />
                            <span className="text-stone-600 text-sm leading-snug">
                                Yes! Sign me up to receive communications from Tea Society including discounts, VIP early access to sale events, the first look at new items and more
                            </span>
                        </label>
                         <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="mt-0.5 w-5 h-5 rounded border border-stone-300 bg-white flex items-center justify-center transition-colors">
                            </div>
                            <input type="checkbox" className="hidden" />
                            <span className="text-stone-600 text-sm leading-snug">
                                I agree to T2's Terms and Conditions and Privacy Policy
                            </span>
                        </label>
                    </div>

                    <div className="pt-6">
                        <Button fullWidth size="lg">Subscribe</Button>
                    </div>

                    <div className="text-center pt-4">
                        <button type="button" className="text-stone-500 underline text-sm hover:text-stone-900">
                            Unsubscribe from all T2 Tea marketing notifications
                        </button>
                    </div>
                </form>

                 <div className="mt-12 pt-8 border-t border-stone-200 flex items-start gap-3">
                    <div className="bg-stone-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold font-serif flex-shrink-0 mt-0.5">i</div>
                    <p className="text-xs text-stone-500">Please note we'll still send you order and account information by email, post and text message.</p>
                 </div>
            </div>

            {/* Right sidebar space (optional, kept empty for layout balance like screenshot) */}
            <div className="hidden lg:block lg:w-1/3"></div>
        </div>
    </div>
  );
};
