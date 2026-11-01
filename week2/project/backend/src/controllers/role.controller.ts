import {roleService} from "../services/role.services";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";
import { successResponse } from "../utils/response.js";
import type { AuthRequest } from "../middlewares/authentication.middleware.js";
import { MESSAGES } from "../constants/messages.constant.js";
import type { Response } from "express";


export const roleController = {
    create: async (req: AuthRequest, res: Response) => {
        const role = await roleService.create(req.body, req.user!.id);
        return successResponse(
            res,
            HTTP_STATUS.CREATED,
            MESSAGES.ROLE_CREATED,
            role
        );
    }
}