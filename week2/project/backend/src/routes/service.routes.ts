
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

/**
 * @swagger
 * tags:
 *   - name: Services
 *     description: Manage services
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Services retrieved successfully
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 */
serviceRoutes.get(
  "/",
  authenticationMiddleware,
  requirePermission(PERMISSIONS.READ_SERVICES),
  asyncHandler(serviceController.findAll)
);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID
 *     responses:
 *       "200":
 *         description: Service retrieved successfully
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 *       "404":
 *         description: Service not found
 */
serviceRoutes.get(
  "/:id",
  authenticationMiddleware,
  requirePermission(PERMISSIONS.READ_SERVICES),
  asyncHandler(serviceController.findById)
);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a service
 *     tags: [Services]
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
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: Home Cleaning
 *     responses:
 *       "201":
 *         description: Service created successfully
 *       "400":
 *         description: Invalid request data
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 */
serviceRoutes.post(
  "/",
  authenticationMiddleware,
  requirePermission(PERMISSIONS.CREATE_SERVICE),
  validate(createServiceSchema),
  asyncHandler(serviceController.create)
);

/**
 * @swagger
 * /api/services/{id}:
 *   patch:
 *     summary: Update a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID
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
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: Office Cleaning
 *     responses:
 *       "200":
 *         description: Service updated successfully
 *       "400":
 *         description: Invalid request data
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 *       "404":
 *         description: Service not found
 */
serviceRoutes.patch(
  "/:id",
  authenticationMiddleware,
  requirePermission(PERMISSIONS.UPDATE_SERVICE),
  validate(updateServiceSchema),
  asyncHandler(serviceController.update)
);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID
 *     responses:
 *       "200":
 *         description: Service deleted successfully
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 *       "404":
 *         description: Service not found
 */
serviceRoutes.delete(
  "/:id",
  authenticationMiddleware,
  requirePermission(PERMISSIONS.DELETE_SERVICE),
  asyncHandler(serviceController.delete)
);

export default serviceRoutes;
