
import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { requirePermission } from "../middlewares/authorization.middleware.js";
import { validate } from "../validation/response.zod.validation.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validation/user.schema.validation.js";
import { PERMISSIONS } from "../constants/permissions.constant.js";
import { asyncHandler } from "../utils/async-handler.js";

const userRoutes = Router();

userRoutes.use(authenticationMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Manage users
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a user
 *     tags: [Users]
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
 *         description: User created successfully
 *       "400":
 *         description: Invalid request data
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 */
userRoutes.post(
  "/",
  requirePermission(PERMISSIONS.CREATE_USER),
  validate(createUserSchema),
  asyncHandler(userController.create)
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Users retrieved successfully
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 */
userRoutes.get(
  "/",
  requirePermission(PERMISSIONS.READ_USERS),
  asyncHandler(userController.findAll)
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       "200":
 *         description: User retrieved successfully
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 *       "404":
 *         description: User not found
 */
userRoutes.get(
  "/:id",
  requirePermission(PERMISSIONS.READ_USERS),
  asyncHandler(userController.findById)
);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: Jane Smith
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jane.smith@example.com
 *               isActive:
 *                 type: boolean
 *                 example: true
 *             description: Provide at least one field to update.
 *     responses:
 *       "200":
 *         description: User updated successfully
 *       "400":
 *         description: Invalid request data
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 *       "404":
 *         description: User not found
 */
userRoutes.patch(
  "/:id",
  requirePermission(PERMISSIONS.UPDATE_USER),
  validate(updateUserSchema),
  asyncHandler(userController.update)
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       "200":
 *         description: User deleted successfully
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 *       "404":
 *         description: User not found
 */
userRoutes.delete(
  "/:id",
  requirePermission(PERMISSIONS.DELETE_USER),
  asyncHandler(userController.delete)
);

export default userRoutes;
