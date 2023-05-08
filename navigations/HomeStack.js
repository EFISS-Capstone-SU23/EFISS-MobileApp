import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from "./screens/Home";
import Login from './screens/Login';
import Settings from './screens/Settings';
import { COLORS } from '../constants';

// TABS
const homeTab = 'Home'
const loginTab = 'Login'
const settingsTab = 'Settings'

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeTab}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name

          if(rn === homeTab){
            iconName = focused? 'home' : 'home-outline';
          } else if(rn === loginTab){
            iconName = focused? 'person' : 'person-outline';
          } else if(rn === settingsTab){
            iconName = focused? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={COLORS.primary} />
        }
      })}
    >
      <Tab.Screen name={loginTab} component={Login} />
      <Tab.Screen name={homeTab} component={Home} />
      <Tab.Screen name={settingsTab} component={Settings} />
    </Tab.Navigator>
  )
}

export default HomeStack