
import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.services.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";
import { successResponse } from "../utils/response.js";
import { MESSAGES } from "../constants/messages.constant.js"; 

export const authController = {
  register: async (
    req: Request,
    res: Response
  ) => {
      const user = await authService.register(req.body);
      return successResponse(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.USER_REGISTERED_SUCCESSFULLY,
        user
      );

      // res.status(201).json({
      //   success: true,
      //   message: "User registered successfully",
      //   data: user,
      // });
  },

  login: async (
    req: Request,
    res: Response
  ) => {

      const result = await authService.login(req.body);
      return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.LOGIN_SUCCESS,
        result
      );

      // res.status(200).json({
      //   success: true,
      //   message: "Login successful",
      //   data: result,
      // });
  },
};
