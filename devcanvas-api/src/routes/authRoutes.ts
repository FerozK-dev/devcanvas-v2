// @ts-nocheck
import express from "express";
import { signup, login } from "../controllers/authContoller";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
