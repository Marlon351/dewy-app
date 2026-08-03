import User from "../models/userModel.js";
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

const deleteMe = async (req, res, next) => {
    const userId = req.user.id;

    await User.findByIdAndDelete(userId);

    return res.status(204).json({
        status: "success",
        message: "The user has been successfully deleted."
    });
};

const updateMe = async (req, res, next) => {
    const userId = req.user.id;

    if (req.body.password != undefined || req.body.confirmPassword != undefined){
        return next(new AppError(400, "Passwords cannot be updated in this route."))
    };

    const fieldsToBeUpdated = req.body;
    const allowedFields = ['firstName', 'lastName', 'emailAddress'];//Here is where you add new fields that can be updated.
    const filteredUpdates = filterUpdates(fieldsToBeUpdated, allowedFields);
    if (Object.keys(filteredUpdates).length == 0){
        return next(new AppError(400, "No valid fields were provided for updating."));
    }

    const updatedUser = await User.findByIdAndUpdate(userId, filteredUpdates, {
        new: true,
        runValidators: true,
    });

    return res.status(200).json({
        status: "success",
        data: updatedUser,
    });
};

export default {
    deleteMe,
    updateMe,
};