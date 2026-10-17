import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { AppError } from "../error/AppError.js";
import type { RegisterInput } from "../validation/auth.validation.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export async function registerUser(regDetails: RegisterInput) {
    
    const existingUsername = await User.findOne({
        where: { username: regDetails.username },
    });

    if (existingUsername) {
        throw new AppError(HTTP_STATUS.CONFLICT, "Username already exists");
    }
    const existingEmail = await User.findOne({
        where: { email: regDetails.email },
    });

    if (existingEmail) {
        throw new AppError(HTTP_STATUS.CONFLICT, "Email already exists");
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
}