import {
	View, StyleSheet, ToastAndroid,
} from 'react-native';
import {
	Text, IconButton, Divider, TextInput, Button,
} from '@react-native-material/core';
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import {
	COLORS, SIZES, FONTS,
} from '../../constants';
import { config } from '../../../config';

const styles = StyleSheet.create({
	dropdownContainer: {
		position: 'absolute',
		top: 80, // Adjust the position as needed
		right: 10, // Adjust the position as needed
		backgroundColor: COLORS.white,
		borderRadius: 8,
		padding: SIZES.medium,
		elevation: 3,
		width: '99%',
	},
	dropdownItem: {
		paddingVertical: 2,
		paddingHorizontal: SIZES.base,
		fontSize: SIZES.large,
	},
	dropdownText: {
		fontFamily: FONTS.regular,
		fontSize: SIZES.large,
	},
	inputFilterContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputFilter: {
		marginBottom: 5,
		flex: 1,
		height: '80%',
	},
});

const SORT_OPTIONS = [
	{
		id: 1,
		title: 'Mặc định',
		value: config.SORT_BY_DEFAULT,
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

function TextResultsHeader({
	navigation, query, handleSort, min, max, sortBy,
}) {
	const [dropdownOpen, setDropdownOpen] = useState(false);

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
		<View style={{ backgroundColor: COLORS.primary, padding: SIZES.base }}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingHorizontal: 5,
				}}
			>
				<IconButton
					onPress={() => navigation.goBack()}
					icon={<Entypo name="chevron-left" color={COLORS.white} size={28} />}
				/>

				<Text color={COLORS.white} style={{ fontSize: SIZES.font }}>
					{`'${query}'`}
				</Text>

				<IconButton
					onPress={handleToggleDropdown}
					icon={<Entypo name="bar-graph" color={COLORS.white} size={28} />}
				/>
			</View>

			{dropdownOpen && (
				<View style={styles.dropdownContainer}>
					<Text style={[styles.dropdownItem, { fontFamily: FONTS.semiBold }]}>Sắp xếp theo: </Text>
					<View>
						<RadioForm>
							{
								convertedList?.map((obj, index) => (
									<RadioButton labelHorizontal key={index}>
										<RadioButtonInput
											obj={obj}
											index={index}
											isSelected={obj.value === value}
											onPress={(val) => setValue(val)}
											buttonInnerColor={obj.value === value ? COLORS.primary : COLORS.grey}
											buttonOuterColor={obj.value === value ? COLORS.primary : COLORS.grey}
											buttonWrapStyle={styles.dropdownItem}
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
					<Text style={[styles.dropdownItem, { fontFamily: FONTS.semiBold }]}>
						Khoảng giá (VND):
					</Text>
					<View style={{ paddingLeft: SIZES.base, marginBottom: SIZES.base }}>
						<View style={styles.inputFilterContainer}>
							<Text style={{ width: '30%', marginRight: 5 }}>Tối thiểu</Text>
							<TextInput
								style={styles.inputFilter}
								color={COLORS.primary}
								keyboardType="number-pad"
								onChangeText={(val) => setMinPrice(val)}
								defaultValue={minPrice}
							/>
						</View>
						<View style={styles.inputFilterContainer}>
							<Text style={{ width: '30%', marginRight: 5 }}>Tối đa</Text>
							<TextInput
								style={styles.inputFilter}
								color={COLORS.primary}
								keyboardType="number-pad"
								onChangeText={(val) => setMaxPrice(val)}
								defaultValue={maxPrice}
							/>
						</View>
					</View>
					<Button title="Áp dụng filter" color={COLORS.primary} onPress={handleDropdownOptionSelect} />
					<Divider style={{ marginVertical: SIZES.small }} />
					<Button title="Thoát" color={COLORS.white} onPress={handleToggleDropdown} />
				</View>
			)}
		</View>
	);
}

export default TextResultsHeader;