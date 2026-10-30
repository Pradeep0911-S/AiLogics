
import type { Response } from "express";
import { bookingService } from "../services/booking.services.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";
import { successResponse } from "../utils/response.js";
import type { AuthRequest } from "../middlewares/authentication.middleware.js";
import { MESSAGES } from "../constants/messages.constant.js";

export const bookingController = {
  create: async (req: AuthRequest, res: Response) => {
    const booking = await bookingService.create(
      req.user!.id,
      req.body
    );

    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      MESSAGES.BOOKING_CREATED,
      booking
    );
  },

  findAll: async (req: AuthRequest, res: Response) => {
    const bookings = await bookingService.findAll(
      req.user!.id,
      req.user!.role
    );

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.BOOKING_RETRIVED,
      bookings
    );
  },

  // findMine: async (req: AuthRequest, res: Response) => {
  //   const bookings = await bookingService.findMine(
  //     req.user!.id,
  //     req.user!.role
  //   );

  //   return successResponse(
  //     res,
  //     HTTP_STATUS.OK,
  //     "Your bookings retrieved successfully",
  //     bookings
  //   );
  // },

  findById: async (req: AuthRequest, res: Response) => {
    const booking = await bookingService.findById(
      req.params.id as string,
      req.user!.id,
      req.user!.role
    );

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.BOOKING_RETRIVED,
      booking
    );
  },

  assign: async (req: AuthRequest, res: Response) => {
    const booking = await bookingService.assign(
      req.params.id as string,
      req.body,
      req.user!.role
    );
``
    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.BOOKING_ASSIGNED,
      booking
    );
  },

  updateStatus: async (req: AuthRequest, res: Response) => {
    const booking = await bookingService.updateStatus(
      req.params.id as string,
      req.body,
      req.user!.id,
      req.user!.role
    );

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.BOOKING_UPDATED,
      booking
    );
  },

  cancel: async (req: AuthRequest, res: Response) => {
    const booking = await bookingService.cancel(
      req.params.id as string,
      req.user!.id,
      req.user!.role
    );

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.BOOKING_CANCLLED,
      booking
    );
  },
};
