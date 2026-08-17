import { AnalysisResponse } from '../types/resume';

export const SAMPLE_RESUME_TEXT = `
Alex Morgan
Full-Stack Software Engineer
Email: alex.morgan@example.com | Phone: (555) 019-2834
LinkedIn: linkedin.com/in/alexmorgan-dev | GitHub: github.com/alexmorgan-dev

TECHNICAL SKILLS
Programming Languages: Python, JavaScript, TypeScript, Java, SQL, C++
Frameworks & Libraries: React, Node.js, FastAPI, Express.js, Next.js, Tailwind CSS, Redux
Databases & Cloud: PostgreSQL, MongoDB, Redis, AWS (S3, EC2), Docker, Git, CI/CD, Linux
Tools & Practices: REST APIs, GraphQL, Jest, Agile/Scrum, Docker Compose

WORK EXPERIENCE
Senior Full-Stack Engineer | TechFlow Solutions | 2022 - Present
- Engineered high-throughput RESTful microservices using FastAPI and React, serving 500k daily active users with 99.9% uptime.
- Optimized PostgreSQL database queries and added Redis caching, reducing API latency from 450ms to 85ms.
- Led migration of legacy monolith to containerized Docker microservices on AWS EC2, cutting infrastructure costs by 28%.
- Mentored 4 junior engineers and conducted weekly code reviews to enforce TypeScript strict typing.

Software Developer | CloudNative Labs | 2020 - 2022
- Developed responsive web interfaces using React, Redux, and Tailwind CSS for cloud management dashboard.
- Built automated unit and integration tests using Jest, raising code coverage from 60% to 92%.
- Integrated Third-party payment APIs (Stripe, PayPal) and OAuth2 authentication workflows.

EDUCATION
Bachelor of Science in Computer Science
University of Technology | Graduated 2020 | GPA: 3.8/4.0

KEY PROJECTS
ResumeIQ - AI Resume Analyzer (React, FastAPI, Docker, Python)
- Built an ATS resume scoring application that extracts text, parses technical skills, and compares against Job Descriptions.
- Integrated PyMuPDF for server-side PDF parsing and implemented TF-IDF keyword matching algorithm.

DevConnect - Developer Community Platform (Node.js, Express, MongoDB, React)
- Created a real-time developer social platform with WebSocket messaging, markdown posting, and user authentication.

CERTIFICATIONS
- AWS Certified Solutions Architect - Associate
- Meta Certified Front-End Developer
`;

export const SAMPLE_JOB_DESCRIPTION = `
We are seeking a Senior Full-Stack Engineer to join our core engineering team.

Key Requirements:
- 3+ years of experience with Python, TypeScript, React, and FastAPI or Node.js/Express.
- Hands-on experience with Docker, Kubernetes, Redis, AWS, and PostgreSQL.
- Strong understanding of REST APIs, GraphQL, and microservice architecture.
- Experience with CI/CD pipelines, Git, Linux, and Cloud native tools.
- Excellent communication, teamwork, and problem-solving skills.
`;

export const SAMPLE_ANALYSIS_DATA: AnalysisResponse = {
  filename: "Alex_Morgan_Resume.pdf",
  contact_info: {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "(555) 019-2834",
    linkedin: "https://www.linkedin.com/in/alexmorgan-dev",
    github: "https://github.com/alexmorgan-dev",
    portfolio: "https://alexmorgan-portfolio.dev"
  },
  extracted_text: SAMPLE_RESUME_TEXT,
  ats_score: 88,
  ats_quality: "Excellent",
  score_breakdown: {
    contact_details: 15,
    skills_section: 25,
    experience_section: 20,
    education_section: 10,
    projects_section: 13,
    action_verbs: 10,
    resume_formatting: 5
  },
  detected_skills: {
    programming: ["Python", "JavaScript", "TypeScript", "Java", "SQL", "C++"],
    frameworks: ["React", "FastAPI", "Express", "Next.JS", "Tailwind", "Redux", "REST API", "GraphQL"],
    tools: ["Git", "GitHub", "Vite", "VS Code", "Jest"],
    databases: ["PostgreSQL", "MongoDB", "Redis"],
    cloud_devops: ["AWS", "Docker", "Linux", "CI/CD"],
    soft_skills: ["Leadership", "Communication", "Teamwork", "Agile", "Mentorship"],
    all_skills: ["Python", "JavaScript", "TypeScript", "Java", "SQL", "C++", "React", "FastAPI", "Express", "Next.JS", "Tailwind", "Redux", "REST API", "GraphQL", "Git", "GitHub", "Vite", "Jest", "PostgreSQL", "MongoDB", "Redis", "AWS", "Docker", "Linux", "Leadership", "Communication", "Teamwork", "Agile", "Mentorship"]
  },
  suggestions: [
    "✓ Add measurable metrics: Quantified impacts (e.g. 500k users, 28% cost cut) make your achievements stand out.",
    "✓ Strong Action Verbs: Excellent usage of verbs like 'Engineered', 'Optimized', 'Architected'.",
    "💡 Consider adding Kubernetes: Since your JD requires container orchestration, adding Kubernetes or Helm will boost keyword match.",
    "✓ Contact Links: LinkedIn and GitHub profiles detected cleanly."
  ],
  stats: {
    word_count: 420,
    char_count: 2850,
    reading_time_minutes: 2.1,
    sections_found: ["Summary", "Technical Skills", "Work Experience", "Education", "Key Projects", "Certifications"],
    projects_count: 2,
    skills_count: 29,
    certifications_count: 2,
    links_count: 4,
    action_verbs_count: 14,
    action_verb_score: 10
  },
  education: [
    "Bachelor of Science in Computer Science - University of Technology (2020)"
  ],
  experience: [
    "Senior Full-Stack Engineer | TechFlow Solutions (2022 - Present)",
    "Software Developer | CloudNative Labs (2020 - 2022)"
  ],
  projects: [
    "ResumeIQ - AI Resume Analyzer (React, FastAPI, Docker, Python)",
    "DevConnect - Developer Community Platform (Node.js, Express, MongoDB, React)"
  ],
  certifications: [
    "AWS Certified Solutions Architect - Associate",
    "Meta Certified Front-End Developer"
  ],
  jd_match: {
    match_percentage: 82.5,
    matched_skills: ["Python", "TypeScript", "React", "FastAPI", "Express", "Docker", "AWS", "PostgreSQL", "Redis", "REST API", "GraphQL", "Git", "Linux"],
    missing_skills: ["Kubernetes"],
    matched_keywords: ["experience", "engineer", "microservices", "pipelines", "architecture", "responsibilities", "communication"],
    missing_keywords: ["orchestration", "concurrency"]
  },
  ai_summary: "High-impact Full-Stack Software Engineer with 4+ years of hands-on experience designing cloud microservices, reactive frontend architectures, and high-concurrency database layer optimizations. Demonstrates exceptional proficiency in Python (FastAPI), React, TypeScript, and AWS cloud deployments.",
  interview_questions: [
    "Can you explain your database optimization strategy when reducing PostgreSQL latency from 450ms to 85ms?",
    "How do you manage state and type safety across large-scale React and Next.js applications?",
    "What key architectural trade-offs did you evaluate when migrating the monolithic backend to containerized Docker microservices?",
    "How do you handle schema migrations and caching invalidation strategies in Redis?"
  ],
  improved_bullets: [
    {
      original: "Worked on backend APIs and database queries.",
      improved: "Engineered 12+ RESTful microservice endpoints with FastAPI and Redis caching, cutting API latency by 81%."
    },
    {
      original: "Created user interface for dashboard.",
      improved: "Architected a responsive React + TypeScript dashboard with reusable custom components, boosting user engagement by 40%."
    }
  ]
};
