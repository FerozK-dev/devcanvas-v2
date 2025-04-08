import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { serializeEducation } from "../utils/serializers";

// Get all educations of the current user
export const getEducations = async (req: AuthenticatedRequest, res: Response ): Promise<void> => {
  try {
    const educations = await prisma.education.findMany({
      where: {
        userId: req.user!.id,
      },
    });

    res.json(educations.map(serializeEducation));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch educations" });
  }
};

// Create a new education for the current user
export const createEducation = async (req: AuthenticatedRequest, res: Response ): Promise<void> => {
  try {
    const educationData = req.body;

    const newEducation = await prisma.education.create({
      data: {
        ...educationData,
        userId: req.user!.id,
      },
    });

    res.status(201).json(serializeEducation(newEducation));
  } catch (error) {
    res.status(400).json({ error: "Failed to create education" });
  }
};

// Update an education for the current user
export const updateEducation = async (req: AuthenticatedRequest, res: Response ): Promise<void> => {
  try {
    const educationId = Number(req.params.id);
    const educationData = req.body;

    const education = await prisma.education.findUnique({
      where: { id: educationId },
    });

    if (!education || education.userId !== req.user!.id) {
      res.status(404).json({ error: "Education not found or unauthorized" });
    }

    const updatedEducation = await prisma.education.update({
      where: { id: educationId },
      data: educationData,
    });

    res.json({ message: "Education updated successfully", education: serializeEducation(updatedEducation) });
  } catch (error) {
    res.status(400).json({ error: "Failed to update education" });
  }
};

// Delete an education for the current user
export const deleteEducation = async (req: AuthenticatedRequest, res: Response ): Promise<void> => {
  try {
    const educationId = Number(req.params.id);

    const education = await prisma.education.findUnique({
      where: { id: educationId },
    });

    if (!education || education.userId !== req.user!.id) {
      res.status(404).json({ error: "Education not found or unauthorized" });
    }

    await prisma.education.delete({
      where: { id: educationId },
    });

    res.json({ message: "Education deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete education" });
  }
};
