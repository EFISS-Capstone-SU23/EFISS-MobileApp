import {
	View, ToastAndroid,
	StyleSheet, SafeAreaView,
} from 'react-native';
import {
	ActivityIndicator, AppBar, Avatar,
	Button, Text, Divider, TextInput,
} from '@react-native-material/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { updateUserProfile } from '../actions/userActions';
import {
	COLORS, FONTS, SIZES,
} from '../constants';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

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
	avatar: {
		width: 120,
		height: 120,
		borderRadius: 60,
		borderColor: COLORS.primary,
		borderWidth: 1,
		resizeMode: 'contain',
		backgroundColor: COLORS.primary,
	},
	cameraIcon: {
		position: 'absolute',
		bottom: 0,
		right: 10,
		zIndex: 9999,
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
		marginBottom: SIZES.medium,
		borderRadius: SIZES.base,
		justifyContent: 'center',
	},
	errorContainer: {
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

const EditProfileSchema = Yup.object().shape({
	firstName: Yup.string()
		.max(50, 'Quá dài!')
		.required('Không được bỏ trống'),
	lastName: Yup.string()
		.max(50, 'Quá dài!')
		.required('Không được bỏ trống'),
});

function EditProfile({ navigation }) {
	const dispatch = useDispatch();

	// get the user information
	const userLoadProfile = useSelector((state) => state.userLoadProfile);
	const { userInfo } = userLoadProfile;

	// if the user update success, return to the previous screen
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { loading, success, error } = userUpdateProfile;
	useEffect(() => {
		if (success) {
			dispatch({ type: USER_UPDATE_PROFILE_RESET });
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
				firstName: userInfo.firstName,
				lastName: userInfo.lastName,
			}}
			validationSchema={EditProfileSchema}
			onSubmit={(values) => {
				dispatch(updateUserProfile(values));
			}}
		>
			{({
				values, errors, touched, handleChange, setFieldTouched, handleSubmit, isValid,
			}) => (
				// eslint-disable-next-line react/self-closing-comp
				<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
					<AppBar title="Chỉnh sửa hồ sơ cá nhân" style={styles.header} titleStyle={{ color: COLORS.primary, textAlign: 'center' }} />
					{loading ? (
						<View style={styles.loadingIndicator}>
							<ActivityIndicator size="large" color={COLORS.primary} />
						</View>
					) : (
						<ScrollView>

							<View style={{ alignItems: 'center', marginVertical: 22 }}>
								<Avatar label={`${userInfo?.lastName} ${userInfo?.firstName}`} style={styles.avatar} />
							</View>

							<View style={{ marginHorizontal: 22 }}>
								<View style={styles.inputField}>
									<Text style={styles.inputTitle}>Họ và tên đệm:</Text>
									<View style={styles.textInputContainer}>
										<TextInput
											placeholder="Họ và tên đệm"
											style={{ flex: 1, paddingVertical: 0 }}
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

								<View style={styles.inputField}>
									<Text style={styles.inputTitle}>Tên của bạn:</Text>
									<View style={styles.textInputContainer}>
										<TextInput
											placeholder="Tên của bạn"
											style={{ flex: 1, paddingVertical: 0 }}
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

								<Button
									title="Lưu thay đổi"
									color={COLORS.primary}
									disabled={!isValid}
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

						</ScrollView>
					)}
				</SafeAreaView>
			)}
		</Formik>
	);
}

export default EditProfile;
