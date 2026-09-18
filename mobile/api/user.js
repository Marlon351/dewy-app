const SERVER_URL = "localhost"

const register = async (firstName, lastName, emailAddress, password, confirmPassword) => {
    const response = await fetch(`http://${SERVER_URL}:3000/users/register/`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        }),
    });
    const statusCode = response.status;
    const responseInJSON = await response.json();
    return {statusCode, responseInJSON};
}

const login = async (emailAddress, password) => {
    const response = await fetch(`http://${SERVER_URL}:3000/users/login/`, {
        method: "POST",
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            emailAddress,
            password,
        }),
    });
    const statusCode = response.status;
    const responseInJSON = await response.json();
    return {statusCode, responseInJSON};
};

const forgotPassword = async (emailAddress) => {
    const response = await fetch(`http://${SERVER_URL}:3000/users/forgotPassword/`, {
        method: "POST",
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            emailAddress,
        }),
    });
    const statusCode = response.status;
    const responseInJSON = await response.json();
    return {statusCode, responseInJSON};
};

const verifyEmail = async (emailAddress, passwordResetCode) => {
    const response = await fetch(`http://${SERVER_URL}:3000/users/verifyEmail/`, {
        method: "POST",
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            emailAddress,
            passwordResetCode,
        }),
    });
    const statusCode = response.status;
    const responseInJSON = await response.json();
    return {statusCode, responseInJSON};
};

const resetPassword = async (token, password, confirmPassword) => {

    const response = await fetch(`http://${SERVER_URL}:3000/users/resetMyPassword`, {
        method: "POST",
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            newPassword: password,
            confirmNewPassword: confirmPassword,
        }),
    });
    const statusCode = response.status;
    const responseInJSON = await response.json();
    return {statusCode, responseInJSON};
};

export default {
    register,
    login,
    forgotPassword,
    verifyEmail,
    resetPassword,
};