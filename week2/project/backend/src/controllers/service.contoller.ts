
import type { Response } from "express";
import type {AuthRequest} from "../middlewares/authentication.middleware.js";
import { serviceService } from "../services/service.services.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";
import { successResponse } from "../utils/response.js";
import { MESSAGES } from "../constants/messages.constant.js";

export const serviceController = {
  create: async (req: AuthRequest, res: Response) => {
    const service = await serviceService.create(req.body, req.user!.id as string);

    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      MESSAGES.SERVICE_CREATED,
      service
    );
  },

  findAll: async (_req: AuthRequest, res: Response) => {
    const services = await serviceService.findAll();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.SERVICE_RETRIVED,
      services
    );
  },

  findById: async (req: AuthRequest, res: Response) => {
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

  update: async (req: AuthRequest, res: Response) => {
    const service = await serviceService.update(
      req.params.id as string,
      req.body,
      req.user!.id as string
    );

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.SERVICE_UPDATED,
      service
    );
  },

  delete: async (req: AuthRequest, res: Response) => {
    await serviceService.delete(req.params.id as string, req.user!.id as string);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.SERVICE_DELETED
    );
  },
};
