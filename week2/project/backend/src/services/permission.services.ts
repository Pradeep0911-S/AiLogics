import type { CreatePermissionInput } from "../validation/permission.schema.validation.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { models } from "../models/index.js";
import { AppError } from "../error/appError.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";

export const permissionService = {
  create: async (input: CreatePermissionInput, currentUserId: string) => {
    const existingPermission = await models.Permission.findOne({
      where: { name: input.name },
    });

    if (existingPermission) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.PERMISSION_EXISTS
      );
    }

    const permission = await models.Permission.create({
      name: input.name,
      createdBy: currentUserId,
    });

    return permission;
  },
};