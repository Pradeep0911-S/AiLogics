import type { AssignPermissionInput } from "../validation/rolePermission.schema.validation.js";
import { models } from "../models/index.js";
import { AppError } from "../error/appError.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";
import { MESSAGES } from "../constants/messages.constant.js";

export const rolePermissionService = {
  assign: async (input: AssignPermissionInput,currentUserId:string) => {
    const role = await models.Role.findByPk(input.roleId);

    if (!role) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        MESSAGES.ROLE_NOT_FOUND
      );
    }

    const permission = await models.Permission.findByPk(input.permissionId);

    if (!permission) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        MESSAGES.PERMISSION_NOT_FOUND
      );
    }

    const existingAssignment = await models.RolePermission.findOne({
      where: {
        roleId: input.roleId,
        permissionId: input.permissionId,
      },
    });

    if (existingAssignment) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.PERMISSION_ALREADY_ASSIGNED
      );
    }

    await models.RolePermission.create({
      roleId: input.roleId,
      permissionId: input.permissionId,
      createdBy: currentUserId
    });

    return {
      roleId: input.roleId,
      permissionId: input.permissionId,
    };
  },

  
  remove: async (input: AssignPermissionInput,currentUserId:string) => {
    const rolePermission = await models.RolePermission.findOne({
      where: {
        roleId: input.roleId,
        permissionId: input.permissionId,
      },
    });
    if (!rolePermission) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        MESSAGES.PERMISSION_ASSIGN_NOT_FOUND
      );
    }
    await rolePermission.update({ updatedBy: currentUserId });
    await rolePermission.destroy();
    return {
      roleId: input.roleId,
      permissionId: input.permissionId,
    };
  }
};