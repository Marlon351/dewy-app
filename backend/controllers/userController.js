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

    return res.status(204).send();
};

export default {
    getMe,
    deleteMe,
};