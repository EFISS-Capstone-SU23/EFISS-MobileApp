/* eslint-disable import/no-extraneous-dependencies */
import {
	View, ScrollView, StyleSheet, Image,
} from 'react-native';
import {
	ActivityIndicator, TextInput, Button, Divider, Text,
} from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@rneui/themed';

import { FONTS, SIZES, COLORS } from '../constants';
import logo from '../assets/images/logo.png';
import { register } from '../actions/userActions';

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
	firstName: Yup.string()
		.max(50, 'Quá dài!')
		.required('Không được bỏ trống'),
	lastName: Yup.string()
		.max(50, 'Quá dài!')
		.required('Không được bỏ trống'),
	email: Yup.string().email('Email không hợp lệ').required('Không được bỏ trống'),
	username: Yup.string()
		.min(2, 'Quá ngắn')
		.max(50, 'Quá dài!')
		.required('Không được bỏ trống'),
	password: Yup.string()
		.min(6, 'Mật khẩu có độ dài tối thiểu 6 kí tự')
		.required('Không được bỏ trống')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,32}$/,
			'Mật khẩu tối đa 32 kí tự, gồm các chữ cái viết thường, ít nhất 1 kí tự viết hoa và 1 chữ số',
		),
	confirmPassword: Yup.string()
		.min(6, 'Mật khẩu có độ dài tối thiểu 6 kí tự')
		.required('Không được bỏ trống')
		.oneOf([Yup.ref('password')], 'Mật khẩu không khớp, vui lòng kiểm tra lại'),
});

function SignUp({ navigation }) {
	const dispatch = useDispatch();
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, userInfo } = userRegister;

	const [isWaiting, setIsWaiting] = useState(false);

	// If user pressed the submit button and
	// the registration completed successfully,
	// return to login screen
	useEffect(() => {
		if (userInfo && isWaiting) {
			setIsWaiting(false);
			navigation.goBack();
		}
	}, [userInfo]);

	return (
		<Formik
			initialValues={{
				firstName: '',
				lastName: '',
				email: '',
				username: '',
				password: '',
				confirmPassword: '',
			}}
			validationSchema={SignupSchema}
			onSubmit={(values) => {
				setIsWaiting(true);
				dispatch(register(values));
			}}
		>
			{({
				values, errors, touched, handleChange, setFieldTouched, handleSubmit, isValid,
			}) => (
				<ScrollView>
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
								<Text style={styles.title}>Đăng ký</Text>
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

								<View style={styles.inputContainer}>
									<View style={styles.inputField}>
										<TextInput
											style={{
												width: '100%',
											}}
											label="Tên đăng nhập"
											leading={(
												<Icon
													name="text-outline"
													type="ionicon"
													size={20}
													color={COLORS.primary}
													style={{ marginRight: 5 }}
												/>
											)}
											color={COLORS.primary}
											value={values.username}
											onChangeText={handleChange('username')}
											onBlur={() => setFieldTouched('username')}
											autoCapitalize="none"
										/>
									</View>
									<View style={styles.errorContainer}>
										{touched.username && errors.username && (
											<Text style={styles.errorMessage}>{errors.username}</Text>
										)}
									</View>
								</View>

								<View style={styles.inputContainer}>
									<View style={styles.inputField}>
										<TextInput
											style={{
												width: '100%',
											}}
											label="Họ và tên đệm"
											leading={(
												<Icon
													name="reader"
													type="ionicon"
													size={20}
													color={COLORS.primary}
													style={{ marginRight: 5 }}
												/>
											)}
											color={COLORS.primary}
											value={values.lastName}
											onChangeText={handleChange('lastName')}
											onBlur={() => setFieldTouched('lastName')}
										/>
									</View>
									<View style={styles.errorContainer}>
										{touched.lastName && errors.lastName && (
											<Text style={styles.errorMessage}>{errors.lastName}</Text>
										)}
									</View>
								</View>

								<View style={styles.inputContainer}>
									<View style={styles.inputField}>
										<TextInput
											style={{
												width: '100%',
											}}
											label="Tên của bạn"
											leading={(
												<Icon
													name="reader-outline"
													type="ionicon"
													size={20}
													color={COLORS.primary}
													style={{ marginRight: 5 }}
												/>
											)}
											color={COLORS.primary}
											value={values.firstName}
											onChangeText={handleChange('firstName')}
											onBlur={() => setFieldTouched('firstName')}
										/>
									</View>
									<View style={styles.errorContainer}>
										{touched.firstName && errors.firstName && (
											<Text style={styles.errorMessage}>{errors.firstName}</Text>
										)}
									</View>
								</View>

								<View style={styles.inputContainer}>
									<View style={styles.inputField}>
										<TextInput
											style={{
												width: '100%',
											}}
											label="Mật khẩu"
											leading={(
												<Icon
													name="keypad-outline"
													type="ionicon"
													size={20}
													color={COLORS.primary}
													style={{ marginRight: 5 }}
												/>
											)}
											color={COLORS.primary}
											value={values.password}
											onChangeText={handleChange('password')}
											onBlur={() => setFieldTouched('password')}
											secureTextEntry
										/>
									</View>
									<View style={styles.errorContainer}>
										{touched.password && errors.password && (
											<Text style={styles.errorMessage}>{errors.password}</Text>
										)}
									</View>
								</View>

								<View style={styles.inputContainer}>
									<View style={styles.inputField}>
										<TextInput
											style={{
												width: '100%',
											}}
											label="Nhập lại mật khẩu"
											leading={(
												<Icon
													name="apps-outline"
													type="ionicon"
													size={20}
													color={COLORS.primary}
													style={{ marginRight: 5 }}
												/>
											)}
											color={COLORS.primary}
											value={values.confirmPassword}
											onChangeText={handleChange('confirmPassword')}
											onBlur={() => setFieldTouched('confirmPassword')}
											secureTextEntry
										/>
									</View>
									<View style={styles.errorContainer}>
										{touched.confirmPassword && errors.confirmPassword && (
											<Text style={styles.errorMessage}>{errors.confirmPassword}</Text>
										)}
									</View>
								</View>

								<Button
									title="Đăng ký"
									uppercase={false}
									color={COLORS.primary}
									disabled={!isValid}
									onPress={handleSubmit}
									style={styles.saveButton}
									titleStyle={{
										color: COLORS.secondary,
										fontFamily: FONTS.medium,
									}}
								/>
								<Divider style={{ marginBottom: SIZES.medium }} />
								<Button
									title="Quay lại"
									uppercase={false}
									variant="outlined"
									color={COLORS.black}
									onPress={() => navigation.goBack()}
									style={styles.saveButton}
									titleStyle={{
										fontFamily: FONTS.medium,
									}}
								/>
							</View>
						)}
					</View>
				</ScrollView>
			)}
		</Formik>
	);
}

export default SignUp;
