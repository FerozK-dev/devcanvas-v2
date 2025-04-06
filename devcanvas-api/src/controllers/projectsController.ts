import { Response } from "express";
import { prisma } from "../db/prisma";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { serializeProject } from "../utils/serializers";
import storage from '../utils/storageService';

export const getProjects = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        userId: req.user!.id
      }
    });

    return res.json(projects.map(serializeProject));
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch projects" });
  }
}

export const createProject = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const projectData = req.body;

    if (req.files) {
      const files = req.files as Record<string, Express.Multer.File[]>;

      if (files.displayImage) {
        projectData.displayImage = await storage.upload(
          files.displayImage[0],
          'profile-pictures'
        );
      }
    }

    const newProject = await prisma.project.create({
      data: {
        ...projectData,
        userId: req.user!.id,
      },
    });

    return res.status(201).json(serializeProject(newProject));
  } catch (error) {
    return res.status(400).json({ error: "Failed to create project" });
  }
};

// Update an project for the current user
// export const updateProject = async (req: AuthenticatedRequest, res: Response) => {
//   try {
//     const projectId = Number(req.params.id);
//     const projectData = req.body;

//     const project = await prisma.project.findUnique({
//       where: { id: projectId },
//     });

//     debugger

//     if (!project || project.userId !== req.user!.id) {
//       return res.status(404).json({ error: "Project not found or unauthorized" });
//     }

//     if (req.file) {
//       if (project?.displayImage) {
//         await storage.delete(project.displayImage);
//       }
//       const file = req.file

//       if (file.displayImage) {
//         projectData.displayImage = await storage.upload(
//           file.displayImage[0],
//           'project-images'
//         );
//       }
//     }

//     const updatedProject = await prisma.project.update({
//       where: { id: projectId },
//       data: projectData,
//     });

//     return res.json({ message: "project updated successfully", project: serializeProject(updatedProject) });
//   } catch (error) {
//     return res.status(400).json({ error: "Failed to update project" });
//   }
// };

export const updateProject = async (req: AuthenticatedRequest, res: Response) => {
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
        'project-images'
      );
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: projectData,
    });

    return res.json({ message: "project updated successfully", project: serializeProject(updatedProject) });
  } catch (error) {
    return res.status(400).json({ error: "Failed to update project" });
  }
};

// Delete an education for the current user
export const deleteProject = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const projectId = Number(req.params.id);

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project || project.userId !== req.user!.id) {
      return res.status(404).json({ error: "Project not found or unauthorized" });
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    return res.json({ message: "Project deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: "Failed to delete project" });
  }
};
