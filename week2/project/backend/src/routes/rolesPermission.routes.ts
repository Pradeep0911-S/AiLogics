import { Router } from "express";
import { requirePermission } from "../middlewares/authorization.middleware";
import { PERMISSIONS } from "../constants/permissions.constant";
import { validate } from "../validation/response.zod.validation";
import { createUserSchema } from "../validation/user.schema.validation";
import { asyncHandler } from "../utils/asyncHandler";
import { rolesPermissionController } from "../controllers/rolesPermission.controller";

const rolesPermissionRoutes = Router();

rolesPermissionRoutes.post("/admin",
    requirePermission(PERMISSIONS.CREATE_USER),
    validate(createUserSchema),
    asyncHandler(rolesPermissionController.create));


rolesPermissionRoutes.delete