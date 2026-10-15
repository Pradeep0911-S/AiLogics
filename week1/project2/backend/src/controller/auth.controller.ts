import type { Request, Response, NextFunction } from "express";
import { registerUser } from "../service/auth.service.js";
import { registerSchema } from "../validation/auth.validation.js";

export async function register(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const validation = registerSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                message: "Validation failed",
                errors: validation.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
            return;
        }

        const user = await registerUser(validation.data);

        res.status(201).json({
            message: "Registration successful",
            user,
        });
    } catch (err) {
        next(err);
    }
}
