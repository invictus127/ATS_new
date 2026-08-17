import React, { useState } from 'react';
import { Sparkles, MessageSquare, ArrowRight, Wand2, Copy, Check } from 'lucide-react';
import { ImprovedBullet } from './resume';

interface AiInsightsCardProps {
  aiSummary?: string;
  interviewQuestions: string[];
  improvedBullets: ImprovedBullet[];
}

export const AiInsightsCard: React.FC<AiInsightsCardProps> = ({
  aiSummary,
  interviewQuestions,
  improvedBullets
}) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-glass space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 text-white shadow-glow-purple">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center space-x-2">
            <span>AI Copilot & Smart Insights</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
              Gemini Powered
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Professional executive summary, tailored interview prep questions, and bullet point optimizer
          </p>
        </div>
      </div>

      {/* 1. AI Executive Summary */}
      {aiSummary && (
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5 font-['Plus_Jakarta_Sans']">
            <Wand2 className="w-4 h-4" />
            <span>AI Professional Summary</span>
          </h4>
          <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            "{aiSummary}"
          </p>
        </div>
      )}

      {/* 2. Bullet Point Optimizer */}
      {improvedBullets.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center space-x-1.5 font-['Plus_Jakarta_Sans']">
            <Sparkles className="w-4 h-4" />
            <span>Resume Bullet Point Optimizer (Original vs ATS Rewrites)</span>
          </h4>

          <div className="space-y-3">
            {improvedBullets.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-rose-400">
                  <span className="font-bold text-[10px] uppercase bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">Original</span>
                  <span className="text-slate-400 line-through">{item.original}</span>
                </div>

                <div className="flex items-start justify-between space-x-2 text-emerald-300 pt-1">
                  <div className="flex items-start space-x-2">
                    <span className="font-bold text-[10px] uppercase bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-400 mt-0.5">Improved</span>
                    <span className="font-medium text-slate-100">{item.improved}</span>
                  </div>

                  <button
                    onClick={() => handleCopy(item.improved, idx)}
                    className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 flex-shrink-0"
                    title="Copy Improved Bullet"
                  >
                    {copiedIdx === idx ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Tailored Interview Questions */}
      {interviewQuestions.length > 0 && (
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center space-x-1.5 font-['Plus_Jakarta_Sans']">
            <MessageSquare className="w-4 h-4" />
            <span>AI-Predicted Interview Questions</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {interviewQuestions.map((q, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
                <span className="font-bold text-cyan-400 flex-shrink-0">Q{idx + 1}.</span>
                <p className="leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
