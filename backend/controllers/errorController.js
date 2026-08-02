import AppError from "../utils/AppError.js";

const globalErrorHandler = (err, req, res, next) => {
    if (err.code == 11000){
        const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
        err = new AppError(409, `Duplicate field value: ${value}. Please use another value!`);
    }
    else if (err.name == "TokenExpiredError"){
        err = new AppError(401, "The token provided in your request has expired. Please log in to proceed.");
    }
    else if (err.name == "JsonWebTokenError"){
        err = new AppError(401, "The provided token is invalid. Please log in to proceed.");
    }
    else if (err.name == "ValidationError"){
        err = new AppError(400, err.message.replace("User validation failed: ", ""));
    }
    if (err.name == "AppError"){
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    console.log(err);
    return res.status(500).json({
        status: "error",
        message: "Something went very wrong."
    })
};

export default globalErrorHandler;