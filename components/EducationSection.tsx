import React from 'react';

const EducationSection: React.FC = () => {
  const topics = [
    {
      title: "أنواع النطاقات",
      icon: "🌐",
      content: "تعرف على الفرق بين Brandjaables، Geo-Domains، Exact Match Domains (EMD)، والنطاقات الرقمية. كل نوع له جمهوره واستراتيجية تسعيره الخاصة."
    },
    {
      title: "تحليل الامتدادات (TLDs)",
      icon: "📈",
      content: "لماذا لا يزال .com هو الملك؟ متى تستخدم .io أو .ai؟ تحليل لنمو الامتدادات الجديدة وكيفية تأثيرها على قيمة النطاق."
    },
    {
      title: "استراتيجيات البيع",
      icon: "🤝",
      content: "كيفية التفاوض، منصات البيع (Sedo, Afternic, Dan)، وكيفية استخدام التسويق المباشر (Outbound) للوصول للمشتري النهائي."
    },
    {
      title: "التقييم الاقتصادي",
      icon: "💰",
      content: "كيف تحدد سعر النطاق؟ عوامل الطول، سهولة النطق، تاريخ النطاق، وقوة الكلمات المفتاحية في محركات البحث."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">أكاديمية المستثمر</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          قبل أن تبدأ في الشراء، تعلم قواعد اللعبة. نقدم لك خلاصة خبرات المحترفين في سوق النطاقات العالمي.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {topics.map((topic, idx) => (
          <div key={idx} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-primary-500/50 transition-all group">
            <div className="flex items-start gap-4">
              <div className="text-4xl bg-slate-900 w-16 h-16 rounded-xl flex items-center justify-center border border-slate-700 group-hover:scale-110 transition-transform">
                {topic.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {topic.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-8 border border-indigo-500/30 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">هل أنت مستعد للبدء؟</h3>
        <p className="text-indigo-200 mb-6">
          استخدم أدواتنا المتقدمة لتحليل أول نطاق لك الآن.
        </p>
      </div>
    </div>
  );
};

export default EducationSection;