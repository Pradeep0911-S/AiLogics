
import { Router } from "express";
import { authController } from "../controller/auth.controller.js";
import { validate } from "../validation/auth.validation.js";
import {registerSchema,loginSchema} from "../validation/auth.rules.validation.js";

const authRoutes = Router();

authRoutes.post("/register",validate(registerSchema),authController.register);

authRoutes.post("/login",validate(loginSchema),authController.login);

export default authRoutes;
