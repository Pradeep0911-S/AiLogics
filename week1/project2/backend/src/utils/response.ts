
import type { Response } from "express";

export function sendSuccess(
    res: Response,
    statusCode: number,
    message: string,
    data?: unknown
): Response {
    return res.status(statusCode).json({
        success: true,
        message,
        ...(data !== undefined && { data }),
    });
}

export function sendError(
    res: Response,
    statusCode: number,
    message: string,
    errors?: unknown
): Response {
    return res.status(statusCode).json({
        success: false,
        message,
        ...(errors !== undefined && { errors }),
    });
}
