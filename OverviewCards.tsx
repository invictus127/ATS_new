import React from 'react';
import { Target, Code, FolderGit2, Clock, CheckCircle, FileCheck } from 'lucide-react';
import { ResumeStats, JobDescriptionMatch } from './resume';

interface OverviewCardsProps {
  quality: string;
  stats: ResumeStats;
  jdMatch?: JobDescriptionMatch;
}

export const OverviewCards: React.FC<OverviewCardsProps> = ({
  quality,
  stats,
  jdMatch
}) => {
  const cards = [
    {
      title: 'Resume Quality',
      value: quality,
      subtitle: `${stats.sections_found.length} sections validated`,
      icon: FileCheck,
      color: 'from-cyan-500/20 to-blue-500/20',
      textColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/30'
    },
    {
      title: 'Keyword Match',
      value: jdMatch ? `${jdMatch.match_percentage}%` : 'N/A',
      subtitle: jdMatch ? `${jdMatch.matched_skills.length} skills matched` : 'Paste JD to compare',
      icon: Target,
      color: 'from-purple-500/20 to-indigo-500/20',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-500/30'
    },
    {
      title: 'Detected Skills',
      value: `${stats.skills_count}`,
      subtitle: 'Across 6 tech categories',
      icon: Code,
      color: 'from-emerald-500/20 to-teal-500/20',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30'
    },
    {
      title: 'Key Projects',
      value: `${stats.projects_count}`,
      subtitle: `${stats.action_verbs_count} action verbs used`,
      icon: FolderGit2,
      color: 'from-amber-500/20 to-orange-500/20',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className={`glass-panel rounded-2xl p-5 border ${card.borderColor} glass-panel-hover flex items-center space-x-4`}
          >
            <div className={`p-3.5 rounded-xl bg-gradient-to-br ${card.color} ${card.textColor} flex-shrink-0 border border-white/10`}>
              <IconComponent className="w-6 h-6" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">{card.title}</p>
              <h3 className={`text-2xl font-extrabold font-['Plus_Jakarta_Sans'] ${card.textColor} tracking-tight`}>
                {card.value}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
