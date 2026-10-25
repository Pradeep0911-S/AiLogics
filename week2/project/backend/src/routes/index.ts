
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import serviceRoutes from "./service.routes.js";
import bookingRoutes from "./booking.routes.js";
import userRoutes from "./user.routes.js";
import dashboardRoutes from "./dashboard.routes.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/services", serviceRoutes);
routes.use("/bookings", bookingRoutes);
routes.use("/users", userRoutes);
routes.use("/dashboard",dashboardRoutes)

export default routes;
