import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

// Get all educations of the current user
export const getEducations = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const educations = await prisma.education.findMany({
      where: {
        userId: req.user!.id,
      },
    });

    return res.json(educations);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch educations" });
  }
};

// Create a new education for the current user
export const createEducation = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const educationData = req.body;

    const newEducation = await prisma.education.create({
      data: {
        ...educationData,
        userId: req.user!.id,
      },
    });

    return res.status(201).json(newEducation);
  } catch (error) {
    return res.status(400).json({ error: "Failed to create education" });
  }
};

// Update an education for the current user
export const updateEducation = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const educationId = Number(req.params.id);
    const educationData = req.body;

    const education = await prisma.education.findUnique({
      where: { id: educationId },
    });

    if (!education || education.userId !== req.user!.id) {
      return res.status(404).json({ error: "Education not found or unauthorized" });
    }

    const updatedEducation = await prisma.education.update({
      where: { id: educationId },
      data: educationData,
    });

    return res.json({ message: "Education updated successfully", education: updatedEducation });
  } catch (error) {
    return res.status(400).json({ error: "Failed to update education" });
  }
};

// Delete an education for the current user
export const deleteEducation = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const educationId = Number(req.params.id);

    const education = await prisma.education.findUnique({
      where: { id: educationId },
    });

    if (!education || education.userId !== req.user!.id) {
      return res.status(404).json({ error: "Education not found or unauthorized" });
    }

    await prisma.education.delete({
      where: { id: educationId },
    });

    return res.json({ message: "Education deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: "Failed to delete education" });
  }
};
