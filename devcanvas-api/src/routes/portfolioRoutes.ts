// @ts-nocheck
import express from "express";
import { showPublicPortfolio } from "../controllers/portfoliosController";

const router = express.Router();

router.get("/portfolios/:id/public", showPublicPortfolio);

export default router;
