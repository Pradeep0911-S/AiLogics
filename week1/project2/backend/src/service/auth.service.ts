import bcrypt from "bcrypt";

import type { RegisterInput } from "../validation/auth.validation.js";


export async function registerUser(regDetails: RegisterInput) {
    const passwordHash = await bcrypt.hash(regDetails.password, 10);
    
}