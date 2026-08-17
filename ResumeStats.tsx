import React from 'react';
import { BarChart3, FileText, Clock, Layers, FolderGit2, Code, Award, Link, Zap } from 'lucide-react';
import { ResumeStats as StatsType } from '../types/resume';

interface ResumeStatsProps {
  stats: StatsType;
}

export const ResumeStats: React.FC<ResumeStatsProps> = ({ stats }) => {
  const statItems = [
    { label: 'Total Words', value: stats.word_count, icon: FileText, color: 'text-cyan-400' },
    { label: 'Reading Time', value: `${stats.reading_time_minutes} min`, icon: Clock, color: 'text-blue-400' },
    { label: 'Sections Found', value: stats.sections_found.length, icon: Layers, color: 'text-purple-400' },
    { label: 'Projects Found', value: stats.projects_count, icon: FolderGit2, color: 'text-amber-400' },
    { label: 'Skills Detected', value: stats.skills_count, icon: Code, color: 'text-emerald-400' },
    { label: 'Certifications', value: stats.certifications_count, icon: Award, color: 'text-rose-400' },
    { label: 'Contact Links', value: stats.links_count, icon: Link, color: 'text-indigo-400' },
    { label: 'Action Verbs', value: `${stats.action_verbs_count} used`, icon: Zap, color: 'text-yellow-400' },
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-glass space-y-4">
      <div className="flex items-center space-x-3">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
            Resume Statistics & Metrics
          </h3>
          <p className="text-xs text-slate-400">
            Quick computational metrics calculated from your document structure
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        {statItems.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center space-x-3"
            >
              <div className={`p-2 rounded-lg bg-slate-800 ${item.color}`}>
                <IconComponent className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {item.label}
                </span>
                <span className="text-sm font-extrabold text-white font-['Plus_Jakarta_Sans']">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sections Tags */}
      <div className="pt-2">
        <span className="text-xs text-slate-400 font-medium">Sections Detected: </span>
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {stats.sections_found.map((sec, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-cyan-300 border border-slate-700"
            >
              ✓ {sec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
