import React from 'react';
import { useDispatch } from 'react-redux';
import {
	View,
	StyleSheet,
	SafeAreaView,
} from 'react-native';
import {
	TextInput, Text, Button,
} from '@react-native-material/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { COLORS, SIZES } from '../../constants';
import { collectionsAdd } from '../../actions/productActions';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal: {
		width: '80%',
		backgroundColor: COLORS.white,
		paddingVertical: SIZES.medium,
		paddingHorizontal: SIZES.font,
		justifyContent: 'space-between',
		flexDirection: 'column',
		zIndex: 1,
		borderRadius: 10,
	},
	inputTitle: {
		marginBottom: SIZES.medium,
	},
	inputField: {
		marginBottom: SIZES.medium,
	},
	errorContainer: {
		height: SIZES.extraLarge,
	},
	saveButton: {
		marginVertical: SIZES.base,
	},
});

const AddCollectionSchema = Yup.object().shape({
	title: Yup.string()
		.required('Không được bỏ trống')
		.max(100, 'Mô tả ngắn gọn dưới 100 kí tự'),
});

function ModalAddCollection({ changeModalVisibility }) {
	const dispatch = useDispatch();

	return (
		<SafeAreaView style={styles.container}>
			<Formik
				initialValues={{
					title: '',
				}}
				validationSchema={AddCollectionSchema}
				onSubmit={(values) => {
					dispatch(collectionsAdd(values.title.toString()));
				}}
			>
				{({
					values, handleChange, setFieldTouched, handleSubmit, isValid,
				}) => (
					<View style={styles.modal}>
						<View style={styles.inputField}>
							<Text style={styles.inputTitle}>Tên bộ sưu tập mới (dưới 100 kí tự)</Text>
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
