
import type { Request, Response, NextFunction } from "express";
import { userService } from "../service/user.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { sendSuccess } from "../utils/response.js";

type UserParams = {
    id: string;
};

type AuthLocals = {
    userId: string;
};

export const userController = {
    getAllUsers: async (
        req: Request,
        res: Response<unknown, AuthLocals>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const users = await userService.getAllUsers();

            sendSuccess(
                res,
                HTTP_STATUS.OK,
                "Users retrieved successfully",
                users
            );
        } catch (err) {
            next(err);
        }
    },

    getUserById: async (
        req: Request<UserParams>,
        res: Response<unknown, AuthLocals>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const user = await userService.getUserById(
                req.params.id,
                res.locals.userId
            );

            sendSuccess(
                res,
                HTTP_STATUS.OK,
                "User retrieved successfully",
                user
            );
        } catch (err) {
            next(err);
        }
    },

    updateUser: async (
        req: Request<UserParams>,
        res: Response<unknown, AuthLocals>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const user = await userService.updateUser(
                req.params.id,
                req.body,
                res.locals.userId
            );

            sendSuccess(
                res,
                HTTP_STATUS.OK,
                "User updated successfully",
                user
            );
        } catch (err) {
            next(err);
        }
    },

    deleteUser: async (
        req: Request<UserParams>,
        res: Response<unknown, AuthLocals>,
        next: NextFunction
    ): Promise<void> => {
        try {
            await userService.deleteUser(
                req.params.id,
                res.locals.userId
            );

            sendSuccess(
                res,
                HTTP_STATUS.OK,
                "User deleted successfully"
            );
        } catch (err) {
            next(err);
        }
    },
};
