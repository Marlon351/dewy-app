import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from './redux/store';
import { persistor } from './redux/store';
import { Appearance } from 'react-native';
import themes from './theme/themes';
import { useSelector } from "react-redux";

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
  const themePreference = useSelector(state => state.persist.preferences.theme);
  const theme = themePreference === 'dark'? themes.DarkTheme: themes.LightTheme;
  return (
    <NavigationContainer theme={theme}>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default App;
