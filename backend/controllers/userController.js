import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";

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

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
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