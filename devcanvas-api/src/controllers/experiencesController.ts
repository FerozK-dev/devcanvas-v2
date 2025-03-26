import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { serializeExperience } from "../utils/serializers";

export const getExperiences = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const experiences = await prisma.experience.findMany({
      where: {
        userId: req.user!.id,
      },
    });

    return res.json(experiences.map(serializeExperience));
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch experiences" });
  }
};

export const createExperience = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const experienceData = req.body;

    const newExperience = await prisma.experience.create({
      data: {
        ...experienceData,
        userId: req.user!.id,
      },
    });

    return res.status(201).json(serializeExperience(newExperience));
  } catch (error) {
    return res.status(400).json({ error: "Failed to create experience" });
  }
};

export const updateExperience = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const experienceId = Number(req.params.id);
    const experienceData = req.body;

    const experience = await prisma.experience.findUnique({
      where: { id: experienceId },
    });

    if (!experience || experience.userId !== req.user!.id) {
      return res.status(404).json({ error: "Experience not found or unauthorized" });
    }

    const updatedExperience = await prisma.experience.update({
      where: { id: experienceId },
      data: experienceData,
    });

    return res.json({ message: "Experience updated successfully", experience: serializeExperience(updatedExperience) });
  } catch (error) {
    return res.status(400).json({ error: "Failed to update experience" });
  }
};

// Delete an experience for the current user
export const deleteExperience = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const experienceId = Number(req.params.id);

    const experience = await prisma.experience.findUnique({
      where: { id: experienceId },
    });

    if (!experience || experience.userId !== req.user!.id) {
      return res.status(404).json({ error: "Experience not found or unauthorized" });
    }

    await prisma.experience.delete({
      where: { id: experienceId },
    });

    return res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: "Failed to delete experience" });
  }
};
