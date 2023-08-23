import React, { useState } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	View,
	Text,
} from 'react-native';
import { Button, Divider } from '@react-native-material/core';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import {
	COLORS, FONTS, SHADOWS, SIZES,
} from '../../constants';
import { collectionDetailsAdd } from '../../actions/productActions';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(52, 52, 52, 0.6)',
		padding: SIZES.extraLarge,
	},
	modal: {
		width: '80%',
		backgroundColor: COLORS.white,
		paddingVertical: SIZES.medium,
		paddingHorizontal: SIZES.font,
		flexDirection: 'column',
		zIndex: 1,
		maxHeight: '50%',
		...SHADOWS.dark,
		borderRadius: 10,
	},
	inputTitle: {
		marginBottom: SIZES.medium,
		fontFamily: FONTS.bold,
		fontSize: SIZES.medium,
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

function ModalAddToCollection({ collections, onClose, productId }) {
	const dispatch = useDispatch();

	const convertedList = collections.map(({ id, name }) => ({
		value: id,
		label: name,
	}));

	const [value, setValue] = useState(convertedList[0].value);

	const handleAddToCollection = () => {
		dispatch(collectionDetailsAdd(value, productId));
		onClose();
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.modal}>
				<Text style={styles.inputTitle}>Chọn 1 bộ sưu tập</Text>
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={{
						marginBottom: 10,
					}}
				>
					<RadioForm>
						{
							convertedList.map((obj, index) => (
								<RadioButton labelHorizontal key={index}>
									<RadioButtonInput
										obj={obj}
										index={index}
										isSelected={obj.value === value}
										onPress={(val) => setValue(val)}
										buttonInnerColor={COLORS.primary}
										buttonOuterColor={COLORS.primary}
										buttonWrapStyle={{ marginRight: 16 }}
									/>
									<RadioButtonLabel
										obj={obj}
										index={index}
										onPress={(val) => setValue(val)}
										labelStyle={{
											fontFamily: FONTS.medium,
										}}
									/>
								</RadioButton>
							))
						}
					</RadioForm>
				</ScrollView>
				<Button
					title="Thêm vào bộ sưu tập"
					uppercase={false}
					color={COLORS.primary}
					style={styles.saveButton}
					onPress={handleAddToCollection}
					titleStyle={{
						color: COLORS.secondary,
						fontFamily: FONTS.medium,
					}}
				/>
				<Divider style={{ marginVertical: 5 }} />
				<Button
					title="Hủy"
					uppercase={false}
					variant="outlined"
					color={COLORS.black}
					style={styles.saveButton}
					onPress={onClose}
					titleStyle={{
						fontFamily: FONTS.medium,
					}}
				/>
			</View>
		</SafeAreaView>
	);
}

export default ModalAddToCollection;
