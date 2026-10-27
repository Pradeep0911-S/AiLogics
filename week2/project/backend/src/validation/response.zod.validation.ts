
import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js"
import { MESSAGES } from "../constants/messages.constant.js";

export function validate(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.VALIDATION_FAILED,
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
            return;
        }

        req.body = result.data;
        next();
    };
}