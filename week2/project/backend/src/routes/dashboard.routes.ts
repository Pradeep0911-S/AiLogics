
import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { requirePermission } from "../middlewares/authorization.middleware.js";
import { PERMISSIONS } from "../constants/permissions.constant.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const dashboardRoutes = Router();

/**
 * @swagger
 * tags:
 *   - name: Dashboard
 *     description: Dashboard statistics
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Dashboard statistics retrieved successfully
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 *       "500":
 *         description: Internal server error
 */
dashboardRoutes.get(
  "/",
  authenticationMiddleware,
  requirePermission(PERMISSIONS.READ_USERS),
  asyncHandler(dashboardController.getStatistics)
);

export default dashboardRoutes;
