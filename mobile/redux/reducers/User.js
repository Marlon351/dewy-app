import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
}

export const User = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        logIn: (state, action) => {
            return {...state, ...action.payload, ...{isLoggedIn: true}};
        },
        resetToInitialState: () => {
            return initialState;
        },
    }
});

export const { resetToInitialState, logIn} = User.actions;
export default User.reducer;