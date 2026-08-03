import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";

const getMe = async (req, res, next) => {

    const userId = req.user.id;
    const user = await User.findById(userId);

    return res.status(200).json({
        status: "success",
        data: user,
    });
};

const deleteMe = async (req, res, next) => {
    const userId = req.user.id;

    await User.findByIdAndDelete(userId);

    return res.status(204).json({
        status: "success",
        message: "The user has been successfully deleted."
    });
};

export default {
    deleteMe,
    getMe,
};