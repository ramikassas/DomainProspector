import React from 'react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const navItemClass = (view: ViewState) => 
    `px-4 py-2 rounded-lg transition-colors font-medium ${
      currentView === view 
        ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/50' 
        : 'text-slate-300 hover:text-white hover:bg-slate-800'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => onNavigate(ViewState.HOME)}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
            DP
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 hidden sm:block">
            DomainProspector
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate(ViewState.EDUCATION)}
            className={navItemClass(ViewState.EDUCATION)}
          >
            تعليم
          </button>
          <button 
            onClick={() => onNavigate(ViewState.APPRAISAL)}
            className={navItemClass(ViewState.APPRAISAL)}
          >
            تقييم
          </button>
          <button 
            onClick={() => onNavigate(ViewState.LEADS)}
            className={navItemClass(ViewState.LEADS)}
          >
            عملاء
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;