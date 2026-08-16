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
    },
    lastName: {
        type: String,
        required: [true, "Your last name is a required field."],
        trim: true,
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
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
});

UserSchema.methods.correctPassword = async function(unverifiedPassword){
    const password = this.password;
    const isCorrect = await bcrypt.compare(unverifiedPassword, password);
    return isCorrect;
};

UserSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetToken = hashedResetToken;
    this.passwordResetExpires = Date.now() +  1000 * 60 * 10;

    return resetToken;
};

UserSchema.methods.resetPassword = function (newPassword, confirmNewPassword){
    this.password = newPassword;
    this.confirmPassword = confirmNewPassword;
    this.passwordResetToken = undefined;
    this.passwordResetExpires = undefined;
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