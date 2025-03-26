import { User, Education } from "./types";


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
    // educations: user.educations?.map((education) => serializeEducation(education)) ?? []
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
