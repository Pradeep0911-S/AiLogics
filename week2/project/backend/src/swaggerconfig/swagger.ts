
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Service Booking Management API",
      version: "1.0.0",
      description:
        "API documentation for the Service Booking Management system.",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT access token.",
        },
      },
    },
  },
  apis: ["src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
