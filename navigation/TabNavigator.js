import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {WhatsappStatusScreen} from '../screens/WhatStatusScreen';
import {WhatDownloadsScreen} from '../screens/WhatDownloadsScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabNavigator = createBottomTabNavigator(
  {
    Statuses: WhatsappStatusScreen,
    Downloads: WhatDownloadsScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Statuses') {
          iconName = 'whatsapp';
          /* tintColor = '#66D367'; */
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
        } else if (routeName === 'Downloads') {
          iconName = 'download';
          /* tintColor = '#455A64'; */
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#66D367',
      inactiveTintColor: '#455A64',
    },
  },
);

export default TabNavigator;
//export default createAppContainer(TabNavigator);
