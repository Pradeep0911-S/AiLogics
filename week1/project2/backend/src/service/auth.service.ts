import { tokenUtils } from "../utils/token.utils.js";
import { refreshTokenUtils } from "../utils/refreshToken.utils.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { Session } from "../models/session.model.js";
import { AppError } from "../error/AppError.js";
import type {
    RegisterInput,
    LoginInput,
} from "../validation/auth.rules.validation.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import type { Request } from "express";


export const authService = {
    registerUser: async (regDetails: RegisterInput) => {
        const existingUsername = await User.findOne({
            where: { username: regDetails.username },
        });

        if (existingUsername) {
            throw new AppError(
                HTTP_STATUS.CONFLICT,
                "Username already exists"
            );
        }

        const existingEmail = await User.findOne({
            where: { email: regDetails.email },
        });

        if (existingEmail) {
            throw new AppError(
                HTTP_STATUS.CONFLICT,
                "Email already exists"
            );
        }

        const passwordHash = await bcrypt.hash(
            regDetails.password,
            10
        );

        const user = await User.create({
            username: regDetails.username,
            email: regDetails.email,
            password: passwordHash,
        });

        return {
            id: user.id,
            username: user.username,
            email: user.email,
        };
    },

    loginUser: async (
        loginDetails: LoginInput,
        req: Request
    ) => {
        const user = await User.findOne({
            where: loginDetails.username
                ? { username: loginDetails.username }
                : { email: loginDetails.email },
        });

        if (!user) {
            throw new AppError(
                HTTP_STATUS.UNAUTHORIZED,
                "Invalid username/email or password"
            );
        }

        const isPasswordValid = await bcrypt.compare(
            loginDetails.password,
            user.password
        );

        if (!isPasswordValid) {
            throw new AppError(
                HTTP_STATUS.UNAUTHORIZED,
                "Invalid username/email or password"
            );
        }

        
        const accessToken = tokenUtils.signToken({
            id: user.id,
        });

        const refreshToken =
            refreshTokenUtils.generateToken();

        const refreshTokenHash =
            refreshTokenUtils.hashToken(refreshToken);

        const userAgent =
            req.get("user-agent") || "Unknown device";

        const deviceName = userAgent.substring(0, 255);
        const ipAddress = req.ip || null;

      
        const expiresAt = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        );

        await Session.create({
            userId: user.id,
            refreshTokenHash,
            deviceName,
            ipAddress,
            expiresAt,
            revokedAt: null,
        });

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken,
            refreshToken,
        };
    },

    refreshAccessToken: async (refreshToken: string) => {
        const refreshTokenHash =refreshTokenUtils.hashToken(refreshToken);

        const session = await Session.findOne({
            where: {
                refreshTokenHash,
                revokedAt: null,
            },
        });

    if (!session) {
        throw new AppError(
            HTTP_STATUS.UNAUTHORIZED,
            "Invalid refresh token"
        );
    }

    if (session.expiresAt.getTime() <= Date.now()) {
        throw new AppError(
            HTTP_STATUS.UNAUTHORIZED,
            "Refresh session has expired"
        );
    }

    const user = await User.findByPk(session.userId);

    if (!user) {
        throw new AppError(
            HTTP_STATUS.UNAUTHORIZED,
            "User not found"
        );
    }

    const newAccessToken = tokenUtils.signToken({
        id: user.id,
    });

    const newRefreshToken =
        refreshTokenUtils.generateToken();

    const newRefreshTokenHash =
        refreshTokenUtils.hashToken(newRefreshToken);


    const [updatedRows] = await Session.update(
        {
            refreshTokenHash: newRefreshTokenHash,
        },
        {
            where: {
                id: session.id,
                refreshTokenHash,
                revokedAt: null,
            },
        }
    );

    if (updatedRows !== 1) {
        throw new AppError(
            HTTP_STATUS.UNAUTHORIZED,
            "Refresh token has already been used"
        );
    }

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };
},
    logoutUser: async (refreshToken: string) => {
    const refreshTokenHash =
        refreshTokenUtils.hashToken(refreshToken);

    const session = await Session.findOne({
        where: {
            refreshTokenHash,
            revokedAt: null,
        },
    });

    if (!session) {
        throw new AppError(
            HTTP_STATUS.UNAUTHORIZED,
            "Invalid refresh token or session already logged out"
        );
    }

    session.revokedAt = new Date();
    await session.save();

    return {
        message: "Logged out successfully",
    };
},
};
