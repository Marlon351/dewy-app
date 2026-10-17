import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from './redux/store';
import { persistor } from './redux/store';
import { useColorScheme } from 'react-native';
import themes from './theme/themes';
import { useDispatch, useSelector } from "react-redux";
import { validateSession } from './redux/session';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppContent/>
      </PersistGate>
    </Provider>
  );
};

const AppContent = () => {
  const dispatch = useDispatch();
  const themePreference = useSelector(state => state.persist.preferences.theme);
  const systemTheme = useColorScheme();
  const activeTheme = themePreference === 'system'? systemTheme: themePreference;
  const theme = activeTheme === 'dark'? themes.DarkTheme: themes.LightTheme;
  useEffect(() => {
    dispatch(validateSession());
  }, [dispatch]);

  return (
    <NavigationContainer theme={theme}>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default App;
