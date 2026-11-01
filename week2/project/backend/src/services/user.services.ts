
import { Op } from "sequelize";
import { User } from "../models/users.model.js";
import { Role } from "../models/roles.model.js";
import { AppError } from "../error/appError.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";
import { hashPassword } from "../utils/bcrypt.js";
import type {
  CreateUserInput,
  UpdateUserInput,
} from "../validation/user.schema.validation.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { ROLES } from "../constants/roles.constant.js";

export const userService = {
  create: async (input: CreateUserInput,currentUserId : string) => {
    const existingUser = await User.findOne({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.EMAIL_EXISTS
      );
    }

    const userRole = await Role.findOne({
      where: { name: ROLES.USER },
    });

    if (!userRole) {
      throw new AppError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        MESSAGES.ROLE_NOT_FOUND
      );
    }

    const hashedPassword = await hashPassword(input.password);

    const user = await User.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      roleId: userRole.id,
      isActive: true,
      createdBy: currentUserId
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      roleId: user.roleId,
    };
  },

  findAll: async () => {
    return User.findAll({
      attributes: ["id", "name", "email", "isActive", "roleId", "createdAt"],
      include: [{ model: Role, as: "role", attributes: ["id", "name"] }],
      order: [["createdAt", "DESC"]],
    });
  },

  findById: async (id: string) => {
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "isActive", "roleId", "createdAt"],
      include: [{ model: Role, as: "role", attributes: ["id", "name"] }],
    });

    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
    }

    return user;
  },

  update: async (id: string, input: UpdateUserInput,currentUserId : string) => {
    const user = await User.findByPk(id);

    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
    }
    if (id === currentUserId && input.isActive !== undefined) {
      throw new AppError(
        HTTP_STATUS.FORBIDDEN,
        MESSAGES.FORBIDDEN
      );
    }

    if (input.email) {
      const existingUser = await User.findOne({
        where: {
          email: input.email,
          id: { [Op.ne]: id },
        },
      });

      if (existingUser) {
        throw new AppError(
          HTTP_STATUS.BAD_REQUEST,
          MESSAGES.EMAIL_EXISTS
        );
      }
    }

    await user.update({...input, updatedBy: currentUserId });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      roleId: user.roleId,
      updatedAt: user.updatedAt,
    };
  },

  delete: async (id: string, currentUserId: string) => {
    if (id === currentUserId) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.CANNOT_DELETE_SELF
      );
    }

    const user = await User.findByPk(id);

    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
    }
    
    await user.update({ isActive: false, updatedBy: currentUserId });
    await user.destroy();
    
  },
};
