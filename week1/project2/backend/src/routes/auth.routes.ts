
import { Router } from "express";
import { authController } from "../controller/auth.controller.js";
import { validate } from "../validation/auth.validation.js";
import {registerSchema,loginSchema} from "../validation/auth.rules.validation.js";
import { refreshTokenController } from "../controller/refreshToken.controller.js";


const authRoutes = Router();

authRoutes.post("/register",validate(registerSchema),authController.register);

authRoutes.post("/login",validate(loginSchema),authController.login);

authRoutes.post("/refresh",refreshTokenController.refresh);

authRoutes.post("/logout", authController.logout);

export default authRoutes;
