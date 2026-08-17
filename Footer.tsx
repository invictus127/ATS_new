import React from 'react';
import { FileText, Heart, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/10 glass-panel py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-bold">
            <FileText className="w-3.5 h-3.5 text-black" />
          </div>
          <span className="font-bold text-slate-200 font-['Plus_Jakarta_Sans']">
            ResumeIQ – AI Resume Analyzer
          </span>
          <span>© {new Date().getFullYear()}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
            React + TypeScript
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
            Tailwind CSS
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
            FastAPI + PyMuPDF
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">
            Gemini AI
          </span>
        </div>

        <div className="flex items-center space-x-1 text-slate-400">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>100% Client & API Privacy Secured</span>
        </div>

      </div>
    </footer>
  );
};
