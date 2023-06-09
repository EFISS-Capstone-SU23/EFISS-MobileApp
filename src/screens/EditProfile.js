import {
	View, Text, TouchableOpacity, Image, TextInput,
	StyleSheet, SafeAreaView, ActivityIndicator, ToastAndroid,
} from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { AuthContext } from '../context/AuthContext';
import { updateUserProfile } from '../actions/userActions';
import {
	COLORS, FONTS, SIZES, assets,
} from '../constants';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: COLORS.primary,
		padding: 20,
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
		height: 170,
		width: 170,
		borderRadius: 85,
		borderWidth: 2,
		borderColor: COLORS.primary,
		resizeMode: 'contain',
	},
	cameraIcon: {
		position: 'absolute',
		bottom: 0,
		right: 10,
		zIndex: 9999,
	},
	inputField: {
		flexDirection: 'column',
		marginBottom: SIZES.base,
	},
	inputTitle: {
		fontFamily: FONTS.bold,
		color: COLORS.primary,
	},
	textInputContainer: {
		height: 44,
		width: '100%',
		borderColor: COLORS.lightGray,
		borderWidth: 1,
		borderRadius: 4,
		paddingHorizontal: 12,
		paddingVertical: 6,
		justifyContent: 'center',
		backgroundColor: COLORS.white,
	},
	saveButton: {
		backgroundColor: COLORS.primary,
		height: 44,
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: SIZES.extraLarge,
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
	const { userToken } = useContext(AuthContext);
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
				dispatch(updateUserProfile(userToken, values));
			}}
		>
			{({
				values, errors, touched, handleChange, setFieldTouched, handleSubmit, isValid,
			}) => (
				// eslint-disable-next-line react/self-closing-comp
				<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.secondary }}>
					<View style={styles.header}>
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={styles.backButton}
						>
							<MaterialIcons
								name="keyboard-arrow-left"
								size={24}
								color={COLORS.primary}
							/>
						</TouchableOpacity>

						<Text style={styles.headerTitle}>
							Chỉnh sửa hồ sơ cá nhân
						</Text>
					</View>
					{loading ? (
						<View style={styles.loadingIndicator}>
							<ActivityIndicator size="large" color={COLORS.primary} />
						</View>
					) : (
						<ScrollView>

							<View style={{ alignItems: 'center', marginVertical: 22 }}>
								<View>
									<Image
										source={assets.avatar}
										style={styles.avatar}
									/>
								</View>
							</View>

							<View style={{ marginHorizontal: 22 }}>
								<View style={styles.inputField}>
									<Text style={styles.inputTitle}>Họ và tên đệm:</Text>
									<View style={styles.textInputContainer}>
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

								<View style={styles.inputField}>
									<Text style={styles.inputTitle}>Tên của bạn:</Text>
									<View style={styles.textInputContainer}>
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

								<TouchableOpacity
									disabled={!isValid}
									style={styles.saveButton}
									onPress={handleSubmit}
								>
									<Text style={{ color: COLORS.white }}>
										Lưu thay đổi
									</Text>
								</TouchableOpacity>

							</View>

						</ScrollView>
					)}
				</SafeAreaView>
			)}
		</Formik>
	);
}

export default EditProfile;
