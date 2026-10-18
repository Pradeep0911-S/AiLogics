
import type { Request, Response, NextFunction } from "express";
import { authService } from "../service/auth.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { sendSuccess } from "../utils/response.js";

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
            const user = await authService.loginUser(req.body);

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
};
