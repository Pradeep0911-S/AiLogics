
import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/auth.validation.js";
import { registerSchema, loginSchema } from "../validation/auth.schema.validation.js";

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema),authController.register);
authRoutes.post("/login", validate(loginSchema),authController.login);

export default authRoutes;
