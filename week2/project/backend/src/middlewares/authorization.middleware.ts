
import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./authentication.middleware.js";
import { AppError } from "../error/app-error.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { Role } from "../models/roles.model.js";

export function requirePermission(permissionName: string) {
  return async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user) {
        throw new AppError(
          HTTP_STATUS.UNAUTHORIZED,
          MESSAGES.UNAUTHORIZED
        );
      }

      const role = await Role.findByPk(req.user.roleId, {
        include: ["permissions"],
      });

      if (!role) {
        throw new AppError(
          HTTP_STATUS.FORBIDDEN,
          MESSAGES.FORBIDDEN
        );
      }

      const hasPermission = role.permissions?.some(
        (permission) => permission.name === permissionName
      );

      if (!hasPermission) {
        throw new AppError(
          HTTP_STATUS.FORBIDDEN,
          MESSAGES.FORBIDDEN
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
