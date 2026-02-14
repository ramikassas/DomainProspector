import React, { useState, useEffect } from 'react';
import { appraiseDomain } from '../services/geminiService';
import { DomainAppraisal } from '../types';

interface AppraisalToolProps {
  initialDomain: string;
  onFindLeads: (domain: string) => void;
}

const AppraisalTool: React.FC<AppraisalToolProps> = ({ initialDomain, onFindLeads }) => {
  const [domain, setDomain] = useState(initialDomain);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DomainAppraisal | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialDomain && !result && !loading) {
      handleAppraise();
    }
  }, [initialDomain]);

  const handleAppraise = async () => {
    if (!domain) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await appraiseDomain(domain);
      setResult(data);
    } catch (err) {
      setError('حدث خطأ أثناء التقييم. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (rating: string) => {
    switch(rating) {
      case 'Premium': return 'text-purple-400';
      case 'High': return 'text-emerald-400';
      case 'Moderate': return 'text-yellow-400';
      case 'Low': return 'text-slate-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold mb-6">تقييم النطاق المتقدم</h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="flex-grow bg-slate-900 border border-slate-600 rounded-xl px-5 py-3 text-lg focus:border-primary-500 focus:outline-none"
              style={{ direction: 'ltr' }}
            />
            <button
              onClick={handleAppraise}
              disabled={loading}
              className="bg-primary-600 hover:bg-primary-500 disabled:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري التحليل العميق...
                </>
              ) : 'تقييم الآن'}
            </button>
          </div>
          <p className="text-sm text-slate-400">
            يستخدم هذا النظام Gemini 3 Pro (Thinking) لتحليل مبيعات السوق الحقيقية واتجاهات البحث.
          </p>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-4 rounded-xl mb-8">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-fade-in">
            {/* Main Valuation Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-purple-500"></div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">القيمة التقديرية (End User)</h3>
                  <div className="text-5xl font-bold text-white font-mono">
                    ${result.estimatedValue.toLocaleString()}
                  </div>
                </div>
                <div className={`text-2xl font-bold px-6 py-2 rounded-lg bg-slate-800 border border-slate-600 ${getRatingColor(result.rating)}`}>
                  {result.rating} Quality
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-lg">تحليل الذكاء الاصطناعي:</h4>
                <p className="text-slate-300 leading-relaxed bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  {result.reasoning}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {result.keywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Data Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Comparable Sales */}
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>📊</span> مبيعات مشابهة
                </h3>
                <div className="space-y-3">
                  {result.comparableSales.map((sale, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                      <span className="font-medium text-slate-200" style={{direction: 'ltr'}}>{sale.domain}</span>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">${sale.price.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">{sale.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trends & Metrics */}
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>📈</span> مؤشرات السوق
                </h3>
                <div className="mb-6">
                  <div className="text-sm text-slate-400 mb-1">حجم البحث الشهري</div>
                  <div className="text-xl font-semibold text-white">{result.searchVolume}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-2">اتجاهات ذات صلة</div>
                  <ul className="space-y-2">
                    {result.marketTrends.map((trend, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                        {trend}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button 
                onClick={() => onFindLeads(domain)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-12 rounded-xl shadow-lg shadow-emerald-900/50 transition-all hover:scale-105"
              >
                بحث عن مشترين لهذا النطاق 🎯
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppraisalTool;