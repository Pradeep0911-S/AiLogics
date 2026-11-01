import { Router } from "express";
import { requirePermission } from "../middlewares/authorization.middleware";
import { PERMISSIONS } from "../constants/permissions.constant";
import { validate } from "../validation/response.zod.validation";
import { createUserSchema } from "../validation/user.schema.validation";
import { asyncHandler } from "../utils/asyncHandler";
import { adminController } from "../controllers/admin.controller";
import { authenticationMiddleware } from "../middlewares/authentication.middleware";

const adminRoutes = Router();

adminRoutes.use(authenticationMiddleware);

adminRoutes.post("/createadmin",
    requirePermission(PERMISSIONS.CREATE_USER),
    validate(createUserSchema),
    asyncHandler(adminController.create));

export default adminRoutes;