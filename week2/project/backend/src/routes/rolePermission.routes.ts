
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

/**
 * @swagger
 * tags:
 *   - name: Role Permissions
 *     description: Assign and remove permissions from roles
 */

/**
 * @swagger
 * /api/admin/role-permissions:
 *   post:
 *     summary: Assign permission to a role
 *     description: Assigns an existing permission to an existing role. Only ADMIN users can perform this operation.
 *     tags: [Role Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *               - permissionId
 *             properties:
 *               roleId:
 *                 type: string
 *                 format: uuid
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               permissionId:
 *                 type: string
 *                 format: uuid
 *                 example: "660e8400-e29b-41d4-a716-446655440000"
 *           example:
 *             roleId: "550e8400-e29b-41d4-a716-446655440000"
 *             permissionId: "660e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       "201":
 *         description: Permission assigned to role successfully
 *       "400":
 *         description: Invalid request data or permission already assigned
 *       "401":
 *         description: Authentication required or invalid token
 *       "403":
 *         description: Only ADMIN users are allowed to assign permissions
 *       "404":
 *         description: Role or permission not found
 *
 *   delete:
 *     summary: Remove permission from a role
 *     description: Removes an assigned permission from a role. Only ADMIN users can perform this operation.
 *     tags: [Role Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *               - permissionId
 *             properties:
 *               roleId:
 *                 type: string
 *                 format: uuid
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               permissionId:
 *                 type: string
 *                 format: uuid
 *                 example: "660e8400-e29b-41d4-a716-446655440000"
 *           example:
 *             roleId: "550e8400-e29b-41d4-a716-446655440000"
 *             permissionId: "660e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       "200":
 *         description: Permission removed from role successfully
 *       "400":
 *         description: Invalid request data or permission is not assigned to role
 *       "401":
 *         description: Authentication required or invalid token
 *       "403":
 *         description: Only ADMIN users are allowed to remove permissions
 *       "404":
 *         description: Role or permission not found
 */

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
