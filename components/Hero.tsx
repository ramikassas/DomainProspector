import React, { useState } from 'react';

interface HeroProps {
  onStart: () => void;
  onAnalyze: (domain: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onAnalyze }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAnalyze(input.trim());
    }
  };

  return (
    <div className="relative overflow-hidden py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary-600/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-slate-800 border border-slate-700 text-primary-400 text-sm font-medium">
          🚀 مدعوم بواسطة Gemini 2.5 & 3.0 Pro
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          اكتشف الذهب الرقمي في <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">
            سوق النطاقات
          </span>
        </h1>
        
        <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
          منصة متكاملة لتحليل وتقييم النطاقات، واستخراج المشترين المحتملين بدقة متناهية باستخدام أحدث تقنيات الذكاء الاصطناعي.
        </p>

        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative flex bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
              <input 
                type="text" 
                placeholder="أدخل اسم النطاق (مثال: crypto.com)..." 
                className="flex-grow bg-transparent px-6 py-4 text-white placeholder-slate-500 focus:outline-none text-lg text-left"
                style={{ direction: 'ltr' }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 font-bold transition-colors"
              >
                تحليل
              </button>
            </div>
          </form>
        </div>

        <div className="flex justify-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            تحليل دلالي
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            تقييم أسعار
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            بيانات اتصال
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;