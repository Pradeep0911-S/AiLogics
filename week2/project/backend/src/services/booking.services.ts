
import { Booking } from "../models/booking.model.js";
import { Service } from "../models/services.model.js";
import { User } from "../models/users.model.js";
import { Role } from "../models/roles.model.js";
import { AppError } from "../error/app-error.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { BOOKING_STATUS } from "../constants/booking-status.constant.js";
import type {
  CreateBookingInput,
  AssignBookingInput,
  UpdateBookingStatusInput,
} from "../validation/booking.schema.validation.js";

const bookingIncludes = [
  { model: User, as: "customer", attributes: ["id", "name", "email"] },
  { model: User, as: "assignedUser", attributes: ["id", "name", "email"] },
  { model: Service, as: "service" },
];

const denyAccess = () =>
  new AppError(HTTP_STATUS.FORBIDDEN, "You cannot access this booking");

export const bookingService = {
  create: async (customerId: string, input: CreateBookingInput) => {
    const service = await Service.findByPk(input.serviceId);

    if (!service) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, "Service not found");
    }

    return Booking.create({
      customerId,
      serviceId: input.serviceId,
      status: BOOKING_STATUS.PENDING,
    });
  },

  findAll: async (userId: string, role: string) => {
    let where = {};

    if (role === "USER") {
      where = { assignedUserId: userId };
    } else if (role === "CUSTOMER") {
      where = { customerId: userId };
    } else if (role !== "ADMIN") {
      throw denyAccess();
    }

    return Booking.findAll({
      where,
      include: bookingIncludes,
      order: [["createdAt", "DESC"]],
    });
  },

  findById: async (id: string, userId: string, role: string) => {
    const booking = await Booking.findByPk(id, {
      include: bookingIncludes,
    });

    if (!booking) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, "Booking not found");
    }

    if (
      (role === "CUSTOMER" && booking.customerId !== userId) ||
      (role === "USER" && booking.assignedUserId !== userId) ||
      !["ADMIN", "USER", "CUSTOMER"].includes(role)
    ) {
      throw denyAccess();
    }

    return booking;
  },

  findMine: async (userId: string, role: string) => {
    if (role === "ADMIN") {
      return Booking.findAll({
        include: bookingIncludes,
        order: [["createdAt", "DESC"]],
      });
    }

    if (role !== "USER" && role !== "CUSTOMER") {
      throw denyAccess();
    }

    const where =
      role === "USER"
        ? { assignedUserId: userId }
        : { customerId: userId };

    return Booking.findAll({
      where,
      include: bookingIncludes,
      order: [["createdAt", "DESC"]],
    });
  },

  assign: async (
    id: string,
    input: AssignBookingInput,
    role: string
  ) => {
    if (role !== "ADMIN") {
      throw denyAccess();
    }

    const booking = await Booking.findByPk(id);

    if (!booking) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, "Booking not found");
    }

    if (
      booking.status === BOOKING_STATUS.COMPLETED ||
      booking.status === BOOKING_STATUS.CANCELLED
    ) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        "This booking cannot be assigned"
      );
    }

    const staffRole = await Role.findOne({
      where: { name: "USER" },
    });

    const staff = await User.findByPk(input.assignedUserId);

    if (
      !staff ||
      !staff.isActive ||
      !staffRole ||
      staff.roleId !== staffRole.id
    ) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        "Assigned user must be an active staff member"
      );
    }

    await booking.update({ assignedUserId: staff.id });

    return Booking.findByPk(booking.id, {
      include: bookingIncludes,
    });
  },

  updateStatus: async (
    id: string,
    input: UpdateBookingStatusInput,
    userId: string,
    role: string
  ) => {
    if (role !== "ADMIN" && role !== "USER") {
      throw denyAccess();
    }

    const booking = await Booking.findByPk(id);

    if (!booking) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, "Booking not found");
    }

    if (role === "USER" && booking.assignedUserId !== userId) {
      throw denyAccess();
    }

    if (
      booking.status === BOOKING_STATUS.COMPLETED ||
      booking.status === BOOKING_STATUS.CANCELLED
    ) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        "This booking status cannot be changed"
      );
    }

    await booking.update({ status: input.status });

    return Booking.findByPk(booking.id, {
      include: bookingIncludes,
    });
  },

  cancel: async (id: string, userId: string, role: string) => {
    if (role !== "ADMIN" && role !== "CUSTOMER") {
      throw denyAccess();
    }

    const booking = await Booking.findByPk(id);

    if (!booking) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, "Booking not found");
    }

    if (role === "CUSTOMER" && booking.customerId !== userId) {
      throw denyAccess();
    }

    if (
      booking.status === BOOKING_STATUS.COMPLETED ||
      booking.status === BOOKING_STATUS.CANCELLED
    ) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        "This booking cannot be cancelled"
      );
    }

    await booking.update({
      status: BOOKING_STATUS.CANCELLED,
    });

    return Booking.findByPk(booking.id, {
      include: bookingIncludes,
    });
  },
};
