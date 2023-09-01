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
import { sendBugReport } from '../actions/userActions';
import { USER_REPORT_BUG_RESET } from '../constants/userConstants';

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
		fontFamily: FONTS.semiBold,
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

const BugReportSchema = Yup.object().shape({
	title: Yup.string()
		.required('Không được bỏ trống'),
	content: Yup.string()
		.max(500, 'Mô tả ngắn gọn dưới 500 kí tự')
		.required('Không được bỏ trống'),
});

function BugReport({ navigation }) {
	const dispatch = useDispatch();

	const reportBug = useSelector((state) => state.reportBug);
	const {
		loading, success, error, response,
	} = reportBug;

	useEffect(() => {
		if (success) {
			ToastAndroid.show(
				response.message,
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
			dispatch({ type: USER_REPORT_BUG_RESET });
			navigation.goBack();
		}
	}, [dispatch, success]);

	useEffect(() => {
		if (error) {
			ToastAndroid.show(
				error,
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
		}
	}, [error]);

	return (
		<Formik
			initialValues={{
				title: '',
				content: '',
			}}
			validationSchema={BugReportSchema}
			onSubmit={(values) => {
				dispatch(sendBugReport(values));
			}}
		>
			{({
				values, errors, touched, handleChange, setFieldTouched, handleSubmit, isValid,
			}) => (
				<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
					<AppBar
						title="Báo cáo lỗi"
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
									<Text style={styles.inputTitle}>Tiêu đề</Text>
									<View style={styles.textInputContainer}>
										<TextInput
											placeholder="Tiêu đề"
											style={{ flex: 1, paddingVertical: 0 }}
											color={COLORS.primary}
											value={values.title}
											onChangeText={handleChange('title')}
											onBlur={() => setFieldTouched('title')}
										/>
									</View>
									<View style={styles.errorContainer}>
										{touched.title && errors.title && (
											<Text variant="caption" color={COLORS.red}>{errors.title}</Text>
										)}
									</View>
								</View>

								<View style={styles.inputField}>
									<Text style={styles.inputTitle}>Mô tả chi tiết</Text>
									<View style={styles.textInputContainer}>
										<TextInput
											placeholder="Mô tả chi tiết"
											style={{ flex: 1, paddingVertical: 0 }}
											color={COLORS.primary}
											value={values.content}
											onChangeText={handleChange('content')}
											onBlur={() => setFieldTouched('content')}
											multiline
											numberOfLines={15}
										/>
									</View>
									<View style={styles.errorContainer}>
										{touched.content && errors.content && (
											<Text variant="caption" color={COLORS.red}>{errors.content}</Text>
										)}
									</View>
								</View>

								<Button
									title="Gửi báo cáo"
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

export default BugReport;
