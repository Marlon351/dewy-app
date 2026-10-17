import request from "./client";

const getRoutine = async (token) => {
    return request("/routine/", {
        token,
    });
};

const updateRoutine = async (token, am, pm) => {
    return request("/routine/", {
        method: "PUT",
        token,
        body: {
            am,
            pm,
        },
    });
};

const updateLog = async (token, date, log) => {
    return request(`/routine/logs/${date}`, {
        method: "PUT",
        token,
        body: log,
    });
};

export default {
    getRoutine,
    updateRoutine,
    updateLog,
};
