import { CreateUserInput } from "../validation/user.schema.validation"
import { models } from "../models"
import { HTTP_STATUS } from "../constants/httpStatus.constant";
import { MESSAGES } from "../constants/messages.constant";
import { AppError } from "../error/appError.js";
import { ROLES } from "../constants/roles.constant";
import { hashPassword } from "../utils/bcrypt";

export const adminService = {
    create : async (input : CreateUserInput , currentUserId : string) =>{
        const existingUser = await models.User.findOne({
            where : {email: input.email},
        });
        if(existingUser){
            throw new AppError(
                HTTP_STATUS.BAD_REQUEST,
                MESSAGES.EMAIL_EXISTS
            );
        }
        const userRole = await models.Role.findOne({
            where : {name : ROLES.ADMIN}
        })
        if(!userRole){
            throw new AppError(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                MESSAGES.ROLE_NOT_FOUND
            )
        }
        const hashedPassword = await hashPassword(input.password)

        const admin =await models.User.create({
            name : input.name,
            email: input.email,
            password: hashedPassword,
            roleId: userRole.id,
            isActive:true,
            createdBy: currentUserId
        })

        return {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            isActive : admin.isActive,
            roleId: admin.roleId,
        };
    },
}