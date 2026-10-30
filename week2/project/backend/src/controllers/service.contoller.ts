
import type { Request, Response } from "express";
import { serviceService } from "../services/service.services.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";
import { successResponse } from "../utils/response.js";
import { MESSAGES } from "../constants/messages.constant.js";

export const serviceController = {
  create: async (req: Request, res: Response) => {
    const service = await serviceService.create(req.body);

    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      MESSAGES.SERVICE_CREATED,
      service
    );
  },

  findAll: async (_req: Request, res: Response) => {
    const services = await serviceService.findAll();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.SERVICE_RETRIVED,
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
      MESSAGES.SERVICE_RETRIVED,
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
      MESSAGES.SERVICE_UPDATED,
      service
    );
  },

  delete: async (req: Request, res: Response) => {
    await serviceService.delete(req.params.id as string);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.SERVICE_DELETED
    );
  },
};
