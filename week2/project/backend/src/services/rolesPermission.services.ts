import { CreateUserInput } from "../validation/user.schema.validation"
import { models } from "../models"


export const rolesPermissionService = {
    create : async (input : CreateUserInput ) =>{
        const existingUser = await models.User.findOne({
            where : {email: input.email},
        });

        

        return {

        }
    }
}