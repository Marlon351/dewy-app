import User from "../models/userModel.js";
import Routine from "../models/routineModel.js";
import DailyLog from "../models/dailyLogModel.js";
import AppError from "../utils/AppError.js";

const filterUpdates = (reqBody, allowedFields) => {
    let newObj = {};
    Object.keys(reqBody).forEach((key) => {
        if (allowedFields.includes(key)){
            newObj[key] = reqBody[key];
        };
    });
    return newObj;
};

const getMe = async (req, res, next) => {
    const userId = req.user.id;

    const user = await User.findById(userId);

    return res.status(200).json({
        status: "success",
        data: user,
    });
};

const updateMe = async (req, res, next) => {
    const userId = req.user.id;

    if (req.body.password != undefined || req.body.confirmPassword != undefined){
        return next(new AppError(400, "Passwords cannot be updated in this route."));
    };

    const allowedFields = ['firstName', 'lastName', 'emailAddress'];//Here is where you add new fields that can be updated.
    const filteredUpdates = filterUpdates(req.body, allowedFields);
    if (Object.keys(filteredUpdates).length == 0){
        return next(new AppError(400, "No valid fields were provided for updating."));
    };

    if (Object.values(filteredUpdates).some(value => typeof value != "string")){
        return next(new AppError(400, "Please provide valid values for updating."));
    };

    // The email is used to reset the password, so changing it requires the current password
    const emailAddress = filteredUpdates.emailAddress;
    if (emailAddress != undefined && String(emailAddress).trim().toLowerCase() != req.user.emailAddress){
        const user = await User.findById(userId).select("+password");
        if (!req.body.currentPassword || !(await user.correctPassword(String(req.body.currentPassword)))){
            return next(new AppError(401, "Please enter your current password to change your email."));
        };
    };

    const updatedUser = await User.findByIdAndUpdate(userId, filteredUpdates, {
        returnDocument: 'after',
        runValidators: true,
    });

    return res.status(200).json({
        status: "success",
        data: updatedUser,
    });
};

const deleteMe = async (req, res, next) => {
    const userId = req.user.id;

    await User.findByIdAndDelete(userId);
    await Routine.deleteOne({ user: userId });
    await DailyLog.deleteMany({ user: userId });

    return res.status(204).send();
};

export default {
    getMe,
    updateMe,
    deleteMe,
};