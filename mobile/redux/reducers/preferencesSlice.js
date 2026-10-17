import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: "system",
    notificationsEnabled: true,
    language: 'en',
};

const preferencesSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        switchTheme: (state) => {
            return state.theme === "dark"? {...state, theme: "light"} : {...state, theme: "dark"};
        },
        setTheme: (state, action) => {
            return {...state, theme: action.payload};
        },
        setNotifications: (state, action) => {
            return {...state, ...action.payload};
        },
        setLanguage: (state, action) => {
            return {...state, ...action.payload};
        },
        resetPreferences: () => {
            return initialState;
        },
    },
});

// Creates the actions object, which contains action functions
//The actions object contains functions with the same name as the reducers, but they are different
export const { switchTheme, setTheme, setNotifications, setLanguage, resetPreferences } = preferencesSlice.actions;

// Takes all of the reducers and combines them to make one reducer
export default preferencesSlice.reducer;
