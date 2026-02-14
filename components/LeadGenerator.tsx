import React, { useState, useEffect } from 'react';
import { generateLeads, verifyLocation } from '../services/geminiService';
import { Lead } from '../types';

interface LeadGeneratorProps {
  initialDomain: string;
}

const LeadGenerator: React.FC<LeadGeneratorProps> = ({ initialDomain }) => {
  const [domain, setDomain] = useState(initialDomain);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState('');
  const [verifiedLocations, setVerifiedLocations] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialDomain && leads.length === 0 && !loading) {
      handleGenerate();
    }
  }, [initialDomain]);

  const handleGenerate = async () => {
    if (!domain) return;
    setLoading(true);
    setError('');
    setLeads([]);
    setVerifiedLocations({});

    try {
      const results = await generateLeads(domain);
      setLeads(results);
    } catch (err) {
      setError('لم نتمكن من العثور على عملاء في الوقت الحالي. حاول مرة أخرى لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyLocation = async (company: string, location: string, index: number) => {
      // Optimistic UI update or simple loading state could be added here
      const result = await verifyLocation(company, location);
      setVerifiedLocations(prev => ({...prev, [index]: result}));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-800 rounded-2xl p-8 mb-8 border border-slate-700">
          <h2 className="text-2xl font-bold mb-4">محرك صيد العملاء المحتملين</h2>
          <p className="text-slate-400 mb-6">
            نقوم بمسح الويب للعثور على شركات تستخدم اسم النطاق الخاص بك بامتدادات أضعف، أو تعمل في قطاعات ذات صلة مباشرة.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4">
             <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="flex-grow bg-slate-900 border border-slate-600 rounded-xl px-5 py-3 text-lg focus:border-primary-500 focus:outline-none"
              style={{ direction: 'ltr' }}
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center justify-center min-w-[160px]"
            >
              {loading ? 'جاري البحث...' : 'بحث عن عملاء'}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-xl border border-red-900/50">
            {error}
          </div>
        )}

        {leads.length > 0 && (
          <div className="grid gap-6">
            {leads.map((lead, idx) => (
              <div key={idx} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-indigo-500/50 transition-all">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  
                  {/* Company Info */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{lead.companyName}</h3>
                      <span className="bg-slate-700 text-xs px-2 py-1 rounded text-slate-300">{lead.industry}</span>
                    </div>
                    <a href={lead.website} target="_blank" rel="noreferrer" className="text-primary-400 hover:underline text-sm mb-4 block dir-ltr" style={{direction: 'ltr', textAlign: 'right'}}>
                      {lead.website}
                    </a>
                    
                    <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-500/20 mb-4">
                      <span className="text-indigo-300 font-bold block mb-1">لماذا هم مشتر محتمل؟</span>
                      <p className="text-slate-300 text-sm">{lead.matchReason}</p>
                    </div>

                    <div className="flex gap-4 text-sm text-slate-400">
                      {lead.location && (
                        <div className="flex items-center gap-1">
                          <span>📍</span> {lead.location}
                           <button 
                             onClick={() => handleVerifyLocation(lead.companyName, lead.location, idx)}
                             className="text-xs text-primary-500 underline mr-2 hover:text-primary-400"
                           >
                             (تحقق من العنوان)
                           </button>
                        </div>
                      )}
                    </div>
                    
                    {verifiedLocations[idx] && (
                         <div className="mt-2 text-xs text-emerald-400 bg-emerald-900/20 p-2 rounded">
                             ✅ {verifiedLocations[idx]}
                         </div>
                    )}
                  </div>

                  {/* Contact Info & Action */}
                  <div className="lg:w-80 bg-slate-900/50 rounded-xl p-5 border border-slate-700 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                         <span className="text-sm font-semibold text-slate-400">معدل التطابق</span>
                         <span className={`text-lg font-bold ${lead.matchScore > 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                           {lead.matchScore}%
                         </span>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        {lead.contactPerson && (
                          <div className="flex items-start gap-2 text-sm">
                            <span>👤</span>
                            <span className="text-white">{lead.contactPerson}</span>
                          </div>
                        )}
                         {lead.email && (
                          <div className="flex items-start gap-2 text-sm">
                            <span>📧</span>
                            <span className="text-primary-400 break-all">{lead.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                      تجهيز مسودة رسالة
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadGenerator;