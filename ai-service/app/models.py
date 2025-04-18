from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, index=True)
    firstName = Column(String)
    lastName = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    location = Column(String, nullable=True)
    aboutMe = Column(String, nullable=True)
    contact = Column(String, nullable=True)
    title = Column(String, nullable=True)
    headline = Column(String, nullable=True)
    githubUrl = Column(String, nullable=True)
    linkedUrl = Column(String, nullable=True)
    workEmail = Column(String, nullable=True)
    publishPortfolio = Column(Boolean)

    educations = relationship("Education", back_populates="user")
    projects = relationship("Project", back_populates="user")
    experiences = relationship("Experience", back_populates="user")

class Education(Base):
    __tablename__ = "Education"

    id = Column(Integer, primary_key=True, index=True)
    userIid = Column(Integer, ForeignKey("User.id"))
    school = Column(String, nullable=True)
    degree = Column(String, nullable=True)
    field = Column(String, nullable=True)
    startDate = Column(String, nullable=True)
    endDate = Column(String, nullable=True)
    grade = (String)

    user = relationship("User", back_populates="educations")

class Project(Base):
    __tablename__ = "Project"

    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey("User.id"))
    title = Column(String, nullable=True)
    description = Column(String, nullable=True)

    user = relationship("User", back_populates="projects")

class Experience(Base):
    __tablename__ = "Experience"

    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey("User.id"))
    title = Column(String, nullable=True)
    company = Column(String, nullable=True)
    location = Column(String, nullable=True)
    school = Column(String, nullable=True)
    description = Column(String, nullable=True)
    startDate = Column(String, nullable=True)
    endDate = Column(String, nullable=True)

    user = relationship("User", back_populates="experiences")
