import re
from typing import List, Dict, Set
from models.schemas import JobDescriptionMatch, DetectedSkills
from analyzer.skills_db import SKILL_TAXONOMY

def analyze_job_description_match(resume_text: str, detected_skills: DetectedSkills, job_description: str) -> JobDescriptionMatch:
    """Compare resume text and detected skills against a job description."""
    if not job_description or not job_description.strip():
        return JobDescriptionMatch()

    jd_lowered = job_description.lower()
    
    # 1. Extract required skills from Job Description
    jd_skills = set()
    for category, skills in SKILL_TAXONOMY.items():
        for skill in skills:
            pattern = r'\b' + re.escape(skill) + r'\b'
            if re.search(pattern, jd_lowered):
                # Standardize display names
                display_name = skill.title()
                if skill in ["javascript", "typescript", "html", "css", "sql", "aws", "gcp", "api", "rest api", "json"]:
                    display_name = skill.upper()
                elif skill in ["react", "vue", "fastapi", "django", "flask", "docker", "kubernetes", "git", "linux", "mongodb", "redis"]:
                    display_name = skill.capitalize()
                jd_skills.add(display_name)

    resume_skills_set = set(detected_skills.all_skills)
    
    # Matched vs Missing Skills
    matched_skills = sorted(list(jd_skills.intersection(resume_skills_set)))
    missing_skills = sorted(list(jd_skills.difference(resume_skills_set)))

    # 2. Extract general keywords (words with length > 3, non-stopwords)
    stopwords = {"with", "this", "that", "from", "they", "have", "will", "your", "more", "about", "team", "work", "role", "must", "years", "experience", "ability", "strong", "knowledge"}
    jd_words = set(re.findall(r'\b[a-zA-Z]{4,}\b', jd_lowered)) - stopwords
    resume_words = set(re.findall(r'\b[a-zA-Z]{4,}\b', resume_text.lower()))

    matched_keywords = sorted(list(jd_words.intersection(resume_words)))[:15]
    missing_keywords = sorted(list(jd_words.difference(resume_words)))[:10]

    # Calculate overall match percentage
    if jd_skills:
        skill_match_ratio = len(matched_skills) / len(jd_skills)
    else:
        skill_match_ratio = 0.5

    if jd_words:
        keyword_match_ratio = len(matched_keywords) / max(1, len(jd_words))
    else:
        keyword_match_ratio = 0.5

    match_percentage = round((skill_match_ratio * 0.70 + keyword_match_ratio * 0.30) * 100, 1)

    return JobDescriptionMatch(
        match_percentage=min(100.0, max(10.0, match_percentage)),
        matched_skills=matched_skills,
        missing_skills=missing_skills,
        matched_keywords=matched_keywords,
        missing_keywords=missing_keywords
    )
