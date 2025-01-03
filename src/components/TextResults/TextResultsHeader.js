import {
	View, StyleSheet, ToastAndroid, TouchableOpacity, TextInput,
} from 'react-native';
import {
	Text, Divider, Button,
} from '@react-native-material/core';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@rneui/themed';
// eslint-disable-next-line import/no-extraneous-dependencies
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import {
	COLORS, SIZES, FONTS, SHADOWS,
} from '../../constants';
import { config } from '../../../config';

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.primary,
		padding: SIZES.small,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	dropdownContainer: {
		position: 'absolute',
		top: 60, // Adjust the position as needed
		right: 10, // Adjust the position as needed
		backgroundColor: COLORS.white,
		borderRadius: 8,
		padding: SIZES.medium,
		elevation: 3,
		width: '99%',
	},
	dropdownItem: {
		paddingHorizontal: SIZES.base,
		fontSize: SIZES.medium,
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
	inputContainer: {
		height: 50,
		width: '60%',
		backgroundColor: COLORS.white,
		borderRadius: 10,
		flexDirection: 'row',
		paddingHorizontal: 20,
		alignItems: 'center',
		...SHADOWS.dark,
	},
});

const SELECT_FROM = [
	{
		id: 1,
		title: 'Tất cả',
		value: config.SELECT_FROM_BOTH,
	},
	{
		id: 2,
		title: 'Brand',
		value: config.SELECT_FROM_BRAND,
	},
	{
		id: 3,
		title: 'Market Place',
		value: config.SELECT_FROM_MARKETPLACE,
	},
];

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
	navigation, query, handleSort, min, max, sortBy, handleSearch, place,
}) {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const convertedPlaceList = SELECT_FROM.map(({ id, title }) => ({
		value: id,
		label: title,
	}));

	const convertedList = SORT_OPTIONS.map(({ id, title }) => ({
		value: id,
		label: title,
	}));

	const selectedPlace = SELECT_FROM.find((option) => option.value === place);
	const [shop, setShop] = useState(selectedPlace
		? selectedPlace.id : convertedPlaceList[0].value);

	const selectedSortOption = SORT_OPTIONS.find((option) => option.value === sortBy);
	const [text, setText] = useState(query);
	const [value, setValue] = useState(selectedSortOption
		? selectedSortOption.id : convertedList[0].value);
	const [minPrice, setMinPrice] = useState(min === null ? '' : min);
	const [maxPrice, setMaxPrice] = useState(max === null ? '' : max);

	const handleToggleDropdown = () => {
		setDropdownOpen((prevState) => !prevState);
	};

	const handleSubmit = () => {
		if (text && text.length > 0) {
			handleSearch(text);
		} else {
			ToastAndroid.showWithGravity(
				'Vui lòng nhập từ khóa',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
		}
		setText('');
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

			// eslint-disable-next-line max-len
			handleSort(SORT_OPTIONS[value - 1].value, SELECT_FROM[shop - 1].value, adjustedMinPrice, adjustedMaxPrice);
		} else if (parseFloat(minPrice) > parseFloat(maxPrice)) {
			ToastAndroid.showWithGravity(
				'Khoảng giá không hợp lệ',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
		} else {
			handleSort(SORT_OPTIONS[value - 1].value, SELECT_FROM[shop - 1].value, minPrice, maxPrice);
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
					padding: 5,
					marginBottom: 10,
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

				<View style={styles.inputContainer}>
					<TextInput
						placeholder="Nhập từ khóa"
						style={{ flex: 1, marginHorizontal: 5, color: COLORS.dark }}
						value={text}
						onChangeText={(val) => setText(val)}
					/>

					<TouchableOpacity onPress={handleSubmit}>
						<Icon
							name="search-outline"
							type="ionicon"
							size={28}
							color={COLORS.dark}
						/>
					</TouchableOpacity>
				</View>

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
					<Text style={[styles.dropdownItem, { fontFamily: FONTS.bold, marginBottom: SIZES.base }]}>
						Sắp xếp theo:
					</Text>
					<View style={{ marginLeft: 5 }}>
						<RadioForm>
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
											buttonSize={SIZES.small}
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
						Xem sản phẩm từ:
					</Text>
					<View style={{ marginLeft: 5 }}>
						<RadioForm
							animation
						>
							{
								convertedPlaceList?.map((obj, index) => (
									<RadioButton labelHorizontal key={index}>
										<RadioButtonInput
											obj={obj}
											index={index}
											isSelected={obj.value === shop}
											onPress={(val) => {
												setShop(val);
											}}
											buttonInnerColor={obj.value === shop ? COLORS.primary : COLORS.secondary}
											buttonOuterColor={obj.value === shop ? COLORS.primary : COLORS.primary}
											buttonWrapStyle={styles.dropdownItem}
											buttonSize={SIZES.medium}
											borderWidth={2}
										/>
										<RadioButtonLabel
											obj={obj}
											index={index}
											onPress={(val) => {
												setShop(val);
											}}
											labelStyle={styles.dropdownText}
										/>
									</RadioButton>
								))
							}
						</RadioForm>
					</View>
					<Divider style={{ marginVertical: SIZES.base }} />
					<Text style={[styles.dropdownItem, { fontFamily: FONTS.bold, marginBottom: SIZES.base }]}>
						Khoảng giá (VND):
					</Text>
					<View style={{ paddingLeft: SIZES.base, marginBottom: SIZES.base, marginLeft: 5 }}>
						<View style={styles.inputFilterContainer}>
							<Text style={[styles.dropdownText, { width: '30%' }]}>Tối thiểu</Text>
							<TextInput
								style={styles.inputFilter}
								color={COLORS.primary}
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
								color={COLORS.primary}
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

export default TextResultsHeader;
