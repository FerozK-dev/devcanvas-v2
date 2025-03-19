import { Elysia } from "elysia";
import { authRoutes } from "./routes/authRoutes";
import { jwt } from "@elysiajs/jwt";
import { jwtConfig } from "./middleware/authMiddleware";
import dotenv from "dotenv";

dotenv.config();

export const app = new Elysia()
  .use(jwt(jwtConfig))
  .use(authRoutes);

  app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
    console.log("📌 Available Routes:");
    app.routes.forEach(route => console.log(`➡️ ${route.method} ${route.path}`));
  });
