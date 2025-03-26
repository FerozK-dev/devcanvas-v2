import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma"; // Prisma client
import { User } from "../utils/types";

export interface AuthenticatedRequest extends Request {
  user?: User; // Make it optional for type compatibility
}

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth_token")

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const user = await prisma.user.findUnique({
      where: { id:  Number(decoded?.userId) },
      // include: { educations: true },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // req.user = { id: user.id, email: user.email };
    (req as AuthenticatedRequest).user = user as User;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
