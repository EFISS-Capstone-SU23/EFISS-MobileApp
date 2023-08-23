import React from 'react';
import { useDispatch } from 'react-redux';
import {
	View,
	StyleSheet,
	SafeAreaView,
	Modal,
} from 'react-native';
import {
	TextInput, Text, Button,
} from '@react-native-material/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { COLORS, SIZES, FONTS } from '../../constants';
import { collectionsUpdate } from '../../actions/productActions';

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
		fontFamily: FONTS.medium,
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

function ModalUpdateCollection({ onClose, name, id }) {
	const dispatch = useDispatch();

	return (
		<Modal
			visible
			transparent
			animationType="fade"
		>
			<SafeAreaView style={styles.container}>
				<Formik
					initialValues={{
						title: name,
					}}
					validationSchema={AddCollectionSchema}
					onSubmit={(values) => {
						dispatch(collectionsUpdate(values.title.toString(), id));
					}}
				>
					{({
						values, handleChange, setFieldTouched, handleSubmit, isValid,
					}) => (
						<View style={styles.modal}>
							<View style={styles.inputField}>
								<Text style={styles.inputTitle}>Nhập tên mới (dưới 100 kí tự)</Text>
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
								title="Cập nhật"
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
							<Button
								title="Hủy"
								uppercase={false}
								variant="outlined"
								color={COLORS.black}
								onPress={onClose}
								style={styles.saveButton}
								titleStyle={{
									fontFamily: FONTS.medium,
								}}
							/>

						</View>
					)}
				</Formik>
			</SafeAreaView>
		</Modal>
	);
}

export default ModalUpdateCollection;
