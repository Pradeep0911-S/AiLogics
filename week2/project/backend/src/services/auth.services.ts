
import { User } from "../models/users.model.js";
import { Role } from "../models/roles.model.js";
import { AppError } from "../error/appError.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import type {
  RegisterInput,
  LoginInput,
} from "../validation/auth.schema.validation.js";
import { ROLES } from "../constants/roles.constant.js";

export const authService = {
  register: async (input: RegisterInput) => {
    const email = input.email;

    const existingEmail = await User.findOne({
      where: { email },
    });

    if (existingEmail) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.EMAIL_EXISTS
      );
    }


    const customerRole = await Role.findOne({
      where: { name: ROLES.CUSTOMER },
    });

    if (!customerRole) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        MESSAGES.ROLE_NOT_FOUND
      );
    }

    const hashedPassword = await hashPassword(input.password);

    const user = await User.create({
      name: input.name,
      email,
      password: hashedPassword,
      roleId: customerRole.id,
    });

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
      paranoid : false,
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });

    if (!user || !user.role) {
      throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        MESSAGES.UNAUTHORIZED
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
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.INVALID_CREDENTIALS
      );
    }

    const token = generateToken({
      userId: user.id,
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
