import jwt from "jsonwebtoken";

const getSecret = (): string => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }

    return secret;
};

export const tokenUtils = {
    signToken: (payload: { id: string }): string => {
        return jwt.sign(payload, getSecret(), {
            expiresIn: "15m",
        });
    },

    verifyToken: (token: string): { id: string } => {
        const decoded = jwt.verify(token, getSecret());

        if (
            typeof decoded === "string" ||
            typeof decoded.id !== "string"
        ) {
            throw new Error("Invalid token payload");
        }

        return { id: decoded.id };
    },
};
