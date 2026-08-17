import React from 'react';
import { Check, Code, Layers, Wrench, Database, Cloud, UserCheck } from 'lucide-react';
import { DetectedSkills } from '.resume';

interface SkillsBreakdownProps {
  skills: DetectedSkills;
}

export const SkillsBreakdown: React.FC<SkillsBreakdownProps> = ({ skills }) => {
  const categories = [
    {
      name: 'Programming',
      icon: Code,
      items: skills.programming,
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
    },
    {
      name: 'Frameworks & Libraries',
      icon: Layers,
      items: skills.frameworks,
      badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30'
    },
    {
      name: 'Tools & Ecosystem',
      icon: Wrench,
      items: skills.tools,
      badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30'
    },
    {
      name: 'Databases',
      icon: Database,
      items: skills.databases,
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
    },
    {
      name: 'Cloud & DevOps',
      icon: Cloud,
      items: skills.cloud_devops,
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
    },
    {
      name: 'Soft Skills & Agile',
      icon: UserCheck,
      items: skills.soft_skills,
      badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30'
    }
  ];

  const totalDetected = skills.all_skills.length;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-glass">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center space-x-2">
            <span>Detected Skills & Tech Stack</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-extrabold">
              {totalDetected} Found
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Categorized skills automatically extracted from your resume text
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => {
          const IconComponent = cat.icon;
          if (cat.items.length === 0) return null;

          return (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-slate-300 border-b border-slate-800 pb-2">
                <IconComponent className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider font-['Plus_Jakarta_Sans']">
                  {cat.name} ({cat.items.length})
                </h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${cat.badgeColor} transition-transform hover:scale-105`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
