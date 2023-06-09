/* eslint-disable import/no-extraneous-dependencies */
import {
	View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { FONTS, SIZES, COLORS } from '../constants';
import logo from '../assets/images/logo-no-background.png';
import { register } from '../actions/userActions';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.secondary,
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
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		backgroundColor: COLORS.white,
		borderRadius: SIZES.base,
		paddingVertical: SIZES.font,
		paddingHorizontal: SIZES.font,
	},
	errorContainer: {
		marginTop: 5,
		height: SIZES.extraLarge,
	},
	errorMessage: {
		color: COLORS.red,
		fontSize: 10,
	},
	submitBtn: {
		padding: 20,
		borderRadius: 10,
		marginBottom: 30,
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
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/,
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
									<Image source={logo} style={{ width: '100%' }} resizeMode="contain" />
								</View>
								<Text style={styles.title}>Đăng ký</Text>
								<View style={styles.inputContainer}>
									<View style={styles.inputField}>
										<Entypo name="email" size={20} color={COLORS.primary} style={{ marginRight: 5 }} />
										<TextInput
											placeholder="Email của bạn"
											style={{ flex: 1, paddingVertical: 0 }}
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
										<Entypo name="user" size={20} color={COLORS.primary} style={{ marginRight: 5 }} />
										<TextInput
											placeholder="Tên đăng nhập"
											style={{ flex: 1, paddingVertical: 0 }}
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
										<Entypo name="text-document" size={20} color={COLORS.primary} style={{ marginRight: 5 }} />
										<TextInput
											placeholder="Họ và tên đệm"
											style={{ flex: 1, paddingVertical: 0 }}
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
										<Entypo name="text-document-inverted" size={20} color={COLORS.primary} style={{ marginRight: 5 }} />
										<TextInput
											placeholder="Tên của bạn"
											style={{ flex: 1, paddingVertical: 0 }}
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
										<Entypo name="key" size={20} color={COLORS.primary} style={{ marginRight: 5 }} />
										<TextInput
											placeholder="Mật khẩu"
											style={{ flex: 1, paddingVertical: 0 }}
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
										<Entypo name="flag" size={20} color={COLORS.primary} style={{ marginRight: 5 }} />
										<TextInput
											placeholder="Nhập lại mật khẩu"
											style={{ flex: 1, paddingVertical: 0 }}
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

								<TouchableOpacity
									onPress={handleSubmit}
									disabled={!isValid || loading}
									style={
										[styles.submitBtn,
											{ backgroundColor: isValid ? COLORS.primary : COLORS.lightGray },
										]
									}
								>
									<Text style={{ color: COLORS.white, fontFamily: FONTS.bold, textAlign: 'center' }}>Đăng ký</Text>
								</TouchableOpacity>

								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<TouchableOpacity onPress={() => navigation.goBack()}>
										<Text style={{ color: COLORS.tertiary, fontFamily: FONTS.bold }}>Quay lại</Text>
									</TouchableOpacity>
								</View>
							</View>
						)}
					</View>
				</ScrollView>
			)}
		</Formik>
	);
}

export default SignUp;
