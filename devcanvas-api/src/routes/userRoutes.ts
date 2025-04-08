import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware";
import {
  showProfile,
  updateUser,
  togglePortfolioStatus,
} from "../controllers/usersController";
import upload from "../middlewares/uploadMiddleware";

const router = express.Router();

router.put(
  "/user/update",
  authenticateUser,
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateUser
);

router.get("/user/profile", authenticateUser, showProfile);
router.put("/user/update", authenticateUser, updateUser);
router.patch("/user/toggle-portfolio-status", authenticateUser, togglePortfolioStatus);

export default router;
