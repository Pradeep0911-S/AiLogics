import { HTTP_STATUS } from "../constants/httpStatus.constant";
import { MESSAGES } from "../constants/messages.constant";
import { AuthRequest } from "../middlewares/authentication.middleware";
import { successResponse } from "../utils/response";
import { Response } from "express";
import { adminService } from "../services/admin.services";

export const adminController =
{
    create: async(req: AuthRequest,res : Response)=>{
        const user = await adminService.create(req.body,req.user!.id);
        return successResponse(
            res,
            HTTP_STATUS.CREATED,
            MESSAGES.USER_CREATED,
            user
        );
    },
}