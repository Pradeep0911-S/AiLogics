import type { Request, Response, NextFunction } from "express";
import { authService } from "../service/auth.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { sendSuccess } from "../utils/response.js";
import { AppError } from "../error/AppError.js";

export const refreshTokenController = {
    refresh: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { refreshToken } = req.body;

            if (
                typeof refreshToken !== "string" ||
                !refreshToken
            ) {
                throw new AppError(
                    HTTP_STATUS.UNAUTHORIZED,
                    "Refresh token is required"
                );
            }

            const tokens =
                await authService.refreshAccessToken(refreshToken);

            sendSuccess(
                res,
                HTTP_STATUS.OK,
                "Token refreshed successfully",
                tokens
            );
        } catch (err) {
            next(err);
        }
    },
};
