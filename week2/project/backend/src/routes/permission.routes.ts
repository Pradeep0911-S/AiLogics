import { Router } from "express";
import { permissionController } from "../controllers/permission.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { requireRole } from "../middlewares/authorization.middleware.js";
import { ROLES } from "../constants/roles.constant.js";
import { validate } from "../validation/response.zod.validation.js";
import { createPermissionSchema } from "../validation/permission.schema.validation.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const permissionRouter = Router();

permissionRouter.use(authenticationMiddleware);

permissionRouter.post(
  "/",
  requireRole(ROLES.ADMIN),
  validate(createPermissionSchema),
  asyncHandler(permissionController.create)
);

export default permissionRouter;