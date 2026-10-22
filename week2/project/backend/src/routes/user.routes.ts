
import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { requirePermission } from "../middlewares/authorization.middleware.js";
import { validate } from "../middlewares/auth.validation.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validation/user.schema.validation.js";
import { PERMISSIONS } from "../constants/permissions.constant.js";
import { asyncHandler } from "../utils/async-handler.js";

const userRoutes = Router();

userRoutes.use(authenticationMiddleware);

userRoutes.post(
  "/",
  requirePermission(PERMISSIONS.CREATE_USER),
  validate(createUserSchema),
  asyncHandler(userController.create)
);

userRoutes.get(
  "/",
  requirePermission(PERMISSIONS.READ_USERS),
  asyncHandler(userController.findAll)
);

userRoutes.get(
  "/:id",
  requirePermission(PERMISSIONS.READ_USERS),
  asyncHandler(userController.findById)
);

userRoutes.patch(
  "/:id",
  requirePermission(PERMISSIONS.UPDATE_USER),
  validate(updateUserSchema),
  asyncHandler(userController.update)
);

userRoutes.delete(
  "/:id",
  requirePermission(PERMISSIONS.DELETE_USER),
  asyncHandler(userController.delete)
);

export default userRoutes;
