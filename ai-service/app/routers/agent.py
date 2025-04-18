from fastapi import APIRouter, Depends, HTTPException
from app.schemas import Resume, ResumeResponse
from app.services.agent import generate_resume
from app.services.auth import get_current_user
from sqlalchemy.orm import joinedload, Session
from app.models import User
from app.services.database import get_db

router = APIRouter(
    prefix="/agent",
    tags=["agent"],
)

# @router.post("/create-resume", response_model=ResumeResponse)
# async def create_resume(resume_input: Resume, user: str = Depends(get_current_user), db: Session = Depends(get_db)) -> ResumeResponse:
@router.post("/create-resume", response_model=ResumeResponse)
async def create_resume(resume_input: Resume, user: str = Depends(get_current_user), db: Session = Depends(get_db)):
    # Get user data from the database, including related data (educations, projects, experiences)
    # user = db.query(User).options(
    #     joinedload(User.educations),
    #     joinedload(User.projects),
    #     joinedload(User.experiences)
    # ).filter(User.id == user.id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")



    return user
    # public_attributes = generate_resume(resume_input)

    # return ResumeResponse(personal_info=resume_input.personal_info, **public_attributes.model_dump())