
import type { Request, Response } from "express";
import { serviceService } from "../services/service.services.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { successResponse } from "../utils/response.js";

export const serviceController = {
  create: async (req: Request, res: Response) => {
    const service = await serviceService.create(req.body);

    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      "Service created successfully",
      service
    );
  },

  findAll: async (_req: Request, res: Response) => {
    const services = await serviceService.findAll();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      "Services retrieved successfully",
      services
    );
  },

  findById: async (req: Request, res: Response) => {
    const service = await serviceService.findById(
      req.params.id as string
    );

    return successResponse(
      res,
      HTTP_STATUS.OK,
      "Service retrieved successfully",
      service
    );
  },

  update: async (req: Request, res: Response) => {
    const service = await serviceService.update(
      req.params.id as string,
      req.body
    );

    return successResponse(
      res,
      HTTP_STATUS.OK,
      "Service updated successfully",
      service
    );
  },

  delete: async (req: Request, res: Response) => {
    await serviceService.delete(req.params.id as string);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      "Service deleted successfully"
    );
  },
};
