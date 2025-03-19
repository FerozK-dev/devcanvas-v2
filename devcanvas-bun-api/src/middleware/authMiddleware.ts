import { t } from "elysia";

export const jwtConfig = {
  name: "jwt",
  secret: process.env.JWT_SECRET || "default_secret",
  schema: t.Object({
    id: t.Number(),
    email: t.String(),
  }),
};
