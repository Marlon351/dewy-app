import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token: undefined,
};

export const tokenSlice = createSlice({
    name: "token",
    initialState: initialState,
    reducers: {
        resetToInitialState: () => {
            return initialState;
        },
        setToken: (state, action) => {
            return action.payload;
        },
    },
});

export const { resetToInitialState, setToken } = tokenSlice.actions;
export default tokenSlice.reducer;