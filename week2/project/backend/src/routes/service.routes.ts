
import { Router } from "express";
import { serviceController } from "../controllers/service.contoller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { requirePermission } from "../middlewares/authorization.middleware.js";
import { validate } from "../middlewares/auth.validation.js";
import {
  createServiceSchema,
  updateServiceSchema,
} from "../validation/service.schema.validation.js";
import { PERMISSIONS } from "../constants/permissions.constant.js";
import { asyncHandler } from "../utils/async-handler.js";

const serviceRoutes = Router();

serviceRoutes.get(
  "/",
  authenticationMiddleware,
  requirePermission(PERMISSIONS.READ_SERVICES),
  asyncHandler(serviceController.findAll)
);

serviceRoutes.get(
  "/:id",
  authenticationMiddleware,
  requirePermission(PERMISSIONS.READ_SERVICES),
  asyncHandler(serviceController.findById)
);

serviceRoutes.post(
  "/",
  authenticationMiddleware,
  requirePermission(PERMISSIONS.CREATE_SERVICE),
  validate(createServiceSchema),
  asyncHandler(serviceController.create)
);

serviceRoutes.patch(
  "/:id",
  authenticationMiddleware,
  requirePermission(PERMISSIONS.UPDATE_SERVICE),
  validate(updateServiceSchema),
  asyncHandler(serviceController.update)
);

serviceRoutes.delete(
  "/:id",
  authenticationMiddleware,
  requirePermission(PERMISSIONS.DELETE_SERVICE),
  asyncHandler(serviceController.delete)
);

export default serviceRoutes;
