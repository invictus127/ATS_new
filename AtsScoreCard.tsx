import React from 'react';
import { ShieldCheck, Award, Star, Info } from 'lucide-react';
import { AtsScoreBreakdown } from '../types/resume';

interface AtsScoreCardProps {
  score: number;
  quality: string;
  breakdown: AtsScoreBreakdown;
}

export const AtsScoreCard: React.FC<AtsScoreCardProps> = ({
  score,
  quality,
  breakdown
}) => {
  // Determine star rating based on score
  const stars = Math.min(5, Math.max(1, Math.round(score / 20)));

  // Determine radial gauge color
  const getGaugeColor = (val: number) => {
    if (val >= 85) return '#00F2FE'; // Cyan
    if (val >= 70) return '#10B981'; // Emerald
    if (val >= 50) return '#F59E0B'; // Amber
    return '#F43F5E'; // Rose
  };

  const gaugeColor = getGaugeColor(score);
  const strokeDashoffset = 283 - (283 * score) / 100;

  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/10 shadow-glass">
      
      {/* Background Radial Glow */}
      <div 
        className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: gaugeColor }}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
            Overall ATS Score
          </h2>
        </div>
        <span 
          className="px-3 py-1 text-xs font-extrabold rounded-full border shadow-sm"
          style={{ 
            color: gaugeColor,
            borderColor: `${gaugeColor}40`,
            backgroundColor: `${gaugeColor}15`
          }}
        >
          {quality}
        </span>
      </div>

      {/* Main Circular Radial Gauge */}
      <div className="my-6 flex flex-col items-center justify-center relative">
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Track Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              className="text-slate-800"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Animated Score Bar */}
            <circle
              cx="50"
              cy="50"
              r="45"
              strokeWidth="8"
              stroke={gaugeColor}
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
              style={{ filter: `drop-shadow(0 0 8px ${gaugeColor}80)` }}
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
              {score}
            </span>
            <span className="text-xs font-semibold text-slate-400">out of 100</span>

            {/* Star Rating Display */}
            <div className="flex items-center space-x-1 mt-1">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <Star
                  key={starIndex}
                  className={`w-3.5 h-3.5 ${
                    starIndex <= stars
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Score Breakdown Pillars */}
      <div className="space-y-3 pt-3 border-t border-white/5">
        <div className="flex justify-between items-center text-xs font-medium text-slate-400 mb-1">
          <span className="flex items-center space-x-1">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>ATS Compliance Pillars</span>
          </span>
          <span>Score</span>
        </div>

        <div className="space-y-2">
          {[
            { label: 'Contact Details', val: breakdown.contact_details, max: 15 },
            { label: 'Technical Skills', val: breakdown.skills_section, max: 25 },
            { label: 'Work Experience', val: breakdown.experience_section, max: 20 },
            { label: 'Projects Section', val: breakdown.projects_section, max: 15 },
            { label: 'Action Verbs', val: breakdown.action_verbs, max: 10 },
            { label: 'Education', val: breakdown.education_section, max: 10 },
            { label: 'Formatting & Length', val: breakdown.resume_formatting, max: 5 }
          ].map((item, idx) => {
            const pct = Math.min(100, Math.round((item.val / item.max) * 100));
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">{item.label}</span>
                  <span className="text-slate-400 font-semibold">{item.val} / {item.max}</span>
                </div>
                <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: pct >= 80 ? '#00F2FE' : pct >= 50 ? '#F59E0B' : '#F43F5E'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
