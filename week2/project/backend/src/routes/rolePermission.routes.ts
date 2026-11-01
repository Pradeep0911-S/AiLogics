import { Router } from "express";
import { rolePermissionController } from "../controllers/rolePermission.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { requireRole } from "../middlewares/authorization.middleware.js";
import { ROLES } from "../constants/roles.constant.js";
import { validate } from "../validation/response.zod.validation.js";
import { assignPermissionSchema } from "../validation/rolePermission.schema.validation.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const rolePermissionRouter = Router();

rolePermissionRouter.use(authenticationMiddleware);

rolePermissionRouter.post(
  "/",
  requireRole(ROLES.ADMIN),
  validate(assignPermissionSchema),
  asyncHandler(rolePermissionController.assign)
);

rolePermissionRouter.delete(
  "/",
  requireRole(ROLES.ADMIN),
  validate(assignPermissionSchema),
  asyncHandler(rolePermissionController.remove)
);

export default rolePermissionRouter;