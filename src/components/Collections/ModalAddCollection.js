import React from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
} from 'react-native';
import {
	TextInput, Text, Button, Divider,
} from '@react-native-material/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal: {
		width: '80%',
		backgroundColor: COLORS.white,
		borderColor: COLORS.primary,
		borderWidth: 0.1,
		paddingVertical: SIZES.base,
		paddingHorizontal: SIZES.font,
		justifyContent: 'space-between',
		flexDirection: 'column',
		zIndex: 1,
	},
	inputField: {
		marginBottom: SIZES.medium,
	},
	errorContainer: {
		height: SIZES.extraLarge,
	},
});

const AddCollectionSchema = Yup.object().shape({
	title: Yup.string()
		.required('Không được bỏ trống')
		.max(100, 'Mô tả ngắn gọn dưới 100 kí tự'),
});

function ModalAddCollection({ changeModalVisibility }) {
	return (
		<SafeAreaView style={styles.container}>
			<Formik
				initialValues={{
					title: '',
				}}
				validationSchema={AddCollectionSchema}
				onSubmit={(values) => {
					console.log(`Thêm bộ sưu tập ${values.title.toString()}`);
					// add new collection
				}}
			>
				{({
					values, handleChange, setFieldTouched, handleSubmit, isValid,
				}) => (
					<View style={styles.modal}>
						<View style={styles.inputField}>
							<Text style={styles.inputTitle}>Tên bộ sưu tập (dưới 100 kí tự)</Text>
							<View style={styles.textInputContainer}>
								<TextInput
									placeholder="Tên bộ sưu tập"
									color={COLORS.primary}
									value={values.title}
									onChangeText={handleChange('title')}
									onBlur={() => setFieldTouched('title')}
								/>
							</View>
						</View>

						<Button
							title="Tạo mới"
							color={COLORS.primary}
							disabled={!isValid}
							onPress={handleSubmit}
							style={styles.saveButton}
						/>
						<Divider style={{ marginBottom: SIZES.medium }} />
						<Button
							title="Hủy"
							variant="outlined"
							color={COLORS.black}
							onPress={() => changeModalVisibility(false)}
							style={styles.saveButton}
						/>

					</View>
				)}
			</Formik>
		</SafeAreaView>
	);
}

export default ModalAddCollection;
