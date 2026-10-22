
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import serviceRoutes from "./service.routes.js";
import bookingRoutes from "./booking.routes.js";
import userRoutes from "./user.routes.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/services", serviceRoutes);
routes.use("/bookings", bookingRoutes);
routes.use("/users", userRoutes);

export default routes;
