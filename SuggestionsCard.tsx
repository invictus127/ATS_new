import React from 'react';
import { Lightbulb, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { SuggestionItem } from './resume';
interface SuggestionsCardProps {
  suggestions: string[];
}

export const SuggestionsCard: React.FC<SuggestionsCardProps> = ({ suggestions }) => {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-glass space-y-4">
      <div className="flex items-center space-x-3">
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center space-x-2">
            <span>Improvement Suggestions</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              {suggestions.length} Action Items
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Tailored recommendations to maximize recruiter response rate & ATS parser scores
          </p>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        {suggestions.map((item, idx) => {
          const isCheck = item.startsWith('✓') || item.startsWith('🎉');
          const isWarning = item.startsWith('⚠️') || item.startsWith('❌');

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex items-start space-x-3 transition-all ${
                isCheck
                  ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-200'
                  : isWarning
                  ? 'bg-amber-500/5 border-amber-500/20 text-amber-200'
                  : 'bg-slate-900/60 border-slate-800 text-slate-200'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {isCheck ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isWarning ? (
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                )}
              </div>
              <p className="text-xs font-medium leading-relaxed">
                {item}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
