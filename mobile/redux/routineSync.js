import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import api from "../api/routine";
import { logOut } from "./session";
import { addStep, deleteStep, moveStep, resetRoutine, setRoutineData, setSkinLog, toggleStep, updateStep } from "./reducers/routineSlice";

// Replaces whatever is on the device with the logged in user's routine from the server
export const loadRoutine = (token) => async (dispatch, getState) => {
    dispatch(resetRoutine());
    const response = await api.getRoutine(token);
    if (response.statusCode != 200) {
        return;
    }

    const { routine, logs } = response.responseInJSON.data;
    if (routine) {
        dispatch(setRoutineData({ ...routine, logs }));
    }
    else {
        // New accounts save the starter routine so it's there on their other devices
        const { am, pm } = getState().persist.routine;
        await api.updateRoutine(token, am, pm);
    }
};

// Saves routine changes to the server after the user stops making changes for a moment
export const routineSyncListener = createListenerMiddleware();

routineSyncListener.startListening({
    matcher: isAnyOf(addStep, updateStep, deleteStep, moveStep),
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();
        await listenerApi.delay(500);

        const { persist, persistSecure } = listenerApi.getState();
        if (persistSecure.token) {
            const response = await api.updateRoutine(persistSecure.token, persist.routine.am, persist.routine.pm);
            if (response.statusCode == 401) {
                listenerApi.dispatch(logOut());
            }
        }
    },
});

routineSyncListener.startListening({
    matcher: isAnyOf(toggleStep, setSkinLog),
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();
        await listenerApi.delay(500);

        const { persist, persistSecure } = listenerApi.getState();
        const { date } = action.payload;
        if (persistSecure.token) {
            const response = await api.updateLog(persistSecure.token, date, persist.routine.logs[date]);
            if (response.statusCode == 401) {
                listenerApi.dispatch(logOut());
            }
        }
    },
});
