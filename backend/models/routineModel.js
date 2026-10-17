import mongoose from "mongoose";
import { encryptedString } from "../utils/encryption.js";

const MAX_STEPS = 30;

const StepSchema = new mongoose.Schema({
    stepId: {
        type: String,
        required: [true, "Each step needs an id."],
        maxLength: 40,
    },
    // Step and product names can reveal medications or skin conditions, so they're encrypted
    name: encryptedString({ required: [true, "Each step needs a name."], maxLength: 50, fieldName: "Step names" }),
    product: encryptedString({ maxLength: 100, fieldName: "Product names" }),
    days: {
        type: [Number],
        validate: {
            validator: function(days){
                return days.length > 0 && new Set(days).size === days.length && days.every(day => Number.isInteger(day) && day >= 0 && day <= 6);
            },
            message: "Each step needs at least one valid day.",
        },
    },
}, { _id: false });

const RoutineSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    am: {
        type: [StepSchema],
        validate: [steps => steps.length <= MAX_STEPS, `A routine can have at most ${MAX_STEPS} steps.`],
    },
    pm: {
        type: [StepSchema],
        validate: [steps => steps.length <= MAX_STEPS, `A routine can have at most ${MAX_STEPS} steps.`],
    },
}, { timestamps: true });

const Routine = mongoose.model("Routine", RoutineSchema);
export default Routine;
