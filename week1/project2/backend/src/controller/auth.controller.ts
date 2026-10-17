import type { Request, Response, NextFunction } from "express";
import { registerUser } from "../service/auth.service.js";
import { registerSchema } from "../validation/auth.validation.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export async function register(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const validation = registerSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Validation failed",
                errors: validation.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
            return;
        }

        const user = await registerUser(validation.data);

        res.status(HTTP_STATUS.CREATED).json({
            message: "Registration successful",
            user,
        });
    } catch (err) {
        next(err);
    }
}
