import { Request, Response } from "express";
import { prisma } from "../db/prisma"; // Assuming Prisma client is set up
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { serializeUser } from "../utils/serializers";
import storage from '../utils/storageService';

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

    const user = await prisma.user.findUnique( { where: { id: req.user.id } } )
    const updateData: any = { ...req.body };
    if (req.files) {
      const files = req.files as Record<string, Express.Multer.File[]>;

      if (files.profilePicture) {
        if (user?.profilePicture) {
          await storage.delete(user.profilePicture);
        }
        updateData.profilePicture = await storage.upload(
          files.profilePicture[0],
          'profile-pictures'
        );
      }

      if (files.resume) {
        if (user?.resume) {
          await storage.delete(user.resume);
        }
        updateData.resume = await storage.upload(
          files.resume[0],
          'resumes'
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Update error", error);
    res.status(500).json({ error: "Something went wrong" });
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

