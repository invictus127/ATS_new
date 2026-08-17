import re
from typing import Tuple, List, Dict
from models.schemas import ContactInfo, DetectedSkills, ResumeStats, AtsScoreBreakdown
from analyzer.skills_db import SKILL_TAXONOMY, ACTION_VERBS

def detect_skills_and_categories(text: str) -> DetectedSkills:
    """Detect skills mentioned in the resume and group into categories."""
    lowered_text = text.lower()
    detected = DetectedSkills()
    all_found = set()

    for category, skills in SKILL_TAXONOMY.items():
        found_in_category = []
        for skill in skills:
            # Word boundary regex for accurate match (e.g. avoid 'c' matching 'contact')
            pattern = r'\b' + re.escape(skill) + r'\b'
            if re.search(pattern, lowered_text):
                # Standardize display names
                display_name = skill.title()
                if skill in ["javascript", "typescript", "html", "css", "sql", "aws", "gcp", "api", "rest api", "json", "xml"]:
                    display_name = skill.upper()
                elif skill in ["react", "vue", "fastapi", "django", "flask", "docker", "kubernetes", "git", "linux", "mongodb", "redis", "postgresql", "mysql"]:
                    display_name = skill.capitalize()
                    
                found_in_category.append(display_name)
                all_found.add(display_name)

        setattr(detected, category, sorted(list(set(found_in_category))))

    detected.all_skills = sorted(list(all_found))
    return detected

def calculate_stats(text: str, sections_dict: Dict[str, List[str]], detected_skills: DetectedSkills, contact: ContactInfo) -> ResumeStats:
    """Calculate key resume metrics (word count, reading time, action verbs, links, sections)."""
    words = re.findall(r'\w+', text)
    word_count = len(words)
    reading_time = round(word_count / 200.0, 1) # Avg 200 WPM

    # Action verbs count
    lowered_text = text.lower()
    action_verb_matches = [verb for verb in ACTION_VERBS if re.search(r'\b' + verb + r'\b', lowered_text)]
    action_verbs_count = len(action_verb_matches)
    
    # Calculate score out of 10 for action verbs
    action_verb_score = min(10, int((action_verbs_count / 8.0) * 10))

    # Link count
    links_count = 0
    if contact.email: links_count += 1
    if contact.linkedin: links_count += 1
    if contact.github: links_count += 1
    if contact.portfolio: links_count += 1

    sections_found = [k.capitalize() for k, v in sections_dict.items() if len(v) > 0]
    
    # Estimate projects count
    proj_lines = sections_dict.get("projects", [])
    proj_count = len([l for l in proj_lines if len(l.split()) <= 6 and not l.startswith("-") and not l.startswith("•")])
    if proj_count == 0 and len(proj_lines) > 0:
        proj_count = max(1, len(proj_lines) // 5)

    return ResumeStats(
        word_count=word_count,
        char_count=len(text),
        reading_time_minutes=reading_time,
        sections_found=sections_found,
        projects_count=proj_count,
        skills_count=len(detected_skills.all_skills),
        certifications_count=len(sections_dict.get("certifications", [])),
        links_count=links_count,
        action_verbs_count=action_verbs_count,
        action_verb_score=action_verb_score
    )

def calculate_ats_score(contact: ContactInfo, skills: DetectedSkills, stats: ResumeStats, sections: Dict[str, List[str]]) -> Tuple[int, str, AtsScoreBreakdown, List[str]]:
    """Compute overall ATS score out of 100 with category breakdowns and suggestions."""
    breakdown = AtsScoreBreakdown()
    suggestions = []

    # 1. Contact Details (Max 15)
    contact_score = 0
    if contact.email: contact_score += 5
    else: suggestions.append("❌ Missing Email Address: Add a professional email address.")

    if contact.phone: contact_score += 4
    else: suggestions.append("❌ Missing Phone Number: Provide a contact phone number.")

    if contact.linkedin: contact_score += 3
    else: suggestions.append("💡 Add LinkedIn Profile: Including your LinkedIn link increases recruiter response rate by 40%.")

    if contact.github or contact.portfolio: contact_score += 3
    else: suggestions.append("💡 Add Portfolio / GitHub Link: Technical recruiters expect clickable project links.")

    breakdown.contact_details = min(15, contact_score)

    # 2. Skills Section (Max 25)
    total_skills = len(skills.all_skills)
    if total_skills >= 15:
        breakdown.skills_section = 25
    elif total_skills >= 10:
        breakdown.skills_section = 20
    elif total_skills >= 5:
        breakdown.skills_section = 14
        suggestions.append("⚠️ Expand Technical Skills: Your resume lists under 10 technical skills. Add more frameworks, tools, or languages.")
    else:
        breakdown.skills_section = 8
        suggestions.append("❌ Low Skill Density: Clearly list your core technical skills in a dedicated 'Skills' section.")

    # 3. Work Experience (Max 20)
    exp_lines = sections.get("experience", [])
    if len(exp_lines) > 5:
        breakdown.experience_section = 20
    elif len(exp_lines) > 0:
        breakdown.experience_section = 14
        suggestions.append("💡 Detail Work Experience: Add bullet points describing your impact and responsibilities.")
    else:
        breakdown.experience_section = 5
        suggestions.append("⚠️ Experience Section Missing: If you are a fresher/intern, label your internships or practical experience clearly.")

    # 4. Projects Section (Max 15)
    proj_lines = sections.get("projects", [])
    if len(proj_lines) >= 4:
        breakdown.projects_section = 15
    elif len(proj_lines) > 0:
        breakdown.projects_section = 10
        suggestions.append("💡 Highlight Technical Projects: Include 2-3 detailed projects with metrics and tech stack tags.")
    else:
        breakdown.projects_section = 5
        suggestions.append("⚠️ Missing Projects Section: Add at least 2 key technical projects with GitHub repositories.")

    # 5. Education Section (Max 10)
    edu_lines = sections.get("education", [])
    if len(edu_lines) > 0:
        breakdown.education_section = 10
    else:
        breakdown.education_section = 3
        suggestions.append("❌ Missing Education Details: Specify your degree, field of study, university, and graduation year.")

    # 6. Action Verbs (Max 10)
    breakdown.action_verbs = stats.action_verb_score
    if stats.action_verbs_count < 5:
        suggestions.append("✓ Use Strong Action Verbs: Start bullet points with impact words like 'Spearheaded', 'Engineered', 'Optimized'.")

    # 7. Formatting & Length (Max 5)
    if 300 <= stats.word_count <= 800:
        breakdown.resume_formatting = 5
    elif stats.word_count < 300:
        breakdown.resume_formatting = 2
        suggestions.append("⚠️ Resume Too Short: Aim for 400-700 words for optimal ATS parsing.")
    else:
        breakdown.resume_formatting = 3
        suggestions.append("⚠️ Resume Length Warning: Consolidate text to 1-2 pages maximum to prevent reader fatigue.")

    # Calculate Total ATS Score out of 100
    total_score = (
        breakdown.contact_details +
        breakdown.skills_section +
        breakdown.experience_section +
        breakdown.education_section +
        breakdown.projects_section +
        breakdown.action_verbs +
        breakdown.resume_formatting
    )

    # General Quality Label
    if total_score >= 85:
        quality = "Excellent"
    elif total_score >= 70:
        quality = "Good"
    elif total_score >= 50:
        quality = "Average"
    else:
        quality = "Needs Improvement"

    if not suggestions:
        suggestions.append("🎉 Great Job! Your resume satisfies standard ATS parser formatting rules.")

    return total_score, quality, breakdown, suggestions
