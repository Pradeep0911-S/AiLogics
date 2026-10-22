import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const generateToken = (payload: object): string => {
  return jwt.sign(
    payload,
    ENV.JWT_SECRET,
    {
      expiresIn: ENV.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    }
  );
};

export const verifyToken = (
  token: string
) => {
  return jwt.verify(
    token,
    ENV.JWT_SECRET
  );
};