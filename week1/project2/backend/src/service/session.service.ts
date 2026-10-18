import { Session } from "../models/session.model.js";
import { AppError } from "../error/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const sessionService = {
    getUserSessions: async (userId: string) => {
        return await Session.findAll({
            where: { userId },
            attributes: [
                "id",
                "deviceName",
                "ipAddress",
                "expiresAt",
                "revokedAt",
                "createdAt",
            ],
            order: [["createdAt", "DESC"]],
        });
    },
    getUserSessionById: async (
        userId: string,
        sessionId: string
    ) => {
        const session = await Session.findOne({
            where: {
                id: sessionId,
                userId,
            },
            attributes: [
                "id",
                "deviceName",
                "ipAddress",
                "expiresAt",
                "revokedAt",
                "createdAt",
            ],
        });

        if (!session) {
            throw new AppError(
                HTTP_STATUS.NOT_FOUND,
                "Session not found"
            );
        }

        return session;
    },

    revokeSession: async (
        userId: string,
        sessionId: string
    ) => {
        const session = await Session.findOne({
            where: {
                id: sessionId,
                userId,
                revokedAt: null,
            },
        });

        if (!session) {
            throw new AppError(
                HTTP_STATUS.NOT_FOUND,
                "Active session not found"
            );
        }

        session.revokedAt = new Date();
        await session.save();

        return { message: "Session revoked successfully" };
    },


    revokeAllSessions: async (userId: string) => {
        const [revokedCount] = await Session.update(
            { revokedAt: new Date() },
            {
                where: {
                    userId,
                    revokedAt: null,
                },
            }
        );

        return {
            message: "All active sessions revoked successfully",
            revokedCount,
        };
    },
};
