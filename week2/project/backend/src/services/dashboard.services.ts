
import { Booking } from "../models/booking.model.js";
import { Service } from "../models/services.model.js";
import { User } from "../models/users.model.js";
import { BOOKING_STATUS } from "../constants/booking-status.constant.js";

export const dashboardService = {
  getStatistics: async () => {
    const [
      totalUsers,
      activeUsers,
      inactiveUsers,
      totalServices,
      totalBookings,
      pendingBookings,
      assignedBookings,
      inProgressBookings,
      completedBookings,
      cancelledBookings,
      recentBookings,
    ] = await Promise.all([
      User.count(),
      User.count({ where: { isActive: true } }),
      User.count({ where: { isActive: false } }),
      Service.count(),
      Booking.count(),
      Booking.count({
        where: { status: BOOKING_STATUS.PENDING },
      }),
      Booking.count({
        where: { status: BOOKING_STATUS.ASSIGNED },
      }),
      Booking.count({
        where: { status: BOOKING_STATUS.IN_PROGRESS },
      }),
      Booking.count({
        where: { status: BOOKING_STATUS.COMPLETED },
      }),
      Booking.count({
        where: { status: BOOKING_STATUS.CANCELLED },
      }),
      Booking.findAll({
        attributes: ["id", "status", "createdAt"],
        include: [
          {
            model: User,
            as: "customer",
            attributes: ["id", "name", "email"],
          },
          {
            model: Service,
            as: "service",
            attributes: ["id", "name"],
          },
        ],
        order: [["createdAt", "DESC"]],
        limit: 10,
      }),
    ]);

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: inactiveUsers,
      },
      services: {
        total: totalServices,
      },
      bookings: {
        total: totalBookings,
        pending: pendingBookings,
        assigned: assignedBookings,
        inProgress: inProgressBookings,
        completed: completedBookings,
        cancelled: cancelledBookings,
      },
      recentBookings,
    };
  },
};
