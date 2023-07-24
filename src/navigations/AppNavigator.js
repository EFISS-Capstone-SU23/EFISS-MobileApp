import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

// Screens
import HomeStack from '../tabs/HomeStack';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import Details from '../screens/Details';
import Results from '../screens/Results';
import SignUp from '../screens/SignUp';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import BugReport from '../screens/BugReport';
import CollectionDetails from '../screens/CollectionDetails';
import Collections from '../screens/Collections';

const Stack = createNativeStackNavigator();

function AppNavigator() {
	const userSignin = useSelector((state) => state.userSignin);
	const { userToken } = userSignin;

	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="HomeStack"
		>
			<Stack.Screen name="HomeStack" component={HomeStack} />
			<Stack.Screen name="Details" component={Details} />
			<Stack.Screen name="Results" component={Results} />
			{userToken && userToken !== null
				? (
					<>
						<Stack.Screen name="Profile" component={Profile} />
						<Stack.Screen name="Collections" component={Collections} />
						<Stack.Screen name="CollectionDetails" component={CollectionDetails} />
						<Stack.Screen name="EditProfile" component={EditProfile} />
						<Stack.Screen name="ChangePassword" component={ChangePassword} />
						<Stack.Screen name="BugReport" component={BugReport} />
					</>
				)
				: (
					<>
						<Stack.Screen name="Login" component={Login} />
						<Stack.Screen name="SignUp" component={SignUp} />
					</>
				)}
		</Stack.Navigator>
	);
}

export default AppNavigator;
