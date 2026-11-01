import { Router } from "express";
import authRoutes from "./auth.routes.js";
import serviceRoutes from "./service.routes.js";
import bookingRoutes from "./booking.routes.js";
import userRoutes from "./user.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import adminRoutes from "./admin.routes.js";
import roleRoutes from "./role.routes.js";
import permissionRoutes from "./permission.routes.js";
import rolePermissionRoutes from "./rolePermission.routes.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/services", serviceRoutes);
routes.use("/bookings", bookingRoutes);
routes.use("/users", userRoutes);
routes.use("/dashboard",dashboardRoutes);
routes.use("/admin",adminRoutes);
routes.use("/admin/roles", roleRoutes);
routes.use("/admin/permissions", permissionRoutes);
routes.use("/admin/role-permissions", rolePermissionRoutes);

export default routes;
