import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";

/* Components */

import {HomeScreen} from '../screens/HomeScreen';
import {CreateTodoListScreen} from '../screens/CreateTodoListScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {TaskDescriptionScreen} from "../screens/TaskDescriptionScreen";

const defaultOptions = {
    // headerStyle: {
    //     backgroundColor: '#b3e2c5',
    // },
    headerTintColor: 'red',
    headerTitleStyle: {
        fontSize: 20,
        color: 'black'
    },
};

const optionsMainScreenHeader = {
    headerTitle: 'Заметки',
    headerBackTitleVisible: false,
    headerTransparent: true,

     // headerRight: () =>
    //     <Ionicons style={{paddingRight: 11}}
    //               name='ios-basket' color='black' size={23}/>,
    headerBackImage: () =>
        <Ionicons style={{paddingLeft: 17}} name='arrow-back' color='black' size={25}/>,
};

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const RootStackScreen = () => (
    <SafeAreaProvider>
        <RootStack.Navigator>
            <RootStack.Screen name='HomeScreen' options={{
                // headerShown: true,
                // headerTitle: 'Home Screen',
                ...defaultOptions,
                ...optionsMainScreenHeader,
            }} component={HomeScreen}/>

            <RootStack.Screen
                name='CreateTodoListScreen'
                component={CreateTodoListScreen}
                options={{
                    headerTitle: null,
                    ...optionsMainScreenHeader,
                    ...defaultOptions,
                }}
                screenOptions={{
                    headerTitle: null,
                }}
            />
            <RootStack.Screen
                name='TaskDescriptionScreen'
                component={TaskDescriptionScreen}
                options={{
                    ...optionsMainScreenHeader,
                    ...defaultOptions,
                    headerTitle: () => null,
                }}
            />
        </RootStack.Navigator>
    </SafeAreaProvider>

);


// const AllTabNavigation = () => (
//   <Tab.Navigator
//     barStyle={{
//       backgroundColor: 'white',
//     }}
//     tabBarOptions={{
//       headerBackground: '#009493',
//       paddingTop: 20,
//       activeTintColor: 'white',
//       // showLabel: false,
//       style: {
//         height: 75,
//         paddingTop: 5,
//         backgroundColor: "#ca9d9c",
//       },
//     }}>
//
//     <Tab.Screen
//       name='HomeScreen'
//       component={HomeScreen}
//       options={{
//         headerShown: false,
//         tabBarLabel: 'Home',
//         fontSize: 30,
//       }}
//     />
// <Tab.Screen
//  name='CreateTodoListScreen'
//  component={CreateTodoListScreen}
//   options={{
//    tabBarLabel: 'TodoList'
//   tabBarIcon: () => ()
// }}
// />

// </Tab.Navigator>
// );

