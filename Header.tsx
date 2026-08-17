import React from 'react';
import { FileText, Sparkles, Download, RefreshCw, Layers } from 'lucide-react';
import { AnalysisResponse } from './resume';
import { exportAnalysisToPdf, exportAnalysisToJson } from './exportReport';

interface HeaderProps {
  onLoadSample: () => void;
  onReset: () => void;
  analysisData: AnalysisResponse | null;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onLoadSample,
  onReset,
  analysisData,
  isLoading
}) => {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo & Brand Name */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 shadow-glow-cyan">
            <FileText className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0B0F19] animate-pulse"></span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight text-white font-['Plus_Jakarta_Sans']">
                Resume<span className="text-gradient font-black">IQ</span>
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                AI Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              ATS Score & Job Description Matcher
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {analysisData && (
            <>
              <button
                onClick={() => exportAnalysisToJson(analysisData)}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg glass-badge text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all flex items-center space-x-1.5"
                title="Export JSON Report"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Export JSON</span>
              </button>

              <button
                onClick={() => exportAnalysisToPdf(analysisData)}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:brightness-110 transition-all shadow-glow-cyan flex items-center space-x-1.5 font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Export PDF</span>
              </button>

              <button
                onClick={onReset}
                className="p-2 rounded-lg glass-badge text-slate-400 hover:text-white transition-all"
                title="Reset Upload"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </>
          )}

          {!analysisData && (
            <button
              onClick={onLoadSample}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-500/40 transition-all flex items-center space-x-2 shadow-sm"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Try Demo Resume</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
