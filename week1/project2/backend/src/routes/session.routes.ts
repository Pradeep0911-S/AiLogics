import { Router } from "express";
import { sessionController } from "../controller/session.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const sessionRoutes = Router();

sessionRoutes.use(authMiddleware.authenticate);

sessionRoutes.get("/", sessionController.getAll);

sessionRoutes.get("/:id", sessionController.getById);

sessionRoutes.delete("/:id", sessionController.revoke);


sessionRoutes.delete("/", sessionController.revokeAll);

export default sessionRoutes;
