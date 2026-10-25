
import { User } from "../models/users.model.js";
import { Role } from "../models/roles.model.js";
import { AppError } from "../error/app-error.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import type {
  RegisterInput,
  LoginInput,
} from "../validation/auth.schema.validation.js";

export const authService = {
  register: async (input: RegisterInput) => {
    const email = input.email;
    const name = input.name;

    const existingUser = await User.findOne({
      where: { name },
    });
    const existingEmail = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        "User with this name already exists"
      );
    }

    if (existingEmail) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        "Email is already registered"
      );
    }


    const customerRole = await Role.findOne({
      where: { name: "CUSTOMER" },
    });

    if (!customerRole) {
      throw new AppError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Customer role not found"
      );
    }

    const hashedPassword = await hashPassword(input.password);

    const user = await User.create({
      name: input.name,
      email,
      password: hashedPassword,
      roleId: customerRole.id,
    } as User);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: customerRole.name,
    };
  },

  login: async (input: LoginInput) => {
    const email = input.email;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });

    if (!user) {
      throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        MESSAGES.INVALID_CREDENTIALS
      );
    }

    if (!user.isActive) {
      throw new AppError(
        HTTP_STATUS.FORBIDDEN,
        "Your account is inactive"
      );
    }

    const isPasswordValid = await comparePassword(
      input.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        MESSAGES.INVALID_CREDENTIALS
      );
    }

    const token = generateToken({
      userId: user.id,
      role: user.role.name,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      },
    };
  },
};
