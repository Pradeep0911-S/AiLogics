import { Request, Response, NextFunction } from "express";
import { AppError } from "./app-error";
import { HTTP_STATUS } from "../constants/httpStatus.constant";
import { errorResponse } from "../utils/response";
import { MESSAGES } from "../constants/messages.constant";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
  return errorResponse(res, error.statusCode, error.message);
}

return errorResponse(
  res,
  HTTP_STATUS.INTERNAL_SERVER_ERROR,
  MESSAGES.INTERNAL_SERVER_ERROR
);
};