import { Request, Response } from "express";
import { prisma } from "../db/prisma"; // Assuming Prisma client is set up
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { serializeUser } from "../utils/serializers";

export const showProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    return res.json(serializeUser(req.user));
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update user profile
export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: req.body,
    });

    return res.json(serializeUser(updatedUser)); // Serialize response
  } catch (error) {
    return res.status(400).json({ error: "Update failed" });
  }
};


// Toggle portfolio status
export const togglePortfolioStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { publishPortfolio: !req.user.publishPortfolio },
    });

    return res.json({ message: "Portfolio status updated successfully"});
  } catch (error) {
    return res.status(400).json({ error: "Could not update portfolio status" });
  }
};

