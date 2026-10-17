import api from "../api/user";
import { resetToInitialState as resetUser, updateUser } from "./reducers/userSlice";
import { resetToInitialState as resetToken } from "./reducers/tokenSlice";
import { resetRoutine } from "./reducers/routineSlice";

// Clears everything about the user from the device
export const logOut = () => (dispatch) => {
    dispatch(resetUser());
    dispatch(resetToken());
    dispatch(resetRoutine());
};

// Runs on launch: refreshes the user's details, or logs out if the session expired or the account is gone
export const validateSession = () => async (dispatch, getState) => {
    const { persist, persistSecure } = getState();
    if (!persist.user.isLoggedIn) {
        return;
    }
    if (!persistSecure.token) {
        dispatch(logOut());
        return;
    }

    const response = await api.getMe(persistSecure.token);
    if (response.statusCode == 200) {
        dispatch(updateUser(response.responseInJSON.data));
    }
    else if (response.statusCode == 401) {
        dispatch(logOut());
    }
};
