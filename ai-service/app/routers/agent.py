from fastapi import APIRouter
from app.schemas import ResumeResponse


router = APIRouter(
    prefix="/agent",
    tags=["agent"],
)

@router.post("/create-resume", response_model=ResumeResponse)
async def create_rsume(job_description: str, developer_profile: str):
    return ResumeResponse(experience="Nothing")