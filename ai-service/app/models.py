from sqlmodel import SQLModel, Field, Relationship

class UserBase(SQLModel):    
    firstName:str
    lastName:str
    email:str = Field(unique=True)
    password:str
    location:str | None = Field(nullable=True)
    aboutMe:str | None = Field(nullable=True)
    contact:str | None = Field(nullable=True)
    title:str | None = Field(nullable=True)
    headline:str | None = Field(nullable=True)
    githubUrl:str | None = Field(nullable=True)
    linkedUrl:str | None = Field(nullable=True)
    workEmail:str | None = Field(nullable=True)
    publishPortfolio: bool

    
class EducationBase(SQLModel):
    
    userId:int = Field(foreign_key="User.id")
    school:str | None = Field(nullable=True)
    degree:str | None = Field(nullable=True)
    field:str | None = Field(nullable=True)
    startYear:str | None = Field(nullable=True)
    endYear:str | None = Field(nullable=True)
    grade: str

    
class ProjectBase(SQLModel):
    
    userId:int = Field(foreign_key="User.id")
    title:str | None = Field(nullable=True)
    description:str | None = Field(nullable=True)

    
class ExperienceBase(SQLModel):
   
    userId:int = Field(foreign_key="User.id")
    title:str | None = Field(nullable=True)
    company:str | None = Field(nullable=True)
    location:str | None = Field(nullable=True)
    description:str | None = Field(nullable=True)
    startDate:str | None = Field(nullable=True)
    endDate:str | None = Field(nullable=True)

    
class User(UserBase, table=True):
    __tablename__ = "User"

    id:int = Field(primary_key=True, index=True)
    educations: list["Education"] = Relationship(back_populates="user")
    projects: list["Project"] = Relationship(back_populates="user")
    experiences: list["Experience"] = Relationship(back_populates="user")


class Education(EducationBase, table=True):
    __tablename__ = "Education"

    id:int = Field(primary_key=True, index=True)
    user: User = Relationship(back_populates="educations")

class Project(ProjectBase, table=True):
    __tablename__ = "Project"

    id:int = Field(primary_key=True, index=True)
    user: User = Relationship(back_populates="projects")


class Experience(ExperienceBase, table=True):
    __tablename__ = "Experience"

    id:int = Field(primary_key=True, index=True)
    user: User = Relationship(back_populates="experiences")


class UserPublic(UserBase):
    educations: list[EducationBase] = []
    projects: list[ProjectBase] = []
    experiences: list[ExperienceBase] = []


