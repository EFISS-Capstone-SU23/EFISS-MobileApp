import {
	View, Text, StyleSheet, TextInput,
	SafeAreaView, TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
	Button, Divider,
} from '@react-native-material/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@rneui/themed';
// eslint-disable-next-line import/no-extraneous-dependencies
import Slider from '@react-native-community/slider';
// eslint-disable-next-line import/no-extraneous-dependencies
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import {
	COLORS, FONTS, SIZES, SHADOWS,
} from '../../constants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(52, 52, 52, 0.6)',
		padding: SIZES.extraLarge,
	},
	modal: {
		width: '99%',
		backgroundColor: COLORS.white,
		paddingVertical: SIZES.medium,
		paddingHorizontal: SIZES.font,
		flexDirection: 'column',
		zIndex: 1,
		...SHADOWS.dark,
		borderRadius: 10,
	},
	button: {
		marginRight: 10,
		backgroundColor: COLORS.white,
		borderRadius: 20,
		color: COLORS.primary,
		padding: 12,
	},
	text: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.extraLarge,
		color: COLORS.white,
		textAlign: 'center',
	},
	dropdownItem: {
		paddingHorizontal: SIZES.base,
		fontSize: SIZES.medium,
		paddingVertical: 2,
	},
	dropdownText: {
		fontFamily: FONTS.regular,
		fontSize: SIZES.medium,
	},
	inputFilterContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputFilter: {
		marginBottom: 5,
		flex: 1,
		backgroundColor: '#F2F2F2',
		height: 40,
		borderRadius: 5,
		paddingHorizontal: 10,
		fontFamily: FONTS.regular,
	},
	closeButton: {
		position: 'absolute',
		top: 2,
		right: 2,
		zIndex: 1, // To make the button appear above the modal content
	},
});

function ModalResultsFilter({
	convertedList, onClose, onSubmit,
	value, setValue,
	diversity, setDiversity,
	minPrice, setMinPrice,
	maxPrice, setMaxPrice,
}) {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.modal}>
				<TouchableOpacity onPress={onClose} style={styles.closeButton}>
					<Icon
						name="close-outline"
						type="ionicon"
						size={30}
					/>
				</TouchableOpacity>
				<Text style={[styles.dropdownItem, { fontFamily: FONTS.bold, marginBottom: 5 }]}>
					Sắp xếp theo:
				</Text>
				<View style={{ marginLeft: 5 }}>
					<RadioForm
						animation
					>
						{
							convertedList?.map((obj, index) => (
								<RadioButton labelHorizontal key={index}>
									<RadioButtonInput
										obj={obj}
										index={index}
										isSelected={obj.value === value}
										onPress={(val) => setValue(val)}
										buttonInnerColor={obj.value === value ? COLORS.primary : COLORS.secondary}
										buttonOuterColor={obj.value === value ? COLORS.primary : COLORS.primary}
										buttonWrapStyle={styles.dropdownItem}
										buttonSize={SIZES.medium}
										borderWidth={2}
									/>
									<RadioButtonLabel
										obj={obj}
										index={index}
										onPress={(val) => setValue(val)}
										labelStyle={styles.dropdownText}
									/>
								</RadioButton>
							))
						}
					</RadioForm>
				</View>
				<Divider style={{ marginVertical: SIZES.base }} />
				<Text style={[styles.dropdownItem, { fontFamily: FONTS.bold, marginBottom: 5 }]}>
					Kết quả tìm kiếm:
				</Text>
				<View
					style={{
						alignItems: 'center',
						flexDirection: 'row',
						marginLeft: 15,
					}}
				>
					<Text style={{ fontFamily: FONTS.medium }}>
						Giống nhất
					</Text>
					<Slider
						style={{ width: 170, height: 40 }}
						minimumValue={1}
						maximumValue={80}
						step={1}
						value={diversity}
						onValueChange={(val) => setDiversity(val)}
						thumbTintColor={COLORS.primary}
						minimumTrackTintColor="#000000"
						maximumTrackTintColor="#000000"
					/>
					<Text style={{ fontFamily: FONTS.medium }}>
						Đa dạng
					</Text>
				</View>
				<Divider style={{ marginVertical: SIZES.base }} />
				<Text style={[styles.dropdownItem, { fontFamily: FONTS.bold, marginBottom: 5 }]}>
					Khoảng giá (VND):
				</Text>
				<View style={{ paddingLeft: SIZES.base, marginBottom: SIZES.base, marginLeft: 5 }}>
					<View style={styles.inputFilterContainer}>
						<Text style={[styles.dropdownText, { width: '30%' }]}>Tối thiểu</Text>
						<TextInput
							style={styles.inputFilter}
							color={COLORS.black}
							keyboardType="number-pad"
							onChangeText={(val) => setMinPrice(val)}
							defaultValue={minPrice}
							selectionColor={COLORS.primary}
						/>
					</View>
					<View style={styles.inputFilterContainer}>
						<Text style={[styles.dropdownText, { width: '30%' }]}>Tối đa</Text>
						<TextInput
							style={styles.inputFilter}
							color={COLORS.black}
							keyboardType="number-pad"
							onChangeText={(val) => setMaxPrice(val)}
							defaultValue={maxPrice}
							selectionColor={COLORS.primary}
						/>
					</View>
				</View>
				<Divider style={{ marginVertical: SIZES.base }} />
				<Button
					title="Áp dụng filter"
					uppercase={false}
					color={COLORS.primary}
					onPress={onSubmit}
					titleStyle={{
						color: COLORS.secondary,
						fontFamily: FONTS.medium,
					}}
				/>
				<Divider style={{ marginVertical: SIZES.small }} />
				<Button
					title="Thoát"
					uppercase={false}
					color={COLORS.white}
					onPress={onClose}
					titleStyle={{
						fontFamily: FONTS.medium,
					}}
				/>
			</View>
		</SafeAreaView>
	);
}

export default ModalResultsFilter;
