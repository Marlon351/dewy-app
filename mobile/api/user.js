import request from "./client";

const register = async (firstName, lastName, emailAddress, password, confirmPassword) => {
    return request("/users/register/", {
        method: "POST",
        body: {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        },
    });
};

const login = async (emailAddress, password) => {
    return request("/users/login/", {
        method: "POST",
        body: {
            emailAddress,
            password,
        },
    });
};

const forgotPassword = async (emailAddress) => {
    return request("/users/forgotPassword/", {
        method: "POST",
        body: {
            emailAddress,
        },
    });
};

const verifyEmail = async (emailAddress, passwordResetCode) => {
    return request("/users/verifyEmail/", {
        method: "POST",
        body: {
            emailAddress,
            passwordResetCode,
        },
    });
};

const resetPassword = async (token, password, confirmPassword) => {
    return request("/users/resetMyPassword", {
        method: "POST",
        token,
        body: {
            newPassword: password,
            confirmNewPassword: confirmPassword,
        },
    });
};

const getMe = async (token) => {
    return request("/users/getMe", {
        token,
    });
};

const updateMe = async (token, firstName, lastName, emailAddress, currentPassword) => {
    return request("/users/updateMe", {
        method: "PATCH",
        token,
        body: {
            firstName,
            lastName,
            emailAddress,
            currentPassword,
        },
    });
};

const updateMyPassword = async (token, currentPassword, newPassword, confirmNewPassword) => {
    return request("/users/updateMyPassword", {
        method: "PATCH",
        token,
        body: {
            currentPassword,
            newPassword,
            confirmNewPassword,
        },
    });
};

const deleteMe = async (token) => {
    return request("/users/deleteMe", {
        method: "DELETE",
        token,
    });
};

export default {
    register,
    login,
    forgotPassword,
    verifyEmail,
    resetPassword,
    getMe,
    updateMe,
    updateMyPassword,
    deleteMe,
};
