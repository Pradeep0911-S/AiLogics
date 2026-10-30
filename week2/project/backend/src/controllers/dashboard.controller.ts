
import type { Response } from "express";
import type { AuthRequest } from "../middlewares/authentication.middleware.js";
import { dashboardService } from "../services/dashboard.services.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";
import { successResponse } from "../utils/response.js";
import { MESSAGES } from "../constants/messages.constant.js";

export const dashboardController = {
  getStatistics: async (_req: AuthRequest, res: Response) => {
    const statistics = await dashboardService.getStatistics();

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGES.DASHBOARD_STATISTICS,
      statistics
    );
  },
};
