
import { Router } from "express";
import { bookingController } from "../controllers/booking.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { requirePermission } from "../middlewares/authorization.middleware.js";
import { validate } from "../middlewares/auth.validation.js";
import {
  createBookingSchema,
  assignBookingSchema,
  updateBookingStatusSchema,
} from "../validation/booking.schema.validation.js";
import { PERMISSIONS } from "../constants/permissions.constant.js";
import { asyncHandler } from "../utils/async-handler.js";

const bookingRoutes = Router();

bookingRoutes.use(authenticationMiddleware);

bookingRoutes.post(
  "/",
  requirePermission(PERMISSIONS.CREATE_BOOKING),
  validate(createBookingSchema),
  asyncHandler(bookingController.create)
);

bookingRoutes.get(
  "/",
  requirePermission(PERMISSIONS.READ_BOOKINGS),
  asyncHandler(bookingController.findAll)
);

bookingRoutes.get(
  "/mine",
  requirePermission(PERMISSIONS.READ_BOOKINGS),
  asyncHandler(bookingController.findMine)
);

bookingRoutes.get(
  "/:id",
  requirePermission(PERMISSIONS.READ_BOOKINGS),
  asyncHandler(bookingController.findById)
);

bookingRoutes.patch(
  "/:id/assign",
  requirePermission(PERMISSIONS.ASSIGN_BOOKING),
  validate(assignBookingSchema),
  asyncHandler(bookingController.assign)
);

bookingRoutes.patch(
  "/:id/status",
  requirePermission(PERMISSIONS.UPDATE_BOOKING_STATUS),
  validate(updateBookingStatusSchema),
  asyncHandler(bookingController.updateStatus)
);

bookingRoutes.patch(
  "/:id/cancel",
  requirePermission(PERMISSIONS.CANCEL_BOOKING),
  asyncHandler(bookingController.cancel)
);

export default bookingRoutes;
