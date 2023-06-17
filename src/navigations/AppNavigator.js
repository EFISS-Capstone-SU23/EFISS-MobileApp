import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

// Screens
import HomeStackGuest from '../tabs/HomeStackGuest';
import HomeStack from '../tabs/HomeStack';
import Details from '../screens/Details';
import Results from '../screens/Results';
import TakePicture from '../screens/TakePicture';
import SignUp from '../screens/SignUp';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import Wishlist from '../screens/Wishlist';

import { COLORS, SIZES } from '../constants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		justifyContent: 'center',
		paddingBottom: SIZES.medium,
	},
});

const Stack = createNativeStackNavigator();

function AppNavigator() {
	const userSignin = useSelector((state) => state.userSignin);
	const { loading, userToken } = userSignin;

	if (loading) {
		return <ActivityIndicator style={styles.container} size="large" color={COLORS.primary} />;
	}

	if (userToken === undefined || userToken === null) {
		return (
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
				initialRouteName="HomeStack"
			>
				<Stack.Screen name="HomeStack" component={HomeStackGuest} />
				<Stack.Screen name="Details" component={Details} />
				<Stack.Screen name="Results" component={Results} />
				<Stack.Screen name="TakePicture" component={TakePicture} />
				<Stack.Screen name="SignUp" component={SignUp} />
			</Stack.Navigator>
		);
	}

	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="HomeStack"
		>
			<Stack.Screen name="HomeStack" component={HomeStack} />
			<Stack.Screen name="Details" component={Details} />
			<Stack.Screen name="Results" component={Results} />
			<Stack.Screen name="TakePicture" component={TakePicture} />
			<Stack.Screen name="SignUp" component={SignUp} />
			<Stack.Screen name="EditProfile" component={EditProfile} />
			<Stack.Screen name="ChangePassword" component={ChangePassword} />
			<Stack.Screen name="Wishlist" component={Wishlist} />
		</Stack.Navigator>
	);
}

export default AppNavigator;
