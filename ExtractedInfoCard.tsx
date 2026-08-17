import React, { useState } from 'react';
import { User, Mail, Phone, Linkedin, Github, Globe, GraduationCap, Briefcase, FolderGit2, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { ContactInfo } from './resume';

interface ExtractedInfoCardProps {
  contact: ContactInfo;
  education: string[];
  experience: string[];
  projects: string[];
  certifications: string[];
  extractedText: string;
}

export const ExtractedInfoCard: React.FC<ExtractedInfoCardProps> = ({
  contact,
  education,
  experience,
  projects,
  certifications,
  extractedText
}) => {
  const [showRawText, setShowRawText] = useState(false);

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-glass space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
              Extracted Resume Profile
            </h3>
            <p className="text-xs text-slate-400">
              Parsed candidate details & structural section records
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowRawText(!showRawText)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all flex items-center space-x-1"
        >
          <span>{showRawText ? 'Hide Raw Text' : 'View Raw Text'}</span>
          {showRawText ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Candidate Contact Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {contact.name && (
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <User className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span className="font-bold text-white truncate">{contact.name}</span>
          </div>
        )}
        {contact.email && (
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <a href={`mailto:${contact.email}`} className="hover:text-cyan-400 truncate">{contact.email}</a>
          </div>
        )}
        {contact.phone && (
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span className="truncate">{contact.phone}</span>
          </div>
        )}
        {contact.linkedin && (
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <Linkedin className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400 truncate">{contact.linkedin.replace('https://www.', '')}</a>
          </div>
        )}
        {contact.github && (
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <Github className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <a href={contact.github} target="_blank" rel="noreferrer" className="hover:text-purple-400 truncate">{contact.github.replace('https://', '')}</a>
          </div>
        )}
        {contact.portfolio && (
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <Globe className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <a href={contact.portfolio} target="_blank" rel="noreferrer" className="hover:text-emerald-400 truncate">Portfolio Link</a>
          </div>
        )}
      </div>

      {/* Raw Text Accordion */}
      {showRawText && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 max-h-60 overflow-y-auto whitespace-pre-wrap">
          {extractedText}
        </div>
      )}

      {/* Parsed Sections grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Education */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-slate-300 border-b border-slate-800 pb-2">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider font-['Plus_Jakarta_Sans']">
              Education & Degrees
            </h4>
          </div>
          {education.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No explicit education section header parsed.</p>
          ) : (
            <ul className="space-y-1 text-xs text-slate-300">
              {education.slice(0, 4).map((item, idx) => (
                <li key={idx} className="line-clamp-2">• {item}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Experience */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-slate-300 border-b border-slate-800 pb-2">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider font-['Plus_Jakarta_Sans']">
              Experience Entries
            </h4>
          </div>
          {experience.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No work experience section header parsed.</p>
          ) : (
            <ul className="space-y-1 text-xs text-slate-300">
              {experience.slice(0, 4).map((item, idx) => (
                <li key={idx} className="line-clamp-2">• {item}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Projects */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-slate-300 border-b border-slate-800 pb-2">
            <FolderGit2 className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider font-['Plus_Jakarta_Sans']">
              Key Technical Projects
            </h4>
          </div>
          {projects.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No standalone projects section header parsed.</p>
          ) : (
            <ul className="space-y-1 text-xs text-slate-300">
              {projects.slice(0, 4).map((item, idx) => (
                <li key={idx} className="line-clamp-2">• {item}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Certifications */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-slate-300 border-b border-slate-800 pb-2">
            <Award className="w-4 h-4 text-rose-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider font-['Plus_Jakarta_Sans']">
              Certifications & Honors
            </h4>
          </div>
          {certifications.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No certifications header parsed.</p>
          ) : (
            <ul className="space-y-1 text-xs text-slate-300">
              {certifications.slice(0, 4).map((item, idx) => (
                <li key={idx} className="line-clamp-2">• {item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
