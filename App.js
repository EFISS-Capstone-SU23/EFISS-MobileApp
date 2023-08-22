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

import BeVietnamProBold from './src/assets/fonts/BeVietnamPro-Bold.ttf';
import BeVietnamProSemiBold from './src/assets/fonts/BeVietnamPro-SemiBold.ttf';
import BeVietnamProLight from './src/assets/fonts/BeVietnamPro-Light.ttf';
import BeVietnamProMedium from './src/assets/fonts/BeVietnamPro-Medium.ttf';
import BeVietnamProRegular from './src/assets/fonts/BeVietnamPro-Regular.ttf';

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
		BeVietnamProBold,
		BeVietnamProLight,
		BeVietnamProMedium,
		BeVietnamProRegular,
		BeVietnamProSemiBold,
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
