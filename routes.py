from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from models.schemas import AnalysisResponse, AnalyzeTextRequest
from parser.pdf_parser import extract_text_from_pdf_bytes, parse_contact_info, extract_sections
from analyzer.ats_scorer import detect_skills_and_categories, calculate_stats, calculate_ats_score
from analyzer.jd_matcher import analyze_job_description_match
from analyzer.ai_generator import generate_ai_insights

router = APIRouter(prefix="/api", tags=["Resume Analyzer"])

def run_pipeline(resume_text: str, filename: str, job_description: Optional[str] = None) -> AnalysisResponse:
    """Core analysis pipeline connecting parser, ATS scorer, JD matcher, and AI generator."""
    if not resume_text or len(resume_text.strip()) < 20:
        raise HTTPException(status_code=400, detail="Uploaded file contains insufficient or unparseable text. Please upload a clear text PDF resume.")

    # 1. Contact & Section parsing
    contact = parse_contact_info(resume_text)
    sections = extract_sections(resume_text)
    
    # 2. Skill Detection
    detected_skills = detect_skills_and_categories(resume_text)
    
    # 3. Resume Stats
    stats = calculate_stats(resume_text, sections, detected_skills, contact)
    
    # 4. ATS Score Calculation
    ats_score, ats_quality, score_breakdown, suggestions = calculate_ats_score(contact, detected_skills, stats, sections)
    
    # 5. Job Description Match (if provided)
    jd_match = None
    if job_description and job_description.strip():
        jd_match = analyze_job_description_match(resume_text, detected_skills, job_description)

    # 6. AI Insights (Summary, Interview Qs, Bullet Point Optimizer)
    ai_summary, interview_questions, improved_bullets = generate_ai_insights(
        resume_text, 
        detected_skills.all_skills, 
        job_description
    )

    return AnalysisResponse(
        filename=filename,
        contact_info=contact,
        extracted_text=resume_text,
        ats_score=ats_score,
        ats_quality=ats_quality,
        score_breakdown=score_breakdown,
        detected_skills=detected_skills,
        suggestions=suggestions,
        stats=stats,
        education=sections.get("education", []),
        experience=sections.get("experience", []),
        projects=sections.get("projects", []),
        certifications=sections.get("certifications", []),
        jd_match=jd_match,
        ai_summary=ai_summary,
        interview_questions=interview_questions,
        improved_bullets=improved_bullets
    )

@router.post("/upload", response_model=AnalysisResponse)
async def upload_resume(
    file: UploadFile = File(...),
    job_description: Optional[str] = Form(None)
):
    """Endpoint to upload a PDF resume file and obtain complete ATS analysis."""
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are currently supported.")

    content = await file.read()
    if len(content) > 5 * 1024 * 1024: # 5MB limit
        raise HTTPException(status_code=400, detail="File size exceeds the 5MB limit.")

    extracted_text = extract_text_from_pdf_bytes(content)
    return run_pipeline(extracted_text, file.filename, job_description)

@router.post("/analyze_text", response_model=AnalysisResponse)
async def analyze_text(request: AnalyzeTextRequest):
    """Endpoint to analyze raw resume text directly (useful for testing or fallback client parsing)."""
    return run_pipeline(request.resume_text, request.filename or "resume.txt", request.job_description)
