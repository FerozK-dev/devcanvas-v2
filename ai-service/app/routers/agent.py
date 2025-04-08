from fastapi import APIRouter
from app.schemas import Resume, ResumeResponse
from app.services.agent import generate_resume 

router = APIRouter(
    prefix="/agent",
    tags=["agent"],
)

@router.post("/create-resume", response_model=ResumeResponse)
async def create_resume(resume_input: Resume) -> ResumeResponse:
    public_attributes = generate_resume(resume_input)

    return ResumeResponse(personal_info=resume_input.personal_info, **public_attributes.model_dump())