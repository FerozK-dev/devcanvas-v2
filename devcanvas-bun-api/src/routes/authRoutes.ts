import { Elysia } from "elysia";
import { AuthController } from "../controllers/authController";

export const authRoutes = new Elysia()
  .post("/signup", AuthController.signup)
  .post("/login", AuthController.login)
  .get("/protected", async ({ jwt, headers }: any) => {
    const token = headers.authorization?.replace("Bearer ", "");
    if (!token) return { error: "Unauthorized" };

    const user = await jwt.verify(token);
    return user ? { message: "Access granted", user } : { error: "Invalid token" };
  });
