import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes/index";
import { notFound } from "./middlewares/notfound";
import { errorHandler } from "./error/error.handler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swaggerconfig/swagger";

export const createApp = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Service Booking Management API",
    });
  });

  app.use("/api", routes);
  app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
  app.use(notFound);

  app.use(errorHandler);

  return app;
};