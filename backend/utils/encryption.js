import crypto from "crypto";
import 'dotenv/config';

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY ?? "", "hex");

// Refuse to start rather than store sensitive data unencrypted or with a weak key
if (ENCRYPTION_KEY.length !== 32){
    throw new Error("ENCRYPTION_KEY must be set to a 64 character hex string (32 bytes).");
};

// AES-256-GCM with a random IV per value, stored as "iv:authTag:cipherText" in base64
export const encrypt = (plainText) => {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", ENCRYPTION_KEY, iv);
    const cipherText = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return [iv, authTag, cipherText].map(buffer => buffer.toString("base64")).join(":");
};

export const decrypt = (encryptedText) => {
    const [iv, authTag, cipherText] = encryptedText.split(":").map(part => Buffer.from(part, "base64"));
    const decipher = crypto.createDecipheriv("aes-256-gcm", ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);
    return Buffer.concat([decipher.update(cipherText), decipher.final()]).toString("utf8");
};

// Schema definition for a string that is encrypted when set and decrypted when read
export const encryptedString = ({ required, maxLength, fieldName }) => ({
    type: String,
    required,
    set: (value) => {
        const trimmedValue = String(value ?? "").trim();
        return trimmedValue ? encrypt(trimmedValue) : undefined;
    },
    get: (value) => value ? decrypt(value) : "",
    validate: {
        validator: (value) => decrypt(value).length <= maxLength,
        message: `${fieldName} must be ${maxLength} characters or less.`,
    },
});
