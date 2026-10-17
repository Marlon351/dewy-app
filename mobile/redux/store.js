import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Keychain from 'react-native-keychain';
//Reducer imports
import userReducer from './reducers/userSlice';
import tokenReducer from './reducers/tokenSlice';
import preferencesReducer from './reducers/preferencesSlice';
import routineReducer from './reducers/routineSlice';
import { routineSyncListener } from './routineSync';

export const SecureStorage = {
  setItem: async (key, value) => {
    await Keychain.setGenericPassword('secure', value, { service: key });
  },
  getItem: async key => {
    const credentials = await Keychain.getGenericPassword({ service: key });
    return credentials ? credentials.password : null;
  },
  removeItem: async key => {
    await Keychain.resetGenericPassword({ service: key });
  },
};


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistSecureConfig = {
  key: 'secure',
  storage: SecureStorage,
};


//const rootReducer = combineReducers({});

const rootReducerPersist = combineReducers({
  user: userReducer,
  preferences: preferencesReducer,
  routine: routineReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducerPersist);

const rootReducerPersistSecure = combineReducers({
  token: tokenReducer,
});
const persistedSecureReducer = persistReducer(persistSecureConfig, rootReducerPersistSecure);


export const store = configureStore({
  reducer: {
    persist: persistedReducer,
    persistSecure: persistedSecureReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(routineSyncListener.middleware),
});

export const persistor = persistStore(store);