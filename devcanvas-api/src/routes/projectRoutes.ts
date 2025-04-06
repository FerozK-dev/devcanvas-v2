// @ts-nocheck
import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectsController";
import { authenticateUser } from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadMiddleware";

const router = express.Router();

router.post(
  '/projects',
  authenticateUser,
  upload.single('displayImage'), // Use single() instead of fields()
  createProject
);

// For updating projects with image replacement
router.put(
  '/projects/:id',
  authenticateUser,
  upload.single('displayImage'),
  updateProject
);

router.get("/projects", authenticateUser, getProjects);
router.post("/projects", authenticateUser, createProject);
router.put("/projects/:id", authenticateUser, updateProject);
router.delete("/projects/:id", authenticateUser, deleteProject);

export default router;
