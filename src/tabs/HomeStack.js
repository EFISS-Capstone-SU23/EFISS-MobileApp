import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';

import { COLORS } from '../constants';
import { AuthContext } from '../context/AuthContext';

// TABS
const homeTab = 'Trang chủ';
const loginTab = 'Đăng nhập';
const profileTab = 'Tài khoản';
const settingsTab = 'Cài đặt';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

function HomeStack() {
	const { isLoading, userToken } = useContext(AuthContext);

	const getTabBarIcon = (focused, size, route) => {
		let iconName;
		const rn = route.name;

		if (rn === homeTab) {
			iconName = focused ? 'home' : 'home-outline';
		} else if (rn === loginTab) {
			iconName = focused ? 'log-in' : 'log-in-outline';
		} else if (rn === profileTab) {
			iconName = focused ? 'person' : 'person-outline';
		} else if (rn === settingsTab) {
			iconName = focused ? 'settings' : 'settings-outline';
		}

		return <Ionicons name={iconName} size={size} color={COLORS.primary} />;
	};

	if (isLoading) {
		<ActivityIndicator style={styles.container} size="large" colors={COLORS.primary} />;
	}

	return (
		<Tab.Navigator
			initialRouteName={homeTab}
			backBehavior="initialRoute"
			screenOptions={({ route }) => ({
				tabBarInactiveTintColor: COLORS.gray,
				tabBarActiveTintColor: COLORS.primary,
				tabBarHideOnKeyboard: true,
				headerShown: false,
				tabBarIcon: ({ focused, size }) => getTabBarIcon(focused, size, route),
			})}
		>
			{userToken !== null
				? <Tab.Screen name={profileTab} component={Profile} />
				: <Tab.Screen name={loginTab} component={Login} />}
			<Tab.Screen name={homeTab} component={Home} />
			<Tab.Screen name={settingsTab} component={Settings} />
		</Tab.Navigator>
	);
}

export default HomeStack;
