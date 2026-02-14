import React, { useState } from 'react';
import { ViewState } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EducationSection from './components/EducationSection';
import AppraisalTool from './components/AppraisalTool';
import LeadGenerator from './components/LeadGenerator';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [targetDomain, setTargetDomain] = useState<string>('');

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyze = (domain: string) => {
    setTargetDomain(domain);
    setCurrentView(ViewState.APPRAISAL);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {currentView === ViewState.HOME && (
          <>
            <Hero onStart={() => handleNavigate(ViewState.EDUCATION)} onAnalyze={handleAnalyze} />
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-primary-500 transition-colors cursor-pointer" onClick={() => handleNavigate(ViewState.EDUCATION)}>
                        <div className="text-4xl mb-4">📚</div>
                        <h3 className="text-xl font-bold mb-2">تعلم المجال</h3>
                        <p className="text-slate-400">فهم شامل لسوق النطاقات، الأنواع، واستراتيجيات الاستثمار الناجح.</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-primary-500 transition-colors cursor-pointer" onClick={() => handleNavigate(ViewState.APPRAISAL)}>
                         <div className="text-4xl mb-4">💎</div>
                        <h3 className="text-xl font-bold mb-2">تقييم ذكي</h3>
                        <p className="text-slate-400">نظام تقييم دقيق يعتمد على بيانات السوق الحقيقية وخوارزميات الذكاء الاصطناعي.</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-primary-500 transition-colors cursor-pointer" onClick={() => handleNavigate(ViewState.LEADS)}>
                         <div className="text-4xl mb-4">🎯</div>
                        <h3 className="text-xl font-bold mb-2">صيد العملاء</h3>
                        <p className="text-slate-400">استخراج عملاء محتملين بدقة عالية مع بيانات الاتصال وأسباب الشراء.</p>
                    </div>
                </div>
            </div>
          </>
        )}

        {currentView === ViewState.EDUCATION && <EducationSection />}
        
        {currentView === ViewState.APPRAISAL && (
          <AppraisalTool 
            initialDomain={targetDomain} 
            onFindLeads={(domain) => {
              setTargetDomain(domain);
              setCurrentView(ViewState.LEADS);
            }} 
          />
        )}
        
        {currentView === ViewState.LEADS && (
          <LeadGenerator initialDomain={targetDomain} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;