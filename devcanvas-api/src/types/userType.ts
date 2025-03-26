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
}
