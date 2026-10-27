
import type { Response } from "express";
import type { AuthRequest } from "../middlewares/authentication.middleware.js";
import { userService } from "../services/user.services.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";
import { successResponse } from "../utils/response.js";

export const userController = {
  create: async (req: AuthRequest, res: Response) => {
    const user = await userService.create(req.body);

    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      "Staff user created successfully",
      user
    );
  },

  findAll: async (_req: AuthRequest, res: Response) => {
    const users = await userService.findAll();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      "Users retrieved successfully",
      users
    );
  },

  findById: async (req: AuthRequest, res: Response) => {
    const user = await userService.findById(req.params.id as string);

    return successResponse(
      res,
      HTTP_STATUS.OK,
      "User retrieved successfully",
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
      "User updated successfully",
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
      "User deleted successfully"
    );
  },
};
