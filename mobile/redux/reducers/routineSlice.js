import { createSlice } from "@reduxjs/toolkit";
import { everyDay, getScheduledSteps } from "../../utils/progress";

// Starter routine so new users have something to check off right away
const initialState = {
    am: [
        { id: "am-1", name: "Cleanser", product: "", days: everyDay },
        { id: "am-2", name: "Vitamin C Serum", product: "", days: everyDay },
        { id: "am-3", name: "Moisturizer", product: "", days: everyDay },
        { id: "am-4", name: "Sunscreen", product: "", days: everyDay },
    ],
    pm: [
        { id: "pm-1", name: "Cleanser", product: "", days: everyDay },
        { id: "pm-2", name: "Retinol", product: "", days: [1, 3, 5] },
        { id: "pm-3", name: "Moisturizer", product: "", days: everyDay },
    ],
    // Keyed by date, e.g. "2026-10-15": { am: { completedSteps, completed }, pm: {...}, rating, note }
    logs: {},
};

const getOrCreateLog = (state, date) => {
    if (!state.logs[date]) {
        state.logs[date] = {
            am: { completedSteps: [], completed: false },
            pm: { completedSteps: [], completed: false },
            rating: null,
            note: "",
        };
    }
    return state.logs[date];
};

const routineSlice = createSlice({
    name: "routine",
    initialState,
    reducers: {
        addStep: {
            reducer: (state, action) => {
                state[action.payload.period].push(action.payload.step);
            },
            prepare: (period, step) => {
                return { payload: { period, step: { ...step, id: Date.now().toString() } } };
            },
        },
        updateStep: (state, action) => {
            const { period, step } = action.payload;
            state[period] = state[period].map(existingStep => existingStep.id === step.id ? step : existingStep);
        },
        deleteStep: (state, action) => {
            const { period, id } = action.payload;
            state[period] = state[period].filter(step => step.id !== id);
        },
        moveStep: (state, action) => {
            const { period, index, direction } = action.payload;
            const steps = state[period];
            const newIndex = index + direction;
            if (newIndex >= 0 && newIndex < steps.length) {
                [steps[index], steps[newIndex]] = [steps[newIndex], steps[index]];
            }
        },
        toggleStep: (state, action) => {
            const { date, period, stepId } = action.payload;
            const periodLog = getOrCreateLog(state, date)[period];

            periodLog.completedSteps = periodLog.completedSteps.includes(stepId)
                ? periodLog.completedSteps.filter(id => id !== stepId)
                : [...periodLog.completedSteps, stepId];

            const scheduledSteps = getScheduledSteps(state[period], date);
            periodLog.completed = scheduledSteps.length > 0 && scheduledSteps.every(step => periodLog.completedSteps.includes(step.id));
        },
        setSkinLog: (state, action) => {
            const { date, ...skinLog } = action.payload;
            Object.assign(getOrCreateLog(state, date), skinLog);
        },
        setRoutineData: (state, action) => {
            const { am, pm, logs } = action.payload;
            return {...state, am, pm, logs};
        },
        resetRoutine: () => {
            return initialState;
        },
    },
});

export const { addStep, updateStep, deleteStep, moveStep, toggleStep, setSkinLog, setRoutineData, resetRoutine } = routineSlice.actions;
export default routineSlice.reducer;
