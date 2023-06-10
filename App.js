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

import InterBold from './src/assets/fonts/Inter-Bold.ttf';
import InterLight from './src/assets/fonts/Inter-Light.ttf';
import InterMedium from './src/assets/fonts/Inter-Medium.ttf';
import InterRegular from './src/assets/fonts/Inter-Regular.ttf';
import InterSemiBold from './src/assets/fonts/Inter-SemiBold.ttf';
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
		InterBold,
		InterLight,
		InterMedium,
		InterRegular,
		InterSemiBold,
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
