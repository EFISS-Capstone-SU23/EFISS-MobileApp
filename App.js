import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet, Text, View, ActivityIndicator,
} from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from './constants';

// Screens
import HomeStack from './navigations/HomeStack';
import Details from './navigations/screens/Details';
import Results from './navigations/screens/Results';
import TakePicture from './navigations/screens/TakePicture';
import SignUp from './navigations/screens/SignUp';

const Stack = createNativeStackNavigator();

function App() {
	const [loaded] = useFonts({
		InterBold: require('./assets/fonts/Inter-Bold.ttf'),
		InterLight: require('./assets/fonts/Inter-Light.ttf'),
		InterMedium: require('./assets/fonts/Inter-Medium.ttf'),
		InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
		InterSemiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
	});

	if (!loaded) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" colors={COLORS.primary} />
				<StatusBar style="auto" />
			</View>
		);
	}

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
				initialRouteName="HomeStack"
			>
				<Stack.Screen name="HomeStack" component={HomeStack} />
				<Stack.Screen name="Details" component={Details} />
				<Stack.Screen name="Results" component={Results} />
				<Stack.Screen name="TakePicture" component={TakePicture} />
				<Stack.Screen name="SignUp" component={SignUp} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default App;
