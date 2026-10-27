
import { Router } from "express";
import { bookingController } from "../controllers/booking.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { requirePermission } from "../middlewares/authorization.middleware.js";
import { validate } from "../validation/response.zod.validation.js";
import {
  createBookingSchema,
  assignBookingSchema,
  updateBookingStatusSchema,
} from "../validation/booking.schema.validation.js";
import { PERMISSIONS } from "../constants/permissions.constant.js";
import { asyncHandler } from "../utils/async-handler.js";

const bookingRoutes = Router();

bookingRoutes.use(authenticationMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Bookings
 *     description: Manage service bookings
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceId
 *             properties:
 *               serviceId:
 *                 type: string
 *                 format: uuid
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       "201":
 *         description: Booking created successfully
 *       "400":
 *         description: Invalid request data
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 */
bookingRoutes.post(
  "/",
  requirePermission(PERMISSIONS.CREATE_BOOKING),
  validate(createBookingSchema),
  asyncHandler(bookingController.create)
);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Bookings retrieved successfully
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 */
bookingRoutes.get(
  "/",
  requirePermission(PERMISSIONS.READ_BOOKINGS),
  asyncHandler(bookingController.findAll)
);

// /**
//  * @swagger
//  * /api/bookings/mine:
//  *   get:
//  *     summary: Get the authenticated user's bookings
//  *     tags: [Bookings]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       "200":
//  *         description: User bookings retrieved successfully
//  *       "401":
//  *         description: Authentication required
//  *       "403":
//  *         description: Permission denied
//  */
// bookingRoutes.get(
//   "/mine",
//   requirePermission(PERMISSIONS.READ_BOOKINGS),
//   asyncHandler(bookingController.findMine)
// );

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       "200":
 *         description: Booking retrieved successfully
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 *       "404":
 *         description: Booking not found
 */
bookingRoutes.get(
  "/:id",
  requirePermission(PERMISSIONS.READ_BOOKINGS),
  asyncHandler(bookingController.findById)
);

/**
 * @swagger
 * /api/bookings/{id}/assign:
 *   patch:
 *     summary: Assign a booking to a user
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - assignedUserId
 *             properties:
 *               assignedUserId:
 *                 type: string
 *                 format: uuid
 *                 example: 123e4567-e89b-12d3-a456-426614174001
 *     responses:
 *       "200":
 *         description: Booking assigned successfully
 *       "400":
 *         description: Invalid request data
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 *       "404":
 *         description: Booking or user not found
 */
bookingRoutes.patch(
  "/:id/assign",
  requirePermission(PERMISSIONS.ASSIGN_BOOKING),
  validate(assignBookingSchema),
  asyncHandler(bookingController.assign)
);

/**
 * @swagger
 * /api/bookings/{id}/status:
 *   patch:
 *     summary: Update booking status
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - IN_PROGRESS
 *                   - COMPLETED
 *                 example: IN_PROGRESS
 *     responses:
 *       "200":
 *         description: Booking status updated successfully
 *       "400":
 *         description: Invalid status or request data
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 *       "404":
 *         description: Booking not found
 */
bookingRoutes.patch(
  "/:id/status",
  requirePermission(PERMISSIONS.UPDATE_BOOKING_STATUS),
  validate(updateBookingStatusSchema),
  asyncHandler(bookingController.updateStatus)
);

/**
 * @swagger
 * /api/bookings/{id}/cancel:
 *   patch:
 *     summary: Cancel a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       "200":
 *         description: Booking cancelled successfully
 *       "401":
 *         description: Authentication required
 *       "403":
 *         description: Permission denied
 *       "404":
 *         description: Booking not found
 */
bookingRoutes.patch(
  "/:id/cancel",
  requirePermission(PERMISSIONS.CANCEL_BOOKING),
  asyncHandler(bookingController.cancel)
);

export default bookingRoutes;
