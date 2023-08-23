/* eslint-disable import/no-extraneous-dependencies */
import {
	View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import {
	Button, TextInput, Divider, ActivityIndicator,
} from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@rneui/themed';

import { FONTS, SIZES, COLORS } from '../constants';
import logo from '../assets/images/logo.png';
import { AuthContext } from '../context/AuthContext';

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
		borderRadius: SIZES.base,
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
		justifyContent: 'center',
		marginBottom: SIZES.extraLarge,
	},
	textLink: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: SIZES.base,
	},
	text: {
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
	const { login } = useContext(AuthContext);
	const userSignin = useSelector((state) => state.userSignin);
	const { success, error, loading } = userSignin;

	if (loading) {
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
							<Image source={logo} style={{ width: SIZES.WIDTH / 2, height: SIZES.WIDTH / 2 }} resizeMode="contain" />
						</View>
						<Text style={styles.title}>Đăng nhập</Text>
						{success === false && (
							<View style={styles.errorContainer}>
								<Text style={styles.errorMessage}>{error.toString()}</Text>
							</View>
						)}
						<View style={styles.inputContainer}>
							<View style={styles.inputField}>
								<TextInput
									style={{
										width: '100%',
									}}
									label="Tên đăng nhập"
									leading={(
										<Icon
											name="information-circle-outline"
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

						<Button
							title="Đăng nhập"
							uppercase={false}
							onPress={handleSubmit}
							disabled={!isValid}
							color={COLORS.primary}
							style={styles.submitBtn}
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
							style={styles.submitBtn}
							titleStyle={{
								fontFamily: FONTS.medium,
							}}
						/>

						<View style={styles.textLink}>
							<TouchableOpacity onPress={() => { navigation.navigate('ForgotPassword'); }}>
								<Text style={styles.text}>Quên mật khẩu?</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.textLink}>
							<Text style={{ fontFamily: FONTS.light }}>Chưa có tài khoản?</Text>
							<TouchableOpacity onPress={() => {
								navigation.navigate('SignUp');
							}}
							>
								<Text style={{ fontFamily: FONTS.bold }}> Đăng ký</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			)}
		</Formik>
	);
}

export default Login;
