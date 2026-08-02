const register = async (firstName, lastName, emailAddress, password, confirmPassword) => {
    const response = await fetch("http://10.0.0.162:3000/users/register/", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        })
    });
    const statusCode = response.status;
    const responseInJSON = await response.json();
    return {statusCode, responseInJSON};
}

const login = async (emailAddress, password) => {
    const response = await fetch("http://10.0.0.162:3000/users/login/", {
        method: "POST",
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            emailAddress,
            password,
        })
    })
    const statusCode = response.status;
    const responseInJSON = await response.json();
    return {statusCode, responseInJSON};
}

export default {
    register,
    login,
};