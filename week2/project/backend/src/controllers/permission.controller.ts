import { permissionService } from "../services/permission.services.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";
import { successResponse } from "../utils/response.js";
import type { AuthRequest } from "../middlewares/authentication.middleware.js";
import { MESSAGES } from "../constants/messages.constant.js";
import type { Response } from "express";

export const permissionController = {
  create: async (req: AuthRequest, res: Response) => {
    const permission = await permissionService.create(
      req.body,
      req.user!.id
    );

    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      MESSAGES.PERMISSION_CREATED,
      permission
    );
  },
};