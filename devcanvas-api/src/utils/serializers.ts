import { User, Education, Experience, Project } from "./types";


export const serializeUser = (user: User) => {
  return {
    id: user.id,
    email: user.email ?? undefined,
    firstName: user.firstName ?? undefined,
    lastName: user.lastName ?? undefined,
    location: user.location ?? undefined,
    githubUrl: user.githubUrl ?? undefined,
    linkedUrl: user.linkedUrl ?? undefined,
    publishPortfolio: user.publishPortfolio,
    title: user.title ?? undefined,
    headline: user.headline ?? undefined,
    aboutMe: user.aboutMe ?? undefined,
    contact: user.contact ?? undefined,
    profilePicture: user.profilePicture ?? undefined,
    resume: user.resume ?? undefined
  };
};

export const serializeEducation = (education: Education) => {
  return {
    id: education.id,
    school: education.school,
    degree: education.degree ?? undefined,
    field: education.field ?? undefined,
    startYear: education.startYear ?? undefined,
    endYear: education.endYear ?? undefined,
    grade: education.grade ?? undefined,
    activities: education.activities ?? undefined,
    description: education.description ?? undefined,
  };
};

export const serializeExperience = (experience: Experience) => {
  return {
    id: experience.id,
    title: experience.title,
    company: experience.company,
    employmentType: experience.employmentType ?? undefined,
    location: experience.location ?? undefined,
    startDate: experience.startDate ? experience.startDate.toISOString() : undefined,
    endDate: experience.endDate ? experience.endDate.toISOString() : undefined,
    industry: experience.industry ?? undefined,
    headline: experience.headline ?? undefined,
    description: experience.description ?? undefined,
  };
};

export const serializeProject = (project: Project) => {
  return {
    id: project.id,
    title: project.title,
    description: project.description ?? undefined,
    displayImage: project.displayImage ?? undefined
  };
};

export const serializePortfolio = (user: User) => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName ?? undefined,
    lastName: user.lastName ?? undefined,
    location: user.location ?? undefined,
    githubUrl: user.githubUrl ?? undefined,
    linkedUrl: user.linkedUrl ?? undefined,
    publishPortfolio: user.publishPortfolio,
    title: user.title ?? undefined,
    headline: user.headline ?? undefined,
    aboutMe: user.aboutMe ?? undefined,
    contact: user.contact ?? undefined,
    profilePicture: user.profilePicture ?? undefined,
    resume: user.resume ?? undefined,
    educations: user.educations?.map(serializeEducation) ?? [],
    experiences: user.experiences?.map(serializeExperience) ?? [],
    projects: user.projects?.map(serializeProject) ?? [],
  };
};

