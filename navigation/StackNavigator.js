import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {HomeScreen} from '../screens/HomeScreen';
import {WhatsappStatusScreen} from '../screens/WhatStatusScreen';
import {WhatCloneScreen} from '../screens/WhatCloneScreen';
import TabNavigator from './TabNavigator';

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    WhatStatus: {
      screen: TabNavigator,
      navigationOptions: {
        title: 'Whatsapp Status',
        headerTintColor: '#C13584',
        gesturesEnabled: true,
      },
    },
    WhatClone: {
      screen: WhatCloneScreen,
      navigationOptions: {
        title: 'Whatsapp Clone',
        headerTintColor: '#66D367',
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default StackNavigator;
