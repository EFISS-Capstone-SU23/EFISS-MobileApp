import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet, Text, View, ActivityIndicator,
} from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import { store } from './src/redux/store';
import { COLORS } from './src/constants';

// Screens
import HomeStack from './src/tabs/HomeStack';
import Details from './src/screens/Details';
import Results from './src/screens/Results';
import TakePicture from './src/screens/TakePicture';
import SignUp from './src/screens/SignUp';

const Stack = createNativeStackNavigator();

function App() {
	const [loaded] = useFonts({
		InterBold: require('./src/assets/fonts/Inter-Bold.ttf'),
		InterLight: require('./src/assets/fonts/Inter-Light.ttf'),
		InterMedium: require('./src/assets/fonts/Inter-Medium.ttf'),
		InterRegular: require('./src/assets/fonts/Inter-Regular.ttf'),
		InterSemiBold: require('./src/assets/fonts/Inter-SemiBold.ttf'),
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
		<Provider store={store}>
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
		</Provider>

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
