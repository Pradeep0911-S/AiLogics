import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { AppError } from "../error/AppError.js";
import type { RegisterInput } from "../validation/auth.validation.js";

export async function registerUser(regDetails: RegisterInput) {
    const existingEmail = await User.findOne({
        where: { email: regDetails.email },
    });

    if (existingEmail) {
        throw new AppError(409, "Email already exists");
    }

    const existingUsername = await User.findOne({
        where: { username: regDetails.username },
    });

    if (existingUsername) {
        throw new AppError(409, "Username already exists");
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