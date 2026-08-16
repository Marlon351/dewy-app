import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import AppError from "../utils/AppError.js";
import validator from "validator";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const generateToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });

    return token;
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
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
    };

    const token = generateToken(payloadForToken);

    return res.status(200).json({
        status: "success",
        token,
        data: user,
    });
};

const protect = async (req, res, next) => {
    const token = req.headers.authorization.substring(7);
    if (!token){
        return next(new AppError(400, "Please log in to proceed."));
    };

    const payload = verifyToken(token);
    const userId = payload.id;
    const user = await User.findById(userId);
    req.user = user;

    next();
};

const forgotPassword = async (req, res, next) => {
    const { emailAddress } = req.body;
    if (!emailAddress){
        return next(new AppError(400, "Please provide an email address."));
    };
    const user = await User.findOne({emailAddress});

    if (!user){
        return next(new AppError(404, "No user exists with the provided email address."));
    };

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    //Send Email

    console.log("Password Reset Token: " + resetToken);

    return res.status(200).json({
        status: "success",
        message: "Token succesfully sent to email.",
    });

};

const resetPassword = async (req, res, next) => {
    const { newPassword, confirmNewPassword } = req.body;
    if (!newPassword || !confirmNewPassword){
        return next(new AppError(400, "Please provide a new password and confirm it."));
    };

    const passwordResetToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        passwordResetToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user){
        return next(new AppError(400, "The token is invalid or has expired."));
    };

    user.resetPassword(newPassword, confirmNewPassword);
    await user.save();

    user.password = undefined;
    user.confirmPassword = undefined;

    const payloadForToken = {
        id: user._id,
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
    forgotPassword,
    resetPassword,
};