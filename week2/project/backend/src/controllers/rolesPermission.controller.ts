import { HTTP_STATUS } from "../constants/httpStatus.constant";
import { MESSAGES } from "../constants/messages.constant";
import { AuthRequest } from "../middlewares/authentication.middleware";
import { successResponse } from "../utils/response";
import { Response } from "express";
import { rolesPermissionService } from "../services/rolesPermission.services";

export const rolesPermissionController =
{
    create: async(req: AuthRequest,res : Response)=>{
        const user = await rolesPermissionService.create(req.body);
        return successResponse(
            res,
            HTTP_STATUS.CREATED,
            MESSAGES.USER_CREATED,
            user
        );
    },
}