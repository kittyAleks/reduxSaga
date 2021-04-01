import React  from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/* Components */

import { HomeScreen } from '../screens/HomeScreen';
import { DevicesScreen } from '../screens/DevicesScreen';
import {SettingsScreen} from '../screens/SettingsScreen';

const defaultOptions = {
  headerStyle: {
    backgroundColor: '#b3e2c5',
  },

  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 20
  }
};

const optionsMainScreenHeader = {
  headerTitle: 'Hi world',
  // headerRight: () => <HeaderButtons>
  //     <Ionicons style={{paddingRight: 10}}
  //               name='ios-basket' color='white' size={23} />
  // </HeaderButtons>,
  // headerLeft: () => <HeaderButtons>
  //   <Ionicons onPress={() => alert('Hello')} style={{paddingLeft: 20}}  name='ios-menu' color='white' size={25} />
  // </HeaderButtons>
};

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const RootStackScreen = () => (
  <RootStack.Navigator>
    <RootStack.Screen name='Home' options={{
      // headerShown: true,
      // headerTitle: 'Home Screen',
      ...optionsMainScreenHeader,
      ...defaultOptions,
    }} component={AllTabNavigation} />

    <RootStack.Screen
      name='Devices'
      component={DevicesScreen}
      options={{
        headerTitle: 'Devices',
        ...defaultOptions
      }}
    />
    <RootStack.Screen
      name='Settings'
      component={SettingsScreen}
      options={{
        headerTitle: 'Settings',
        ...defaultOptions
      }}
    />
  </RootStack.Navigator>
);


const AllTabNavigation = () => (
  <Tab.Navigator
    barStyle={{
      backgroundColor: 'white',
    }}
    tabBarOptions={{
      headerBackground: '#009493',
      paddingTop: 20,
      activeTintColor: 'white',
      // showLabel: false,
      style: {
        height: 75,
        paddingTop: 5,
        backgroundColor: "#ca9d9c",
      },
    }}>

    <Tab.Screen
      name='HomeScreen'
      component={HomeScreen}
      options={{
        headerShown: false,
        tabBarLabel: 'Home',
        fontSize: 30,
      }}
    />
    <Tab.Screen
      name='Devices'
      component={DevicesScreen}
      options={{
        tabBarLabel: 'Devices'
        // tabBarIcon: () => ()
      }}
    />
    <Tab.Screen
      name='Settings'
      component={SettingsScreen}
      options={{
        tabBarLabel: 'Settings',
      }}
    />
  </Tab.Navigator>
);
