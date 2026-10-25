import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/app-error";
import { HTTP_STATUS } from "../constants/http-status.constant";
import { MESSAGES } from "../constants/messages.constant";

export const notFound = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(
    new AppError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.ROUTE_NOT_FOUND
    )
  );
};