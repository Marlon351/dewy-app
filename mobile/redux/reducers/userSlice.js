import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        logIn: (state, action) => {
            return {...state, ...action.payload, ...{isLoggedIn: true}};
        },
        resetPassword: (state, action) => {
            return {...state, ...action.payload};
        },
        resetToInitialState: () => {
            return initialState;
        },
    }
});

export const { resetToInitialState, logIn, resetPassword} = userSlice.actions;
export default userSlice.reducer;