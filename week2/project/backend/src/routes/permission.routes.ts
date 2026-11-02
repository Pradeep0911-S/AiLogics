
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

/**
 * @swagger
 * tags:
 *   - name: Permissions
 *     description: Manage application permissions
 */

/**
 * @swagger
 * /api/admin/permissions:
 *   post:
 *     summary: Create a new permission
 *     description: Creates a new permission. Only authenticated ADMIN users can perform this operation.
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: CREATE_USER
 *                 description: Permission name. Leading and trailing spaces are trimmed and the value is converted to uppercase.
 *           example:
 *             name: CREATE_USER
 *     responses:
 *       "201":
 *         description: Permission created successfully
 *       "400":
 *         description: Invalid permission data or permission already exists
 *       "401":
 *         description: Authentication required or invalid token
 *       "403":
 *         description: Only ADMIN users are allowed to create permissions
 */
permissionRouter.post(
  "/",
  requireRole(ROLES.ADMIN),
  validate(createPermissionSchema),
  asyncHandler(permissionController.create)
);

export default permissionRouter;
