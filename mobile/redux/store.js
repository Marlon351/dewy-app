import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "./reducers/User";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    user: User,
});

const configuration = {
    key: "root",
    storage: AsyncStorage,
    version: 1,
};

const persistedReducer = persistReducer(configuration, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false,
        });
    },
});

export default store;
export const persistor = persistStore(store);