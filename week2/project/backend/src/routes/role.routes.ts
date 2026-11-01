import {Router} from "express";
import { roleController } from "../controllers/role.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { requireRole } from "../middlewares/authorization.middleware.js";
import { ROLES } from "../constants/roles.constant.js";
import { validate } from "../validation/response.zod.validation.js";
import { createRoleSchema } from "../validation/role.schema.validation.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const roleRouter = Router();

roleRouter.use(authenticationMiddleware);


roleRouter.post(
    "/",
    requireRole(ROLES.ADMIN),
    validate(createRoleSchema),
    asyncHandler(roleController.create)
);


export default roleRouter;