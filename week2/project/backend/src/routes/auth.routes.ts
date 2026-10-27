
import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { validate } from "../validation/response.zod.validation.js";
import {
  registerSchema,
  loginSchema,
} from "../validation/auth.schema.validation.js";
import { asyncHandler } from "../utils/async-handler.js";

const authRoutes = Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User registration and login
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new account
 *     tags: [Authentication]
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
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: Must contain lowercase, uppercase, a number, and a special character.
 *                 example: Password1!
 *     responses:
 *       "201":
 *         description: User registered successfully
 *       "400":
 *         description: Invalid request data
 *       "409":
 *         description: Account already exists, if applicable
 *       "500":
 *         description: Internal server error
 */
authRoutes.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register)
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in to an account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password1!
 *     responses:
 *       "200":
 *         description: Login successful; response contains login data
 *       "400":
 *         description: Invalid request data
 *       "401":
 *         description: Invalid credentials
 *       "500":
 *         description: Internal server error
 */
authRoutes.post(
  "/login",
  validate(loginSchema),
  asyncHandler(authController.login)
);

export default authRoutes;
