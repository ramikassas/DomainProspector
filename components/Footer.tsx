import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">DomainProspector</h2>
            <p className="text-slate-400 max-w-sm">
              أداتك الأولى للاستثمار في النطاقات. نستخدم الذكاء الاصطناعي لتحويل البيانات إلى فرص استثمارية حقيقية.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-primary-400 cursor-pointer">الرئيسية</li>
              <li className="hover:text-primary-400 cursor-pointer">المدونة التعليمية</li>
              <li className="hover:text-primary-400 cursor-pointer">أدوات التحليل</li>
              <li className="hover:text-primary-400 cursor-pointer">الأسعار</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">قانوني</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-primary-400 cursor-pointer">سياسة الخصوصية</li>
              <li className="hover:text-primary-400 cursor-pointer">شروط الاستخدام</li>
              <li className="hover:text-primary-400 cursor-pointer">إخلاء مسؤولية</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-900 text-center text-slate-600 text-sm">
          © {new Date().getFullYear()} DomainProspector. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
};

export default Footer;