import {
	View, StyleSheet, Image, ToastAndroid,
	TouchableOpacity, TextInput,
} from 'react-native';
import {
	Text, Button, Divider,
} from '@react-native-material/core';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@rneui/themed';
// eslint-disable-next-line import/no-extraneous-dependencies
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import {
	COLORS, FONTS, SIZES,
} from '../../constants';
import { config } from '../../../config';

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.primary,
		padding: SIZES.base,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
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
	tabsContainer: {
		width: '100%',
		marginTop: SIZES.base,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	dropdownContainer: {
		position: 'absolute',
		top: 80, // Adjust the position as needed
		right: 10, // Adjust the position as needed
		backgroundColor: COLORS.white,
		borderRadius: 8,
		padding: SIZES.small,
		elevation: 3,
		width: '99%',
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
	productImage: {
		height: '100%',
		borderTopLeftRadius: SIZES.base,
		borderTopRightRadius: SIZES.base,
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
});

const SORT_OPTIONS = [
	{
		id: 1,
		title: 'Độ liên quan: giảm dần',
		value: config.SORT_BY_RELEVANCE,
	},
	{
		id: 2,
		title: 'Giá: từ thấp đến cao',
		value: config.SORT_BY_PRICE_ASC,
	},
	{
		id: 3,
		title: 'Giá: từ cao đến thấp',
		value: config.SORT_BY_PRICE_DESC,
	},
];

function ResultsHeader({
	navigation, handleSort, sortBy, min, max, croppedImg,
}) {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const base64Icon = `data:image/png;base64,${croppedImg}`;

	const convertedList = SORT_OPTIONS.map(({ id, title }) => ({
		value: id,
		label: title,
	}));

	const selectedSortOption = SORT_OPTIONS.find((option) => option.value === sortBy);
	const [value, setValue] = useState(selectedSortOption
		? selectedSortOption.id : convertedList[0].value);
	const [minPrice, setMinPrice] = useState(min === null ? '' : min);
	const [maxPrice, setMaxPrice] = useState(max === null ? '' : max);

	const handleToggleDropdown = () => {
		setDropdownOpen((prevState) => !prevState);
	};

	const handleDropdownOptionSelect = () => {
		if (parseFloat(minPrice) < 0 || parseFloat(maxPrice) < 0) {
			ToastAndroid.showWithGravity(
				'Giá tiền phải lớn hơn 0',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
			return;
		}

		// Perform action based on the selected option
		if (minPrice === '' || maxPrice === '') {
			const adjustedMinPrice = minPrice === '' ? null : minPrice;
			const adjustedMaxPrice = maxPrice === '' ? null : maxPrice;

			handleSort(SORT_OPTIONS[value - 1].value, adjustedMinPrice, adjustedMaxPrice);
		} else if (parseFloat(minPrice) > parseFloat(maxPrice)) {
			ToastAndroid.showWithGravity(
				'Khoảng giá không hợp lệ',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
		} else {
			handleSort(SORT_OPTIONS[value - 1].value, minPrice, maxPrice);
			setDropdownOpen(false);
		}
	};

	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingHorizontal: 5,
				}}
			>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
				>
					<Icon
						name="arrow-back-outline"
						type="ionicon"
						size={30}
						color={COLORS.white}
					/>
				</TouchableOpacity>

				<Image
					source={{ uri: base64Icon }}
					resizeMode="contain"
					style={{
						flex: 1,
						width: undefined,
						height: 50,
					}}
				/>

				<TouchableOpacity
					onPress={handleToggleDropdown}
				>
					<Icon
						name="funnel-outline"
						type="ionicon"
						size={30}
						color={COLORS.white}
					/>
				</TouchableOpacity>
			</View>

			{dropdownOpen && (
				<View style={styles.dropdownContainer}>
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
					<Button
						title="Áp dụng filter"
						uppercase={false}
						color={COLORS.primary}
						onPress={handleDropdownOptionSelect}
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
						onPress={handleToggleDropdown}
						titleStyle={{
							fontFamily: FONTS.medium,
						}}
					/>
				</View>
			)}
		</View>
	);
}

export default ResultsHeader;
