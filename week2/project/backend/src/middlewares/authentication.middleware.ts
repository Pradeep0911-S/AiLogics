
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../error/app-error.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { verifyToken } from "../utils/jwt.js";
import { User } from "../models/users.model.js";
import { Role } from "../models/roles.model.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    roleId: string;
    role: string;
  };
}

export async function authenticationMiddleware(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        MESSAGES.UNAUTHORIZED
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        MESSAGES.UNAUTHORIZED
      );
    }

    const payload = verifyToken(token);

    if (
      typeof payload !== "object" ||
      payload === null ||
      !("userId" in payload) ||
      typeof payload.userId !== "string"
    ) {
      throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        MESSAGES.UNAUTHORIZED
      );
    }

    const user = await User.findByPk(payload.userId, {
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });

    if (!user || !user.isActive || !user.role) {
      throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        MESSAGES.UNAUTHORIZED
      );
    }

    req.user = {
      id: user.id,
      roleId: user.roleId,
      role: user.role.name,
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }

    next(
      new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        MESSAGES.INVALID_TOKEN
      )
    );
  }
}
