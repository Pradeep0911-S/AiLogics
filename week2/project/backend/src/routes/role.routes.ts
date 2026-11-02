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

/**
 * @swagger
 * tags:
 *   - name: Roles
 *     description: Manage user roles and access levels
 */

/**
 * @swagger
 * /api/admin/roles:
 *   post:
 *     summary: Create a new role
 *     description: Creates a new role. Only authenticated ADMIN users can perform this operation.
 *     tags: [Roles]
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
 *                 maxLength: 50
 *                 example: MANAGER
 *                 description: Role name. Leading and trailing spaces are trimmed and the value is converted to uppercase.
 *           example:
 *             name: MANAGER
 *     responses:
 *       "201":
 *         description: Role created successfully
 *       "400":
 *         description: Invalid request data or role already exists
 *       "401":
 *         description: Authentication required or invalid token
 *       "403":
 *         description: Only ADMIN users are allowed to create roles
 */


roleRouter.post(
    "/",
    requireRole(ROLES.ADMIN),
    validate(createRoleSchema),
    asyncHandler(roleController.create)
);


export default roleRouter;