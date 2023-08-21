import React from 'react';
import {
	View, Text, StyleSheet,
} from 'react-native';
import { Button } from '@react-native-material/core';
import {
	COLORS, FONTS, SIZES,
} from '../../constants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: SIZES.large,
		marginBottom: 20,
		fontFamily: FONTS.bold,
		color: COLORS.red,
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#007bff',
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
		marginLeft: 5,
	},
});

function ErrorView({ navigation }) {
	const handleGoBack = () => {
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Đã có lỗi xảy ra</Text>
			<Button title="Quay lại" color={COLORS.primary} onPress={handleGoBack} />
		</View>
	);
}

export default ErrorView;
