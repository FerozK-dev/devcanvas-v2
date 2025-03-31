from fastapi import APIRouter
from app.schemas import ResumeResponse, ResumeInput
from app.services.agent import generate_resume 

router = APIRouter(
    prefix="/agent",
    tags=["agent"],
)

@router.post("/create-resume", response_model=ResumeResponse)
async def create_resume(resume_input: ResumeInput):
    generate_resume(resume_input)
    return ResumeResponse(experience="Nothing")