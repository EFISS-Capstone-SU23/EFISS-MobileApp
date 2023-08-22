import {
	View, StyleSheet, Image,
} from 'react-native';
import {
	ActivityIndicator, Button, Divider, Text,
} from '@react-native-material/core';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

import { FONTS, SIZES, COLORS } from '../constants';
import logo from '../assets/images/logo.png';
import { sendVerifyEmail } from '../actions/userActions';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		justifyContent: 'center',
		paddingBottom: SIZES.medium,
	},
	title: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.extraLarge,
		fontWeight: '500',
		color: COLORS.tertiary,
		marginBottom: 30,
		textAlign: 'center',
	},
	inputContainer: {
		marginBottom: 5,
	},
	inputField: {
		flexDirection: 'row',
	},
	errorContainer: {
		marginTop: 5,
		height: SIZES.extraLarge,
	},
	errorMessage: {
		color: COLORS.red,
		fontSize: 10,
	},
	successMessage: {
		color: COLORS.primary,
		fontSize: 10,
	},
	saveButton: {
		marginBottom: SIZES.medium,
		borderRadius: SIZES.base,
		justifyContent: 'center',
	},
	loadingIndicator: {
		flex: 1, // Take full height
		alignSelf: 'stretch', // Stretch to fill the parent container horizontally
		justifyContent: 'center',
		alignItems: 'center',
		height: SIZES.HEIGHT,
	},
});

function VerifyEmail({ navigation }) {
	const dispatch = useDispatch();
	const verifyEmail = useSelector((state) => state.verifyEmail);
	const {
		loading, data, success, error,
	} = verifyEmail;

	const handleSubmit = () => {
		dispatch(sendVerifyEmail());
	};

	return (
		<View style={styles.container}>
			{loading ? (
				<View style={styles.loadingIndicator}>
					<ActivityIndicator size="large" color={COLORS.primary} />
				</View>
			) : (
				<View style={{ paddingHorizontal: 25 }}>
					<View style={{ alignItems: 'center' }}>
						<Image source={logo} style={{ width: SIZES.WIDTH / 2, height: SIZES.WIDTH / 2 }} resizeMode="contain" />
					</View>
					<Text style={styles.title}>Xác minh email</Text>
					{success === false && (
						<View style={styles.errorContainer}>
							<Text style={styles.errorMessage}>{error.toString()}</Text>
						</View>
					)}
					{success && (
						<View style={styles.errorContainer}>
							<Text style={styles.successMessage}>{data.message.toString()}</Text>
						</View>
					)}
					<Button
						title="Gửi mail xác minh"
						color={COLORS.primary}
						onPress={handleSubmit}
						style={styles.saveButton}
					/>
					<Divider style={{ marginBottom: SIZES.medium }} />
					<Button
						title="Quay lại"
						variant="outlined"
						color={COLORS.black}
						onPress={() => navigation.goBack()}
						style={styles.saveButton}
					/>
				</View>
			)}
		</View>
	);
}

export default VerifyEmail;
