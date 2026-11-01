import { CreateRoleInput } from "../validation/role.schema.validation.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { models } from "../models/index.js";
import { AppError } from "../error/appError.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";



export const roleService = {
    create: async (input: CreateRoleInput,currentUserId : string) => {
        const existingRole = await models.Role.findOne({
            where: { name: input.name },
        });
        if (existingRole) {
            throw new AppError(
                HTTP_STATUS.BAD_REQUEST,
                MESSAGES.ROLE_EXISTS
            );
        }
        const role = await models.Role.create({
            name: input.name,
            createdBy: currentUserId
        });
        return role;
    },
}
