import express from "express";
import {
  showProfile,
  updateUser,
  togglePortfolioStatus,
} from "../controllers/usersController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/user/profile", authenticateUser, showProfile);
router.put("/user/update", authenticateUser, updateUser);
router.patch("/user/toggle-portfolio-status", authenticateUser, togglePortfolioStatus);

export default router;
