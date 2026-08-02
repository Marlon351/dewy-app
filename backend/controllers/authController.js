import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import AppError from "../utils/AppError.js";
import validator from "validator";

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
    }

    const user = await User.findOne({emailAddress});
    if (user){
        return next(new AppError(409, "An account already exists with the provided email."));
    }
    
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
    }

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
    }
    if (!validator.isEmail(emailAddress)){
        return next(new AppError(400, "Please provide a valid email."));
    }

    const user = await User.findOne({emailAddress}).select("+password");

    if (!user){
        return next(new AppError(401, "The email or password you entered is incorrect."));
    }

    const correctPassword = await user.correctPassword(password);

    if (!correctPassword){
        return next(new AppError(401, "The email or password you entered is incorrect."));
    };

    user.password = undefined;

    const payloadForToken = {
        id: user._id,
    }

    const token = generateToken(payloadForToken);

    return res.status(200).json({
        status: "success",
        token,
        data: user,
    })
};

const protect = async (req, res, next) => {
    let payload;
    let user;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        const unverifiedToken = req.headers.authorization.split(" ")[1];
        payload = verifyToken(unverifiedToken);
        user = await User.findById(payload.id);
        if (!user){
            return next(new AppError(401, "The user belonging to the token no longer exists."))
        }
        req.user = user;
    }

    if (!payload){
        return next(new AppError(401, "Please log in to proceed."));
    }
    next();
};

export default {
    register,
    login,
    protect,
};