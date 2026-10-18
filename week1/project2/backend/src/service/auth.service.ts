import { tokenUtils } from "../utils/token.utils.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { AppError } from "../error/AppError.js";
import type {RegisterInput,LoginInput} from "../validation/auth.rules.validation.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

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

        const passwordHash = await bcrypt.hash(regDetails.password, 10);

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

    loginUser: async (loginDetails: LoginInput) => {
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

        const token = tokenUtils.signToken({ id: user.id });

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token,
        };
    },
};
