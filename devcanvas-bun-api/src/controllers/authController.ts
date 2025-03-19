import { prisma } from "../db/prisma";
import bcrypt from "bcryptjs";
import { t } from "elysia";

export const AuthController = {
  // Signup
  async signup({ body }: any) {
    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return { message: "All credentials are required. Please provide first name, last name, email, and password." };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { message: "Account with this email already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword },
    });

    return { message: "User registered successfully", user: { id: user.id, email: user.email } };
  },

  // Login
  async login({ body, jwt }: any) {
    const { email, password } = body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return { error: "User not found" };

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return { error: "Invalid credentials" };

    const token = await jwt.sign({ id: user.id, email: user.email });
    return { token, user: { id: user.id, name: user.name, email: user.email } };
  },
};
