import express from "express";
import {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/educationsController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/educations", authenticateUser, getEducations);
router.post("/educations", authenticateUser, createEducation);
router.put("/educations/:id", authenticateUser, updateEducation);
router.delete("/educations/:id", authenticateUser, deleteEducation);

export default router;
