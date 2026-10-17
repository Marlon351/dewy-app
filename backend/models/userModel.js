import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import 'dotenv/config';

const PASSWORD_WORK_FACTOR = process.env.PASSWORD_WORK_FACTOR;

const UserSchema =  new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Your first name is a required field."],
        trim: true,
        maxLength: [50, "Your first name must be 50 characters or less."],
    },
    lastName: {
        type: String,
        required: [true, "Your last name is a required field."],
        trim: true,
        maxLength: [50, "Your last name must be 50 characters or less."],
    },
    emailAddress: {
        type: String,
        required: [true, "Your email is a required field."],
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email."],
    },
    password: {
        type: String,
        required: [true, "Please provide a password."],
        minLength: 8,
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password."],
        validate: {
            validator: function(value){
                return value === this.password;
            },
            message: "The passwords do not match.",
        },
    },
    passwordChangedAt: {
        type: Date,
        select: false,
    },
    passwordResetCode: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    passwordResetAttempts: {
        type: Number,
        select: false,
    },
});

UserSchema.methods.correctPassword = async function(unverifiedPassword){
    const password = this.password;
    const isCorrect = await bcrypt.compare(unverifiedPassword, password);
    return isCorrect;
};

UserSchema.methods.createPasswordResetCode = function(){
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let resetCode = "";
    for (let i = 0; i <= 4; i++){
        const randomLetter = alphabet.charAt(crypto.randomInt(0, 26));
        resetCode += randomLetter;
    };

    const hashedResetCode = crypto.createHash('sha256').update(resetCode).digest('hex');
    this.passwordResetCode = hashedResetCode;
    this.passwordResetExpires = Date.now() +  1000 * 60 * 10;
    this.passwordResetAttempts = 0;

    return resetCode;
};

UserSchema.methods.resetPassword = function (newPassword, confirmNewPassword){
    this.password = newPassword;
    this.confirmPassword = confirmNewPassword;
    this.passwordResetCode = undefined;
    this.passwordResetExpires = undefined;
    this.passwordResetAttempts = undefined;
};

// Tokens issued before the latest password change are no longer valid
UserSchema.methods.changedPasswordAfter = function(tokenIssuedAt){
    if (!this.passwordChangedAt){
        return false;
    };
    return this.passwordChangedAt.getTime() / 1000 > tokenIssuedAt;
};

UserSchema.pre("save", async function(){
    if (!this.isModified("password")){
        return 
    };
    
    this.confirmPassword = undefined;
    const unhashedPassword = this.password;
    const salt = await bcrypt.genSalt(parseInt(PASSWORD_WORK_FACTOR));
    const hashedPassword = await bcrypt.hash(unhashedPassword, salt);
    this.password = hashedPassword;
});

UserSchema.pre("save", async function(){
    if (!this.isModified("password") || this.isNew){
        return
    };

    this.passwordChangedAt = Date.now() - 1000;
});

const User = mongoose.model("User", UserSchema);
export default User;