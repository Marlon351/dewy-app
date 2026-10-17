import mongoose from "mongoose";
import { encrypt, decrypt, encryptedString } from "../utils/encryption.js";

const PeriodLogSchema = new mongoose.Schema({
    completedSteps: {
        type: [{ type: String, maxLength: 40 }],
        validate: [steps => steps.length <= 30, "Too many completed steps."],
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { _id: false });

const DailyLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: String,
        required: true,
        match: [/^\d{4}-\d{2}-\d{2}$/, "Dates must be in the format YYYY-MM-DD."],
    },
    am: {
        type: PeriodLogSchema,
        default: () => ({}),
    },
    pm: {
        type: PeriodLogSchema,
        default: () => ({}),
    },
    // Skin ratings and notes are personal health information, so they're encrypted
    rating: {
        type: String,
        set: (value) => value == null ? undefined : encrypt(String(value)),
        get: (value) => value ? Number(decrypt(value)) : null,
        validate: {
            validator: (value) => [1, 2, 3, 4, 5].includes(Number(decrypt(value))),
            message: "Skin ratings must be a whole number from 1 to 5.",
        },
    },
    note: encryptedString({ maxLength: 1000, fieldName: "Notes" }),
}, { timestamps: true });

DailyLogSchema.index({ user: 1, date: 1 }, { unique: true });

const DailyLog = mongoose.model("DailyLog", DailyLogSchema);
export default DailyLog;
