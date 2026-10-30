
import type { Response } from "express";
import type { AuthRequest } from "../middlewares/authentication.middleware.js";
import { userService } from "../services/user.services.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";
import { successResponse } from "../utils/response.js";
import { MESSAGES } from "../constants/messages.constant.js";

export const userController = {
  create: async (req: AuthRequest, res: Response) => {
    const user = await userService.create(req.body);

    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      MESSAGES.USER_CREATED,
      user
    );
  },

  findAll: async (_req: AuthRequest, res: Response) => {
    const users = await userService.findAll();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.USER_DETAILS,
      users
    );
  },

  findById: async (req: AuthRequest, res: Response) => {
    const user = await userService.findById(req.params.id as string);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.USER_DETAILS,
      user
    );
  },

  update: async (req: AuthRequest, res: Response) => {
    const user = await userService.update(
      req.params.id as string,
      req.body
    );

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.USER_UPDATE,
      user
    );
  },

  delete: async (req: AuthRequest, res: Response) => {
    await userService.delete(
      req.params.id as string,
      req.user!.id
    );

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.USER_DELETED
    );
  },
};
