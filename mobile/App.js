import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store';
import { persistor } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
