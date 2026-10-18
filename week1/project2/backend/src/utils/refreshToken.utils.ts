import { createHash, randomBytes } from "crypto";

export const refreshTokenUtils = {
    generateToken: (): string => {
        return randomBytes(64).toString("hex");
    },

    hashToken: (token: string): string => {
        return createHash("sha256")
            .update(token)
            .digest("hex");
    },
};
