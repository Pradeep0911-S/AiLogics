import type { Request, Response} from "express";
import { registerUser } from "../service/authService.js";
import { registerSchema } from "../validation/authValidation.js";

export async function register (req : Request,res :Response): Promise<void>{
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({
            message: "Validation failed",
            errors: validation.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        })),
    });
    return;
  }
  const user = await registerUser(validation.data);
  res.status(201).json({message: "Registration successful",user});
  return ; 
}