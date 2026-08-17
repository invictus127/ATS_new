import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from api.routes import router

load_dotenv()

app = FastAPI(
    title="ResumeIQ API - AI Resume Analyzer",
    description="Backend ATS Scoring Engine, PDF Parser & Job Description Keyword Matcher",
    version="1.0.0"
)

# CORS middleware allowing frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for dev/deployment flexibility
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def health_check():
    return {
        "status": "online",
        "app": "ResumeIQ API",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    print(f"🚀 ResumeIQ Backend starting on http://{host}:{port}")
    uvicorn.run("main:app", host=host, port=port, reload=True)
