import { Router } from "express";
import { userController } from "../controller/user.contoller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const userRoutes = Router();


userRoutes.use(authMiddleware.authenticate);

userRoutes.get("/", userController.getAllUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;
