import type { Request, Response, NextFunction } from "express";
import { sessionService } from "../service/session.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { sendSuccess } from "../utils/response.js";
import { AppError } from "../error/AppError.js";

export const sessionController = {
    
    getAll: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const userId = res.locals.userId;

            const sessions =
                await sessionService.getUserSessions(userId);

            sendSuccess(
                res,
                HTTP_STATUS.OK,
                "Sessions retrieved successfully",
                sessions
            );
        } catch (err) {
            next(err);
        }
    },

    getById: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const userId = res.locals.userId;
            const sessionId = req.params.id;

            if (typeof sessionId !== "string") {
                throw new AppError(
                    HTTP_STATUS.BAD_REQUEST,
                    "Invalid session ID"
                );
            }

            const session =
                await sessionService.getUserSessionById(
                    userId,
                    sessionId
                );

            sendSuccess(
                res,
                HTTP_STATUS.OK,
                "Session retrieved successfully",
                session
            );
        } catch (err) {
            next(err);
        }
    },

    
    revoke: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const userId = res.locals.userId;
            const sessionId = req.params.id;

            if (typeof sessionId !== "string") {
                throw new AppError(
                    HTTP_STATUS.BAD_REQUEST,
                    "Invalid session ID"
                );
            }

            const result =
                await sessionService.revokeSession(
                    userId,
                    sessionId
                );

            sendSuccess(
                res,
                HTTP_STATUS.OK,
                "Session revoked successfully",
                result
            );
        } catch (err) {
            next(err);
        }
    },

    
    revokeAll: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const userId = res.locals.userId;

            const result =
                await sessionService.revokeAllSessions(userId);

            sendSuccess(
                res,
                HTTP_STATUS.OK,
                "All sessions revoked successfully",
                result
            );
        } catch (err) {
            next(err);
        }
    },
};
