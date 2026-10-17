import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import AppError from "../utils/AppError.js";
import validator from "validator";
import crypto from "crypto";
import mongoose from "mongoose";
import { sendPasswordResetCode } from "../utils/email.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const PASSWORD_RESET_TOKEN_EXPIRES_IN = "10m";
const MAX_PASSWORD_RESET_ATTEMPTS = 5;

// "session" tokens give full access, "passwordReset" tokens can only be used to reset the password
const generateToken = (payload, expiresIn = JWT_EXPIRES_IN) => {
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn,
    });

    return token;
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
};

const register = async (req, res, next) => {
    const {firstName, lastName, emailAddress, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !emailAddress || !password || !confirmPassword){
        return next(new AppError(400, "Please fill out all fields."));
    };

    const user = await User.findOne({emailAddress});

    if (user){
        return next(new AppError(409, "An account already exists with the provided email."));
    };
    
    const newUser = await User.create({
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword,
    });
    
    newUser.password = undefined;

    const payloadForToken = {
        id: newUser._id,
        purpose: "session",
    };

    const token = generateToken(payloadForToken);

    return res.status(201).json({
        status: "success",
        token,
        data: newUser,
    });
};

const login = async (req, res, next) => {
    const {emailAddress, password} = req.body;
    
    if (!emailAddress || !password){
        return next(new AppError(400, "Please fill out all fields."));
    };

    if (!validator.isEmail(emailAddress)){
        return next(new AppError(400, "Please provide a valid email."));
    };

    const user = await User.findOne({emailAddress}).select("+password");

    if (!user){
        return next(new AppError(401, "The email or password you entered is incorrect."));
    };

    const correctPassword = await user.correctPassword(password);

    if (!correctPassword){
        return next(new AppError(401, "The email or password you entered is incorrect."));
    };

    user.password = undefined;

    const payloadForToken = {
        id: user._id,
        purpose: "session",
    };

    const token = generateToken(payloadForToken);

    return res.status(200).json({
        status: "success",
        token,
        data: user,
    });
};

const authenticate = (purpose) => async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")){
        return next(new AppError(401, "Please log in to proceed."));
    };

    const payload = verifyToken(authorization.substring(7));
    // Tokens issued before purposes were added are full session tokens
    if ((payload.purpose ?? "session") !== purpose){
        return next(new AppError(401, "The provided token is invalid. Please log in to proceed."));
    };

    const user = await User.findById(payload.id).select("+passwordChangedAt");
    if (!user){
        return next(new AppError(401, "The account for this token no longer exists."));
    };

    if (user.changedPasswordAfter(payload.iat)){
        return next(new AppError(401, "Your password was recently changed. Please log in again."));
    };

    req.user = user;

    next();
};

const protect = authenticate("session");
const protectPasswordReset = authenticate("passwordReset");

const forgotPassword = async (req, res, next) => {
    const { emailAddress } = req.body;
    if (!emailAddress){
        return next(new AppError(400, "Please provide an email address."));
    };
    const user = await User.findOne({emailAddress});

    if (user){
        const resetCode = user.createPasswordResetCode();
        await user.save({ validateBeforeSave: false });

        try {
            await sendPasswordResetCode(user.emailAddress, user.firstName, resetCode);
        }
        catch (err) {
            // Don't leave a usable code behind if the user never received it
            user.passwordResetCode = undefined;
            user.passwordResetExpires = undefined;
            user.passwordResetAttempts = undefined;
            await user.save({ validateBeforeSave: false });
            console.log(err);
            return next(new AppError(500, "There was a problem sending the email. Please try again later."));
        };
    };

    return res.status(200).json({
        status: "success",
        message: "If an account exists for that email, a reset code has been sent.",
    });

};

const verifyEmail = async (req, res, next) => {
    const { emailAddress, passwordResetCode } = req.body;
    if (!passwordResetCode || !emailAddress){
        return next(new AppError(400, "Please provide an email address and its code for verification."));
    };

    // mongoose.trusted allows our own $gt through the global query filter sanitization
    const user = await User.findOne({emailAddress, passwordResetExpires: mongoose.trusted({ $gt: Date.now() })}).select("+passwordResetCode +passwordResetAttempts");

    if (!user){
        return next(new AppError(400, "The token is invalid or has expired."));
    };

    const hashedPasswordResetCode = crypto.createHash('sha256').update(String(passwordResetCode)).digest();
    const isCorrectCode = crypto.timingSafeEqual(hashedPasswordResetCode, Buffer.from(user.passwordResetCode, 'hex'));

    if (!isCorrectCode){
        // Limit guesses so the short code can't be brute forced
        user.passwordResetAttempts = (user.passwordResetAttempts ?? 0) + 1;
        if (user.passwordResetAttempts >= MAX_PASSWORD_RESET_ATTEMPTS){
            user.passwordResetCode = undefined;
            user.passwordResetExpires = undefined;
            user.passwordResetAttempts = undefined;
        };
        await user.save({ validateBeforeSave: false });
        return next(new AppError(400, "The token is invalid or has expired."));
    };

    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetAttempts = undefined;
    await user.save({ validateBeforeSave: false});

    const payloadForToken = {
        id: user._id,
        purpose: "passwordReset",
    };

    const token = generateToken(payloadForToken, PASSWORD_RESET_TOKEN_EXPIRES_IN);

    return res.status(200).json({
        status: "success",
        token,
        data: user,
    });

};

const resetMyPassword = async (req, res, next) => {
    const { newPassword, confirmNewPassword } = req.body;
    
    const user = req.user;

    if (!newPassword || !confirmNewPassword){
        return next(new AppError(400, "Please provide a new password and confirm it."));
    };

    user.resetPassword(newPassword, confirmNewPassword);
    await user.save();

    user.password = undefined;
    user.confirmPassword = undefined;

    const payloadForToken = {
        id: user._id,
        purpose: "session",
    };

    const token = generateToken(payloadForToken);

    return res.status(200).json({
        status: "success",
        token,
        data: user,
    });
};

const updateMyPassword = async (req, res, next) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmNewPassword){
        return next(new AppError(400, "Please provide your current password, a new password and confirm it."));
    };

    const user = await User.findById(req.user.id).select("+password");

    const correctPassword = await user.correctPassword(String(currentPassword));

    if (!correctPassword){
        return next(new AppError(401, "Your current password is incorrect."));
    };

    // Saving updates passwordChangedAt, which logs out every other session
    user.resetPassword(newPassword, confirmNewPassword);
    await user.save();

    user.password = undefined;
    user.confirmPassword = undefined;
    user.passwordChangedAt = undefined;

    const payloadForToken = {
        id: user._id,
        purpose: "session",
    };

    const token = generateToken(payloadForToken);

    return res.status(200).json({
        status: "success",
        token,
        data: user,
    });
};

export default {
    register,
    login,
    protect,
    protectPasswordReset,
    forgotPassword,
    verifyEmail,
    resetMyPassword,
    updateMyPassword,
};