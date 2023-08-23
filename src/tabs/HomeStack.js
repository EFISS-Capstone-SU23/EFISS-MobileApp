import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Search from '../screens/Search';

import { COLORS } from '../constants';

// TABS
const homeTab = 'Trang chủ';
const searchTab = 'Tìm kiếm';
const settingsTab = 'Cài đặt';

const Tab = createBottomTabNavigator();

function HomeStack() {
	const getTabBarIcon = (focused, size, route) => {
		let iconName;
		const rn = route.name;

		if (rn === homeTab) {
			iconName = focused ? 'home' : 'home-outline';
		} else if (rn === searchTab) {
			iconName = focused ? 'search' : 'search-outline';
		} else if (rn === settingsTab) {
			iconName = focused ? 'settings' : 'settings-outline';
		}

		// eslint-disable-next-line no-return-assign, max-len
		return <Ionicons name={iconName} size={size} color={iconName = focused ? COLORS.primary : COLORS.dark} />;
	};

	return (
		<Tab.Navigator
			initialRouteName={homeTab}
			backBehavior="initialRoute"
			screenOptions={({ route }) => ({
				tabBarInactiveTintColor: COLORS.dark,
				tabBarActiveTintColor: COLORS.primary,
				tabBarHideOnKeyboard: true,
				headerShown: false,
				tabBarIcon: ({ focused, size }) => getTabBarIcon(focused, size, route),
			})}
		>
			<Tab.Screen name={searchTab} component={Search} />
			<Tab.Screen name={homeTab} component={Home} />
			<Tab.Screen name={settingsTab} component={Settings} />
		</Tab.Navigator>
	);
}

export default HomeStack;
