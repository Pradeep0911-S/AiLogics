import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";

const routes = Router();
routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);

export default routes;
