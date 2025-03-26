import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectsController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/projects", authenticateUser, getProjects);
router.post("/projects", authenticateUser, createProject);
router.put("/projects/:id", authenticateUser, updateProject);
router.delete("/projects/:id", authenticateUser, deleteProject);

export default router;
