
import { Router } from "express";
import { requireRole } from "../middlewares/authorization.middleware";
import { validate } from "../validation/response.zod.validation";
import { createUserSchema } from "../validation/user.schema.validation";
import { asyncHandler } from "../utils/asyncHandler";
import { adminController } from "../controllers/admin.controller";
import { authenticationMiddleware } from "../middlewares/authentication.middleware";
import { ROLES } from "../constants/roles.constant";

const adminRoutes = Router();

adminRoutes.use(authenticationMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Admin management and account creation
 */

/**
 * @swagger
 * /api/admin/createadmin:
 *   post:
 *     summary: Create a new admin
 *     description: Creates a new admin account. Only authenticated ADMIN users can perform this operation.
 *     tags: [Admin]
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
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jane@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: Must contain lowercase, uppercase, a number, and a special character.
 *                 example: Password1!
 *     responses:
 *       "201":
 *         description: Admin account created successfully
 *       "400":
 *         description: Invalid user data or email already exists
 *       "401":
 *         description: Authentication required or invalid token
 *       "403":
 *         description: Only ADMIN users are allowed to create admin accounts
 */

adminRoutes.post(
    "/createadmin",
    requireRole(ROLES.ADMIN),
    validate(createUserSchema),
    asyncHandler(adminController.create)
);

export default adminRoutes;
