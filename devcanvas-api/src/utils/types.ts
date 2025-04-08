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
  experiences?: Experience[];
  projects?: Project[];
}

export interface Education {
  id: number;
  school: string;
  degree?: string | null;
  field?: string | null;
  startYear?: Date | null;
  endYear?: Date | null;
  grade?: string | null;
  activities?: string | null;
  description?: string | null;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  employmentType?: string | null;
  location?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  industry?: string | null;
  headline?: string | null;
  description?: string | null;
}

export interface Project {
  id: number;
  title: string;
  description?: string | null;
  displayImage?: string | null;
}

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer?: Buffer;
}
