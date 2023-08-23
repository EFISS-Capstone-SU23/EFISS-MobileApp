import {
	View, ScrollView, ToastAndroid,
	StyleSheet, SafeAreaView,
} from 'react-native';
import {
	ActivityIndicator, AppBar, TextInput,
	Text, Button, Divider,
} from '@react-native-material/core';
import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, FONTS, SIZES } from '../constants';
import { passwordChange } from '../actions/userActions';
import { USER_CHANGE_PASSWORD_RESET } from '../constants/userConstants';

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLORS.primary,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
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
		marginBottom: 5,
	},
	textInputContainer: {
		width: '100%',
		justifyContent: 'center',
		backgroundColor: COLORS.white,
	},
	saveButton: {
		marginBottom: SIZES.medium,
		borderRadius: SIZES.base,
		justifyContent: 'center',
	},
	errorContainer: {
		height: SIZES.extraLarge,
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
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,32}$/,
			'Mật khẩu tối đa 32 kí tự, gồm các chữ cái viết thường, ít nhất 1 kí tự viết hoa và 1 chữ số',
		),
	newPassword: Yup.string()
		.min(6, 'Mật khẩu có độ dài tối thiểu 6 kí tự')
		.required('Không được bỏ trống')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,32}$/,
			'Mật khẩu tối đa 32 kí tự, gồm các chữ cái viết thường, ít nhất 1 kí tự viết hoa và 1 chữ số',
		),
	confirmNewPassword: Yup.string()
		.min(6, 'Mật khẩu có độ dài tối thiểu 6 kí tự')
		.required('Không được bỏ trống')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,32}$/,
			'Mật khẩu tối đa 32 kí tự, gồm các chữ cái viết thường, ít nhất 1 kí tự viết hoa và 1 chữ số',
		)
		.oneOf([Yup.ref('newPassword')], 'Mật khẩu không khớp, vui lòng kiểm tra lại'),
});

function ChangePassword({ navigation }) {
	const dispatch = useDispatch();

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
				dispatch(passwordChange(values));
			}}
		>
			{({
				values, errors, touched, handleChange, setFieldTouched, handleSubmit, isValid,
			}) => (
				<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
					<AppBar
						title="Đổi mật khẩu"
						style={styles.header}
						titleStyle={{
							color: COLORS.secondary,
							textAlign: 'center',
							fontFamily: FONTS.medium,
						}}
					/>
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
											<Text variant="caption" color={COLORS.red}>{errors.oldPassword}</Text>
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
											<Text variant="caption" color={COLORS.red}>{errors.newPassword}</Text>
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
											<Text variant="caption" color={COLORS.red}>{errors.confirmNewPassword}</Text>
										)}
									</View>
								</View>

								<Button
									title="Lưu thay đổi"
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
					</ScrollView>
				</SafeAreaView>
			)}
		</Formik>
	);
}

export default ChangePassword;
