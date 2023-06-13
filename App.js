import 'react-native-gesture-handler';
import {
	StyleSheet, View,
} from 'react-native';
import { ActivityIndicator } from '@react-native-material/core';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import { store } from './src/redux/store';
import { COLORS } from './src/constants';
import { AuthProvider } from './src/context/AuthContext';

import RobotoBold from './src/assets/fonts/Roboto-Bold.ttf';
import RobotoSemiBold from './src/assets/fonts/Roboto-SemiBold.ttf';
import RobotoLight from './src/assets/fonts/Roboto-Light.ttf';
import RobotoMedium from './src/assets/fonts/Roboto-Medium.ttf';
import RobotoRegular from './src/assets/fonts/Roboto-Regular.ttf';

import AppNavigator from './src/navigations/AppNavigator';

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
		RobotoBold,
		RobotoLight,
		RobotoMedium,
		RobotoRegular,
		RobotoSemiBold,
	});

	if (!loaded) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color={COLORS.primary} />
			</View>
		);
	}

	return (
		// Redux provider for global state management
		<Provider store={store}>
			<AuthProvider>
				<NavigationContainer>
					<AppNavigator />
				</NavigationContainer>
			</AuthProvider>
		</Provider>

	);
}

export default App;
