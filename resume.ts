export interface ContactInfo {
  name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  location?: string;
}

export interface DetectedSkills {
  programming: string[];
  frameworks: string[];
  tools: string[];
  databases: string[];
  cloud_devops: string[];
  soft_skills: string[];
  all_skills: string[];
}

export interface ResumeStats {
  word_count: number;
  char_count: number;
  reading_time_minutes: number;
  sections_found: string[];
  projects_count: number;
  skills_count: number;
  certifications_count: number;
  links_count: number;
  action_verbs_count: number;
  action_verb_score: number;
}

export interface AtsScoreBreakdown {
  contact_details: number;
  skills_section: number;
  experience_section: number;
  education_section: number;
  projects_section: number;
  action_verbs: number;
  resume_formatting: number;
}

export interface JobDescriptionMatch {
  match_percentage: number;
  matched_skills: string[];
  missing_skills: string[];
  matched_keywords: string[];
  missing_keywords: string[];
}

export interface ImprovedBullet {
  original: string;
  improved: string;
}

export interface AnalysisResponse {
  filename: string;
  contact_info: ContactInfo;
  extracted_text: str;
  ats_score: number;
  ats_quality: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
  score_breakdown: AtsScoreBreakdown;
  detected_skills: DetectedSkills;
  suggestions: string[];
  stats: ResumeStats;
  education: string[];
  experience: string[];
  projects: string[];
  certifications: string[];
  jd_match?: JobDescriptionMatch;
  ai_summary?: string;
  interview_questions: string[];
  improved_bullets: ImprovedBullet[];
}
