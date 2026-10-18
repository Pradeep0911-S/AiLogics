
import type { Request, Response, NextFunction } from "express";
import { tokenUtils } from "../utils/token.utils.js";
import { AppError } from "../error/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const authMiddleware = {
    authenticate: (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                throw new AppError(
                    HTTP_STATUS.UNAUTHORIZED,
                    "Authentication token is required"
                );
            }

            const token = authHeader.split(" ")[1];

            if (!token) {
                throw new AppError(
                    HTTP_STATUS.UNAUTHORIZED,
                    "Authentication token is required"
                );
            }

            const payload = tokenUtils.verifyToken(token);

            res.locals.userId = payload.id;

            next();
        } catch (err) {
            if (err instanceof AppError) {
                next(err);
                return;
            }

            next(
                new AppError(
                    HTTP_STATUS.UNAUTHORIZED,
                    "Invalid or expired token"
                )
            );
        }
    },
};
