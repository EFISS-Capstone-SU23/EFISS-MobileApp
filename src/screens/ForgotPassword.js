/* eslint-disable import/no-extraneous-dependencies */
import {
	View, StyleSheet, Image,
} from 'react-native';
import {
	ActivityIndicator, TextInput, Button, Divider, Text,
} from '@react-native-material/core';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@rneui/themed';

import { FONTS, SIZES, COLORS } from '../constants';
import logo from '../assets/images/logo.png';
import { passwordSendReset } from '../actions/userActions';

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

const SignupSchema = Yup.object().shape({
	email: Yup.string().email('Email không hợp lệ').required('Không được bỏ trống'),
});

function ForgotPassword({ navigation }) {
	const dispatch = useDispatch();
	const sendResetPassword = useSelector((state) => state.sendResetPassword);
	const {
		loading, data, success, error,
	} = sendResetPassword;

	return (
		<Formik
			initialValues={{
				email: '',
			}}
			validationSchema={SignupSchema}
			onSubmit={(values) => {
				dispatch(passwordSendReset(values));
			}}
		>
			{({
				values, errors, touched, handleChange, setFieldTouched, handleSubmit, isValid,
			}) => (
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
							<Text style={styles.title}>Khôi phục mật khẩu</Text>
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
							<View style={styles.inputContainer}>
								<View style={styles.inputField}>
									<TextInput
										style={{
											width: '100%',
										}}
										label="Email của bạn"
										leading={(
											<Icon
												name="mail-outline"
												type="ionicon"
												size={20}
												color={COLORS.primary}
												style={{ marginRight: 5 }}
											/>
										)}
										color={COLORS.primary}
										keyboardType="email-address"
										value={values.email}
										onChangeText={handleChange('email')}
										onBlur={() => setFieldTouched('email')}
										autoCapitalize="none"
									/>
								</View>
								<View style={styles.errorContainer}>
									{touched.email && errors.email && (
										<Text style={styles.errorMessage}>{errors.email}</Text>
									)}
								</View>

							</View>

							<Button
								title="Gửi mail khôi phục mật khẩu"
								uppercase={false}
								color={COLORS.primary}
								disabled={!isValid}
								onPress={handleSubmit}
								style={styles.saveButton}
							/>
							<Divider style={{ marginBottom: SIZES.medium }} />
							<Button
								title="Quay lại"
								uppercase={false}
								variant="outlined"
								color={COLORS.black}
								onPress={() => navigation.goBack()}
								style={styles.saveButton}
							/>
						</View>
					)}
				</View>
			)}
		</Formik>
	);
}

export default ForgotPassword;
