import { Router } from "express";
import { register } from "../controller/authController";

const authRoutes = Router();

authRoutes.post("/register", register);

export default authRoutes;
