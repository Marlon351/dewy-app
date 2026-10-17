// Debug builds talk to your local server, release builds to the production API over HTTPS
const DEVELOPMENT_API_URL = "http://10.155.66.253:3000";
const PRODUCTION_API_URL = "https://dewy-api.onrender.com";

export const API_URL = __DEV__ ? DEVELOPMENT_API_URL : PRODUCTION_API_URL;

export const PRIVACY_POLICY_URL = `${PRODUCTION_API_URL}/privacy`;
export const TERMS_OF_SERVICE_URL = `${PRODUCTION_API_URL}/terms`;

// Every request returns {statusCode, responseInJSON}, including when the server can't be reached
const request = async (path, { method = "GET", token, body } = {}) => {
    try {
        const response = await fetch(`${API_URL}${path}`, {
            method,
            headers: {
                'Accept': 'application/json',
                ...(body && { 'Content-Type': 'application/json' }),
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
            body: body && JSON.stringify(body),
        });
        const statusCode = response.status;
        const responseText = await response.text();
        const responseInJSON = responseText ? JSON.parse(responseText) : {};
        return {statusCode, responseInJSON};
    }
    catch (err) {
        return {statusCode: 0, responseInJSON: {message: "Can't connect right now. Check your internet connection and try again."}};
    }
};

export default request;
