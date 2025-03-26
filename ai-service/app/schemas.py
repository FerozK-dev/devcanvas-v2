from pydantic import BaseModel

class ResumeResponse(BaseModel):
    experience: str