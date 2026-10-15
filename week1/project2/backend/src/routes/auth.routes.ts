import { Router } from "express";
import { register } from "../controller/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", register);

export default authRoutes;
