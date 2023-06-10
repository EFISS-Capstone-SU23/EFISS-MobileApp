/* eslint-disable import/no-extraneous-dependencies */
import {
	View, Text, StyleSheet, TextInput, TouchableOpacity, Image,
} from 'react-native';
import { ActivityIndicator } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Entypo } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { FONTS, SIZES, COLORS } from '../constants';
import logo from '../assets/images/logo-no-background.png';
import { AuthContext } from '../context/AuthContext';

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
	textLink: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: SIZES.base,
	},
	text: {
		color: COLORS.tertiary,
		fontFamily: FONTS.bold,
	},
});

const SigninSchema = Yup.object().shape({
	username: Yup.string()
		.min(2, 'Quá ngắn')
		.max(50, 'Quá dài!')
		.required('Không được bỏ trống'),
	password: Yup.string()
		.min(6, 'Mật khẩu có độ dài tối thiểu 6 kí tự')
		.required('Không được bỏ trống')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/,
			'Mật khẩu không hợp lệ',
		),
});

function Login() {
	const navigation = useNavigation();
	const { isLoading, login } = useContext(AuthContext);

	if (isLoading) {
		return <ActivityIndicator style={styles.container} size="large" color={COLORS.primary} />;
	}

	return (
		<Formik
			initialValues={{
				username: '',
				password: '',
			}}
			validationSchema={SigninSchema}
			onSubmit={(values) => {
				login(values.username, values.password);
			}}
		>
			{({
				values, errors, touched, handleChange, setFieldTouched, handleSubmit, isValid,
			}) => (
				<View style={styles.container}>
					<View style={{ paddingHorizontal: 25 }}>
						<View style={{ alignItems: 'center' }}>
							<Image source={logo} style={{ width: '100%' }} resizeMode="contain" />
						</View>
						<Text style={styles.title}>Đăng nhập</Text>

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

						<TouchableOpacity
							onPress={handleSubmit}
							disabled={!isValid}
							style={
								[styles.submitBtn,
									{ backgroundColor: isValid ? COLORS.primary : COLORS.lightGray },
								]
							}
						>
							<Text style={{ color: COLORS.white, fontFamily: FONTS.bold, textAlign: 'center' }}>Đăng nhập</Text>
						</TouchableOpacity>

						<View style={styles.textLink}>
							<TouchableOpacity onPress={() => { }}>
								<Text style={styles.text}>Quên mật khẩu?</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.textLink}>
							<Text>Chưa có tài khoản?</Text>
							<TouchableOpacity onPress={() => {
								navigation.navigate('SignUp');
							}}
							>
								<Text style={{ color: COLORS.tertiary, fontFamily: FONTS.bold }}> Đăng ký</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			)}
		</Formik>
	);
}

export default Login;
