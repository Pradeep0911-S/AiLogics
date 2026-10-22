
import { Op } from "sequelize";
import { User } from "../models/users.model.js";
import { Role } from "../models/roles.model.js";
import { AppError } from "../error/app-error.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { hashPassword } from "../utils/bcrypt.js";
import type {
  CreateUserInput,
  UpdateUserInput,
} from "../validation/user.schema.validation.js";

export const userService = {
  create: async (input: CreateUserInput) => {
    const existingUser = await User.findOne({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        "A user with this email already exists"
      );
    }

    const staffRole = await Role.findOne({
      where: { name: "USER" },
    });

    if (!staffRole) {
      throw new AppError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Staff role is not configured"
      );
    }

    const hashedPassword = await hashPassword(input.password);

    const user = await User.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      roleId: staffRole.id,
      isActive: true,
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
      throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
    }

    return user;
  },

  update: async (id: string, input: UpdateUserInput) => {
    const user = await User.findByPk(id);

    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
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
          "A user with this email already exists"
        );
      }
    }

    await user.update(input);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      roleId: user.roleId,
    };
  },

  delete: async (id: string, currentUserId: string) => {
    if (id === currentUserId) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        "You cannot delete your own account"
      );
    }

    const user = await User.findByPk(id);

    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
    }

    await user.destroy();
  },
};
