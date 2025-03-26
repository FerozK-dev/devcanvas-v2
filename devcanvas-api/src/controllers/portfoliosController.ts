import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { serializePortfolio } from "../utils/serializers";

export const showPublicPortfolio = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        experiences: true,
        educations: true,
        projects: true,
      },
    });

    if (!user || !user.publishPortfolio) {
      return res.status(404).json({ error: "Portfolio not found or not published" });
    }

    return res.json(serializePortfolio(user));
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
