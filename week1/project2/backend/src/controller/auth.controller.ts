import type { Request, Response, NextFunction } from "express";
import { authService } from "../service/auth.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { sendSuccess } from "../utils/response.js";
import { AppError } from "../error/AppError.js";

export const authController = {
    register: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const user = await authService.registerUser(req.body);

            sendSuccess(
                res,
                HTTP_STATUS.CREATED,
                "Registration successful",
                user
            );
        } catch (err) {
            next(err);
        }
    },

    login: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const user = await authService.loginUser(
                req.body,
                req
            );

            sendSuccess(
                res,
                HTTP_STATUS.OK,
                "Login successful",
                user
            );
        } catch (err) {
            next(err);
        }
    },

    logout: async (
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

            const result = await authService.logoutUser(
                refreshToken
            );

            sendSuccess(
                res,
                HTTP_STATUS.OK,
                "Logout successful",
                result
            );
        } catch (err) {
            next(err);
        }
    },
};
