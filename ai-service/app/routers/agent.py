from fastapi import APIRouter, Depends, HTTPException
from app.schemas import ResumeGenerateResult
from app.dependencies.user import get_current_user
from app.models import UserPublic
from typing import Annotated
from app.services.agent import generate_resume

router = APIRouter(
    prefix="/agent",
    tags=["agent"],
)


# @router.post("/create-resume", response_model=ResumeResponse)
# async def create_resume(resume_input: Resume, user: str = Depends(get_current_user), db: Session = Depends(get_db)) -> ResumeResponse:
@router.post("/create-resume", response_model=ResumeGenerateResult)
async def create_resume(
    user: Annotated[UserPublic, Depends(get_current_user)],
    job_description: str | None = None,
):
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    public_attributes = generate_resume(user, job_description)

    return public_attributes
