import { Response } from "express";
import { prisma } from "../db/prisma";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { serializeProject } from "../utils/serializers";
import storage from '../utils/storageService';

export const getProjects = async (req: AuthenticatedRequest, res: Response ): Promise<void> => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        userId: req.user!.id
      }
    });

    res.json(projects.map(serializeProject));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
}

export const createProject = async (req: AuthenticatedRequest, res: Response ): Promise<void> => {
  try {
    const projectData = req.body;

    // We use single() instead of fields(), so req.file instead of req.files
    if (req.file) {
      const files = {
        displayImage: [req.file]
      } as Record<string, Express.Multer.File[]>;

      if (files.displayImage) {
        projectData.displayImage = await storage.upload(
          files.displayImage[0],
          'project-demo-images'
        );
      }
    }

    const newProject = await prisma.project.create({
      data: {
        ...projectData,
        userId: req.user!.id,
      },
    });

    res.status(201).json(serializeProject(newProject));
  } catch (error) {
    res.status(400).json({ error: "Failed to create project" });
  }
};

export const updateProject = async (req: AuthenticatedRequest, res: Response ): Promise<void> => {
  try {
    const projectId = Number(req.params.id);
    const projectData = req.body;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (req.file) {
      if (project?.displayImage) {
        await storage.delete(project.displayImage);
      }

      projectData.displayImage = await storage.upload(
        req.file,
        'project-demo-images'
      );
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: projectData,
    });

    res.json({ message: "project updated successfully", project: serializeProject(updatedProject) });
  } catch (error) {
    res.status(400).json({ error: "Failed to update project" });
  }
};

// Delete an education for the current user
export const deleteProject = async (req: AuthenticatedRequest, res: Response ): Promise<void> => {
  try {
    const projectId = Number(req.params.id);

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project || project.userId !== req.user!.id) {
      res.status(404).json({ error: "Project not found or unauthorized" });
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete project" });
  }
};
