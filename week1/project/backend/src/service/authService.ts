import bcrypt from "bcrypt";
import { createUser } from "../model/authModel";
import type { RegisterInput } from "../validation/authValidation.js";


export async function registerUser(regDetails: RegisterInput) {
    const passwordHash = await bcrypt.hash(regDetails.password, 10);
    await createUser(regDetails.username,regDetails.email,passwordHash)
}