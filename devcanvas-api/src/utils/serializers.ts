import { User } from "../types/userType";

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
  };
};
