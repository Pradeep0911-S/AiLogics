import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import sessionRoutes from "./session.routes.js";

const routes = Router();
routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/sessions", sessionRoutes);

export default routes;
