import { rolePermissionService } from "../services/rolePermission.services.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";
import { successResponse } from "../utils/response.js";
import { MESSAGES } from "../constants/messages.constant.js";
import type { AuthRequest } from "../middlewares/authentication.middleware.js";
import type { Response } from "express";

export const rolePermissionController = {
  assign: async (req: AuthRequest, res: Response) => {
    const result = await rolePermissionService.assign(req.body, req.user!.id);

    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      MESSAGES.PERMISSION_ASSIGNED,
      result
    );
  },
  remove: async (req: AuthRequest, res: Response) => {
    const result = await rolePermissionService.remove(req.body, req.user!.id);
    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.PERMISSION_REMOVED,
      result
    );
  }
};