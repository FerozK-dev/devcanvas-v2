export interface User {
  id: number;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  location?: string | null;
  githubUrl?: string | null;
  linkedUrl?: string | null;
  publishPortfolio?: boolean;
  title?: string | null;
  headline?: string | null;
  aboutMe?: string | null;
  contact?: string | null;
  profilePicture?: string | null;
  resume?: string | null;
  educations?: Education[];
}

export interface Education {
  id: number;
  school: string;
  degree?: string | null;
  field?: string | null;
  startYear?: number | null;
  endYear?: number | null;
  grade?: string | null;
  activities?: string | null;
  description?: string | null;
}
