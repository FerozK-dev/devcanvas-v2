from pydantic import BaseModel
from typing import Optional


class InfoEntry(BaseModel):
    name: str
    email: str
    phone: str
    location: str

class EducationEntry(BaseModel):
    degree: str
    school: str
    year: Optional[str] = None

class ExperienceEntry(BaseModel):
    title: str
    company: str
    duration: str
    responsibilities: list[str]

class ProjectEntry(BaseModel):
    title: str
    description: str
    technologies: list[str]

class ResumePublicAttributes(BaseModel):
    education: list[EducationEntry]
    experience: list[ExperienceEntry]
    projects: list[ProjectEntry]
    skills: list[str]
    job_description: Optional[str] = None

class ResumeGenerateResult(ResumePublicAttributes):
    summary: str

class ResumeResponse(ResumeGenerateResult):
    personal_info: InfoEntry

class Resume(ResumePublicAttributes):
    personal_info: InfoEntry
    