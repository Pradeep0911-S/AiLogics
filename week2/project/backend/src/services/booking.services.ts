import { Booking } from "../models/booking.model.js";
import { Service } from "../models/services.model.js";
import { User } from "../models/users.model.js";
import { Role } from "../models/roles.model.js";
import { AppError } from "../error/appError.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";
import { BOOKING_STATUS } from "../constants/bookingStatus.constant.js";
import type {
  CreateBookingInput,
  AssignBookingInput,
  UpdateBookingStatusInput,
} from "../validation/booking.schema.validation.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { ROLES } from "../constants/roles.constant.js";


const bookingIncludes = [
  { model: User, as: "customer", attributes: ["id", "name", "email"] },
  { model: User, as: "assignedUser", attributes: ["id", "name", "email"] },
  { model: Service, as: "service" },
];

const denyAccess = () =>
  new AppError(HTTP_STATUS.FORBIDDEN, "You cannot access this booking");
const validRoles: string[] = [ROLES.ADMIN, ROLES.USER, ROLES.CUSTOMER];

export const bookingService = {
  // Create a booking
  create: async (customerId: string, input: CreateBookingInput) => {
    const service = await Service.findOne({ where: { name : input.service } });

    if (!service) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, MESSAGES.SERVICE_NOT_FOUND);
    }

    return Booking.create({
      customerId,
      service: input.service,
      serviceId: service.id,
      status: BOOKING_STATUS.PENDING,
      createdBy: customerId
    });
  },

  // Get bookings based on the user's role
  findAll: async (userId: string, role: string) => {
    let where = {};

    if (role === ROLES.USER) {
      where = { assignedUserId: userId };
    } else if (role === ROLES.CUSTOMER) {
      where = { customerId: userId };
    } else if (role !== ROLES.ADMIN) {
      throw denyAccess();
    }

    return Booking.findAll({
      where,
      include: bookingIncludes,
      order: [["createdAt", "DESC"]],
    });
  },

  // Get one booking by ID
  findById: async (id: string, userId: string, role: string) => {
    const booking = await Booking.findByPk(id, {
      include: bookingIncludes,
    });

    if (!booking) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, MESSAGES.BOOKING_NOT_FOUND);
    }

    if (
      (role === ROLES.CUSTOMER && booking.customerId !== userId) ||
      (role === ROLES.USER && booking.assignedUserId !== userId) ||
      !validRoles.includes(role)
    ) {
      throw denyAccess();
    }

    return booking;
  },

  // Get the current user's bookings
  // findMine: async (userId: string, role: string) => {
  //   if (role === ROLES.ADMIN) {
  //     return Booking.findAll({
  //       include: bookingIncludes,
  //       order: [["createdAt", "DESC"]],
  //     });
  //   }

  //   if (role !== ROLES.USER && role !== ROLES.CUSTOMER) {
  //     throw denyAccess();
  //   }

  //   const where =
  //     role === ROLES.USER
  //       ? { assignedUserId: userId }
  //       : { customerId: userId };

  //   return Booking.findAll({
  //     where,
  //     include: bookingIncludes,
  //     order: [["createdAt", "DESC"]],
  //   });
  // },

  // Assign a booking to an active staff member
  assign: async (
    id: string,
    input: AssignBookingInput,
    role: string,
    currentUserId: string
  ) => {
    if (role !== ROLES.ADMIN) {
      throw denyAccess();
    }

    const booking = await Booking.findByPk(id);

    if (!booking) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, MESSAGES.BOOKING_NOT_FOUND);
    }

    if (
      booking.status === BOOKING_STATUS.COMPLETED ||
      booking.status === BOOKING_STATUS.CANCELLED
    ) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.BOOKING_CANNOT_ASSIGNED
      );
    }

    const staffRole = await Role.findOne({
      where: { name: ROLES.USER },
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

    await booking.update({
      assignedUserId: staff.id,
      status: BOOKING_STATUS.ASSIGNED,
      updatedBy: currentUserId,
    });

    return Booking.findByPk(booking.id, {
      include: bookingIncludes,
    });
  },

  // Update booking status according to the allowed workflow
  updateStatus: async (
    id: string,
    input: UpdateBookingStatusInput,
    userId: string,
    role: string
  ) => {
    if (role !== ROLES.ADMIN && role !== ROLES.USER) {
      throw denyAccess();
    }

    const booking = await Booking.findByPk(id);

    if (!booking) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, MESSAGES.BOOKING_NOT_FOUND);
    }

    // Staff can only update bookings assigned to them
    if (role === ROLES.USER && booking.assignedUserId !== userId) {
      throw denyAccess();
    }

    // Define valid status transitions
    const allowedTransitions: Record<string, string[]> = {
      [BOOKING_STATUS.ASSIGNED]: [BOOKING_STATUS.IN_PROGRESS],
      [BOOKING_STATUS.IN_PROGRESS]: [BOOKING_STATUS.COMPLETED],
    };

    const allowedStatuses = allowedTransitions[booking.status] ?? [];

    if (!allowedStatuses.includes(input.status)) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        `Cannot change booking status from ${booking.status} to ${input.status}`
      );
    }

    await booking.update({
      status: input.status,
      updatedBy: userId
    });

    return Booking.findByPk(booking.id, {
      include: bookingIncludes,
    });
  },

  // Cancel a booking
  cancel: async (id: string, userId: string, role: string) => {
    if (role !== ROLES.ADMIN && role !== ROLES.CUSTOMER) {
      throw denyAccess();
    }

    const booking = await Booking.findByPk(id);

    if (!booking) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, MESSAGES.BOOKING_NOT_FOUND);
    }

    // Customers can cancel only their own bookings
    if (role === ROLES.CUSTOMER && booking.customerId !== userId) {
      throw denyAccess();
    }

    if (
      booking.status === BOOKING_STATUS.COMPLETED ||
      booking.status === BOOKING_STATUS.CANCELLED
    ) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.BOOKING_CANNOT_CANCELLED
      );
    }

    await booking.update({
      status: BOOKING_STATUS.CANCELLED,
      updatedBy: userId
    });

    return Booking.findByPk(booking.id, {
      include: bookingIncludes,
    });
  },
};