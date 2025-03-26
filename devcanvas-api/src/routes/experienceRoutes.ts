import express from "express";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experiencesController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/experiences", authenticateUser, getExperiences);
router.post("/experiences", authenticateUser, createExperience);
router.put("/experiences/:id", authenticateUser, updateExperience);
router.delete("/experiences/:id", authenticateUser, deleteExperience);

export default router;
