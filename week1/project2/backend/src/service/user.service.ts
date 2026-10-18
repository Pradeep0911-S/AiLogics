
import { User } from "../models/user.model.js";
import { AppError } from "../error/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const userService = {
    
    getAllUsers: async () => {
        return await User.findAll({
            attributes: ["id", "username", "email"],
        });
    },

    
    getUserById: async (id: string, loggedInUserId: string) => {
        if (id !== loggedInUserId) {
            throw new AppError(
                HTTP_STATUS.FORBIDDEN,
                "You cannot access another user's details"
            );
        }

        const user = await User.findByPk(id, {
            attributes: ["id", "username", "email"],
        });

        if (!user) {
            throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
        }

        return user;
    },

    
    updateUser: async (
        id: string,
        updateDetails: { username?: string; email?: string },
        loggedInUserId: string
    ) => {
        if (id !== loggedInUserId) {
            throw new AppError(
                HTTP_STATUS.FORBIDDEN,
                "You cannot update another user's details"
            );
        }

        const user = await User.findByPk(id);

        if (!user) {
            throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
        }

        if (updateDetails.username !== undefined) {
            const existingUsername = await User.findOne({
                where: { username: updateDetails.username },
            });

            if (existingUsername && existingUsername.id !== user.id) {
                throw new AppError(
                    HTTP_STATUS.CONFLICT,
                    "Username already exists"
                );
            }
        }

        if (updateDetails.email !== undefined) {
            const existingEmail = await User.findOne({
                where: { email: updateDetails.email },
            });

            if (existingEmail && existingEmail.id !== user.id) {
                throw new AppError(
                    HTTP_STATUS.CONFLICT,
                    "Email already exists"
                );
            }
        }

        await user.update(updateDetails);

        return {
            id: user.id,
            username: user.username,
            email: user.email,
        };
    },

   
    deleteUser: async (id: string, loggedInUserId: string) => {
        if (id !== loggedInUserId) {
            throw new AppError(
                HTTP_STATUS.FORBIDDEN,
                "You cannot delete another user's account"
            );
        }

        const user = await User.findByPk(id);

        if (!user) {
            throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
        }

        await user.destroy();

        return { id: user.id };
    },
};
