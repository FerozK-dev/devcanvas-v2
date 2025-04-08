import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma"; // Prisma client
import { User } from "../utils/types";

declare global {
  namespace Express {
    interface Request {
      user: User;
      file?: Express.Multer.File;
      files?: {
        [fieldname: string]: Express.Multer.File[];
      };
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user: User;
  file?: Express.Multer.File;
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
}

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {  // Explicitly return Promise<void>
  const token = req.header("auth_token");

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;  // Just return after sending response
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const user = await prisma.user.findUnique({
      where: { id: Number(decoded?.userId) },
    });

    if (!user) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    (req as AuthenticatedRequest).user = user as User;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
