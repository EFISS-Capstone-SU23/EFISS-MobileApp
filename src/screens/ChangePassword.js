import {
	View, Text, TouchableOpacity, ScrollView,
	StyleSheet, SafeAreaView, ToastAndroid,
} from 'react-native';
import {
	ActivityIndicator, AppBar, TextInput,
} from '@react-native-material/core';
import React, { useContext, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, FONTS, SIZES } from '../constants';
import { AuthContext } from '../context/AuthContext';
import { passwordChange } from '../actions/userActions';
import { USER_CHANGE_PASSWORD_RESET } from '../constants/userConstants';

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLORS.white,
	},
	backButton: {
		position: 'absolute',
		left: 20,
		top: 10,
		padding: 10,
		backgroundColor: COLORS.white,
		borderRadius: 10,
	},
	headerTitle: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.medium,
		color: COLORS.white,
		marginLeft: 12,
	},
	inputField: {
		flexDirection: 'column',
	},
	inputTitle: {
		fontFamily: FONTS.bold,
		color: COLORS.black,
	},
	textInputContainer: {
		width: '100%',
		justifyContent: 'center',
		backgroundColor: COLORS.white,
	},
	saveButton: {
		backgroundColor: COLORS.primary,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: SIZES.base,
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
	loadingIndicator: {
		flex: 1, // Take full height
		alignSelf: 'stretch', // Stretch to fill the parent container horizontally
		justifyContent: 'center',
		alignItems: 'center',
		height: SIZES.HEIGHT,
	},
});

const ChangePasswordSchema = Yup.object().shape({
	oldPassword: Yup.string()
		.min(6, 'Mật khẩu có độ dài tối thiểu 6 kí tự')
		.required('Không được bỏ trống')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/,
			'Mật khẩu không hợp lệ',
		),
	newPassword: Yup.string()
		.min(6, 'Mật khẩu có độ dài tối thiểu 6 kí tự')
		.required('Không được bỏ trống')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/,
			'Mật khẩu không hợp lệ',
		),
	confirmNewPassword: Yup.string()
		.min(6, 'Mật khẩu có độ dài tối thiểu 6 kí tự')
		.required('Không được bỏ trống')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/,
			'Mật khẩu không hợp lệ',
		)
		.oneOf([Yup.ref('newPassword')], 'Mật khẩu không khớp, vui lòng kiểm tra lại'),
});

function ChangePassword({ navigation }) {
	const dispatch = useDispatch();
	const { userToken } = useContext(AuthContext);
	const changePassword = useSelector((state) => state.changePassword);
	const { loading, success, error } = changePassword;

	useEffect(() => {
		if (success) {
			dispatch({ type: USER_CHANGE_PASSWORD_RESET });
			navigation.goBack();
		}
	}, [dispatch, success]);

	useEffect(() => {
		if (error) {
			ToastAndroid.show(
				error.response.data.message,
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
		}
	}, [error]);

	return (
		<Formik
			initialValues={{
				oldPassword: '',
				newPassword: '',
				confirmNewPassword: '',
			}}
			validationSchema={ChangePasswordSchema}
			onSubmit={(values) => {
				dispatch(passwordChange(userToken, values));
			}}
		>
			{({
				values, errors, touched, handleChange, setFieldTouched, handleSubmit, isValid,
			}) => (
				<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
					<AppBar title="Chỉnh sửa hồ sơ cá nhân" style={styles.header} titleStyle={{ color: COLORS.primary, textAlign: 'center' }} />

					<ScrollView>
						{loading ? (
							<View style={styles.loadingIndicator}>
								<ActivityIndicator size="large" color={COLORS.primary} />
							</View>
						) : (
							<View style={{ marginHorizontal: 22, marginTop: 22 }}>
								<View style={styles.inputField}>
									<Text style={styles.inputTitle}>Mật khẩu hiện tại</Text>
									<View style={styles.textInputContainer}>
										<TextInput
											placeholder="Mật khẩu hiện tại"
											style={{ flex: 1, paddingVertical: 0 }}
											color={COLORS.primary}
											value={values.oldPassword}
											onChangeText={handleChange('oldPassword')}
											onBlur={() => setFieldTouched('oldPassword')}
											secureTextEntry
										/>
									</View>
									<View style={styles.errorContainer}>
										{touched.oldPassword && errors.oldPassword && (
											<Text style={styles.errorMessage}>{errors.oldPassword}</Text>
										)}
									</View>
								</View>

								<View style={styles.inputField}>
									<Text style={styles.inputTitle}>Mật khẩu mới</Text>
									<View style={styles.textInputContainer}>
										<TextInput
											placeholder="Mật khẩu mới"
											style={{ flex: 1, paddingVertical: 0 }}
											color={COLORS.primary}
											value={values.newPassword}
											onChangeText={handleChange('newPassword')}
											onBlur={() => setFieldTouched('newPassword')}
											secureTextEntry
										/>
									</View>
									<View style={styles.errorContainer}>
										{touched.newPassword && errors.newPassword && (
											<Text style={styles.errorMessage}>{errors.newPassword}</Text>
										)}
									</View>
								</View>

								<View style={styles.inputField}>
									<Text style={styles.inputTitle}>Nhập lại mật khẩu mới</Text>
									<View style={styles.textInputContainer}>
										<TextInput
											placeholder="Nhập lại mật khẩu mới"
											style={{ flex: 1, paddingVertical: 0 }}
											color={COLORS.primary}
											value={values.confirmNewPassword}
											onChangeText={handleChange('confirmNewPassword')}
											onBlur={() => setFieldTouched('confirmNewPassword')}
											secureTextEntry
										/>
									</View>
									<View style={styles.errorContainer}>
										{touched.confirmNewPassword && errors.confirmNewPassword && (
											<Text style={styles.errorMessage}>{errors.confirmNewPassword}</Text>
										)}
									</View>
								</View>

								<TouchableOpacity
									style={styles.saveButton}
									onPress={handleSubmit}
									disabled={!isValid}
								>
									<Text style={{ color: COLORS.white, fontFamily: FONTS.bold }}>
										Lưu thay đổi
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => navigation.goBack()}
									style={{
										height: 44,
										alignItems: 'center',
										justifyContent: 'center',
										marginTop: 10,
									}}
								>
									<Text style={{ color: COLORS.black, fontFamily: FONTS.bold }}>
										Quay lại
									</Text>
								</TouchableOpacity>
							</View>
						)}
					</ScrollView>
				</SafeAreaView>
			)}
		</Formik>
	);
}

export default ChangePassword;
