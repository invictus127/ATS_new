import React, { useState } from 'react';
import { Briefcase, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { SAMPLE_JOB_DESCRIPTION } from './sampleData';

interface JobDescriptionInputProps {
  jobDescription: string;
  onChange: (value: str) => void;
  onAnalyzeMatch: () => void;
  isLoading: boolean;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  jobDescription,
  onChange,
  onAnalyzeMatch,
  isLoading
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFillSample = () => {
    onChange(SAMPLE_JOB_DESCRIPTION);
    setIsExpanded(true);
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/10 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center space-x-2">
              <span>Target Job Description</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                Keyword & Skill Gap Analyzer
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Paste the target job post to calculate match percentage & missing keywords
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleFillSample}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 transition-all"
          >
            Load Sample JD
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg text-slate-400 hover:text-white"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3 pt-3 border-t border-white/5">
          <textarea
            rows={5}
            value={jobDescription}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste Job Description here (e.g. Seeking Senior Software Engineer with Python, React, Docker...)"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/60 placeholder:text-slate-600 resize-y"
          />

          <div className="flex justify-end">
            <button
              onClick={onAnalyzeMatch}
              disabled={isLoading || !jobDescription.trim()}
              className="px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:brightness-110 disabled:opacity-50 shadow-glow-purple flex items-center space-x-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>Calculate Job Match %</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
