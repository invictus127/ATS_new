from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class ContactInfo(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    portfolio: Optional[str] = None
    location: Optional[str] = None

class DetectedSkills(BaseModel):
    programming: List[str] = Field(default_factory=list)
    frameworks: List[str] = Field(default_factory=list)
    tools: List[str] = Field(default_factory=list)
    databases: List[str] = Field(default_factory=list)
    cloud_devops: List[str] = Field(default_factory=list)
    soft_skills: List[str] = Field(default_factory=list)
    all_skills: List[str] = Field(default_factory=list)

class ResumeStats(BaseModel):
    word_count: int = 0
    char_count: int = 0
    reading_time_minutes: float = 0.0
    sections_found: List[str] = Field(default_factory=list)
    projects_count: int = 0
    skills_count: int = 0
    certifications_count: int = 0
    links_count: int = 0
    action_verbs_count: int = 0
    action_verb_score: int = 0

class AtsScoreBreakdown(BaseModel):
    contact_details: int = 0
    skills_section: int = 0
    experience_section: int = 0
    education_section: int = 0
    projects_section: int = 0
    action_verbs: int = 0
    resume_formatting: int = 0

class JobDescriptionMatch(BaseModel):
    match_percentage: float = 0.0
    matched_skills: List[str] = Field(default_factory=list)
    missing_skills: List[str] = Field(default_factory=list)
    matched_keywords: List[str] = Field(default_factory=list)
    missing_keywords: List[str] = Field(default_factory=list)

class AnalysisResponse(BaseModel):
    filename: str
    contact_info: ContactInfo
    extracted_text: str
    ats_score: int
    ats_quality: str # "Excellent", "Good", "Average", "Needs Improvement"
    score_breakdown: AtsScoreBreakdown
    detected_skills: DetectedSkills
    suggestions: List[str]
    stats: ResumeStats
    education: List[str] = Field(default_factory=list)
    experience: List[str] = Field(default_factory=list)
    projects: List[str] = Field(default_factory=list)
    certifications: List[str] = Field(default_factory=list)
    jd_match: Optional[JobDescriptionMatch] = None
    ai_summary: Optional[str] = None
    interview_questions: List[str] = Field(default_factory=list)
    improved_bullets: List[Dict[str, str]] = Field(default_factory=list)

class AnalyzeTextRequest(BaseModel):
    resume_text: str
    filename: Optional[str] = "resume.pdf"
    job_description: Optional[str] = None
