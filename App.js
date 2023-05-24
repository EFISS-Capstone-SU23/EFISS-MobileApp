/* eslint-disable react/style-prop-object */
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet, View, ActivityIndicator,
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

import InterBold from './src/assets/fonts/Inter-Bold.ttf';
import InterLight from './src/assets/fonts/Inter-Light.ttf';
import InterMedium from './src/assets/fonts/Inter-Medium.ttf';
import InterRegular from './src/assets/fonts/Inter-Regular.ttf';
import InterSemiBold from './src/assets/fonts/Inter-SemiBold.ttf';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

function App() {
	const [loaded] = useFonts({
		InterBold,
		InterLight,
		InterMedium,
		InterRegular,
		InterSemiBold,
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

export default App;
