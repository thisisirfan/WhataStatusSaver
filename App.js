import React from 'react';
import {StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import StackNavigator from './navigation/StackNavigator';

const App = () => {
  const AppContainer = createAppContainer(StackNavigator);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppContainer />
    </>
  );
};

export default App;
