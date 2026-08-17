import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Target } from 'lucide-react';
import { JobDescriptionMatch } from '../types/resume';

interface SkillGapCardProps {
  jdMatch?: JobDescriptionMatch;
}

export const SkillGapCard: React.FC<SkillGapCardProps> = ({ jdMatch }) => {
  if (!jdMatch) {
    return (
      <div className="glass-panel rounded-2xl p-6 border border-white/10 text-center space-y-3">
        <Target className="w-8 h-8 text-purple-400 mx-auto" />
        <h3 className="text-base font-bold text-white">Job Description Skill Gap Analysis</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Paste a target job description in the box above to see missing skills, keyword match percentage, and customized ATS optimization targets.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-glass space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center space-x-2">
            <Target className="w-5 h-5 text-purple-400" />
            <span>Keyword Match & Skill Gap</span>
          </h3>
          <p className="text-xs text-slate-400">
            Comparing your resume against target Job Description requirements
          </p>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-purple-400 font-['Plus_Jakarta_Sans']">
            {jdMatch.match_percentage}%
          </span>
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Keyword Match Rate
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing Skills Section */}
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-3">
          <div className="flex items-center justify-between text-rose-400 border-b border-rose-500/20 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
              <XCircle className="w-4 h-4" />
              <span>Missing Skills ({jdMatch.missing_skills.length})</span>
            </h4>
            <span className="text-[10px] bg-rose-500/20 px-2 py-0.5 rounded text-rose-300">High Impact</span>
          </div>

          {jdMatch.missing_skills.length === 0 ? (
            <p className="text-xs text-emerald-400 font-medium">
              🎉 Outstanding! Your resume covers all required skills listed in the job description.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {jdMatch.missing_skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30"
                >
                  <span className="font-black text-rose-400">✗</span>
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Matched Skills Section */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
          <div className="flex items-center justify-between text-emerald-400 border-b border-emerald-500/20 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4" />
              <span>Matched Skills ({jdMatch.matched_skills.length})</span>
            </h4>
            <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">Verified</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {jdMatch.matched_skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
              >
                <span className="font-black text-emerald-400">✓</span>
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Matched & Missing Keywords Tags */}
      {jdMatch.missing_keywords.length > 0 && (
        <div className="pt-2 text-xs space-y-2">
          <span className="text-slate-400 font-medium">Recommended Keywords to add: </span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {jdMatch.missing_keywords.map((kw, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                +{kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
