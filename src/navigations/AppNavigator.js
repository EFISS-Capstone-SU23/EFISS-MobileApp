import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import HomeStack from '../tabs/HomeStack';
import Details from '../screens/Details';
import Results from '../screens/Results';
import TakePicture from '../screens/TakePicture';
import SignUp from '../screens/SignUp';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import Wishlist from '../screens/Wishlist';

const Stack = createNativeStackNavigator();

function AppNavigator() {
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
