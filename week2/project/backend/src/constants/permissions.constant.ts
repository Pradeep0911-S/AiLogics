
export const PERMISSIONS = {
  CREATE_USER: "users:create",
  READ_USERS: "users:read",
  UPDATE_USER: "users:update",
  DELETE_USER: "users:delete",

  CREATE_SERVICE: "services:create",
  READ_SERVICES: "services:read",
  UPDATE_SERVICE: "services:update",
  DELETE_SERVICE: "services:delete",

  CREATE_BOOKING: "bookings:create",
  READ_BOOKINGS: "bookings:read",
  ASSIGN_BOOKING: "bookings:assign",
  UPDATE_BOOKING_STATUS: "bookings:update_status",
  CANCEL_BOOKING: "bookings:cancel",
} as const;
