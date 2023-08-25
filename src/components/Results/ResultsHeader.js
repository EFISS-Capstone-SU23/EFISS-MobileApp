import {
	View, StyleSheet, Image, ToastAndroid,
	TouchableOpacity, Modal,
} from 'react-native';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@rneui/themed';

import {
	COLORS, FONTS, SIZES,
} from '../../constants';
import { config, updateDiversity } from '../../../config';
import ModalResultsFilter from './ModalResultsFilter';

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.primary,
		padding: SIZES.base,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	text: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.extraLarge,
		color: COLORS.white,
		textAlign: 'center',
	},
	productImage: {
		flex: 1,
		width: undefined,
		height: 50,
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
		title: 'Độ liên quan: giảm dần',
		value: config.SORT_BY_RELEVANCE,
	},
	{
		id: 2,
		title: 'Giá: tăng dần',
		value: config.SORT_BY_PRICE_ASC,
	},
	{
		id: 3,
		title: 'Giá: giảm dần',
		value: config.SORT_BY_PRICE_DESC,
	},
];

function ResultsHeader({
	navigation, handleSort, sortBy, min, max, croppedImg, place,
}) {
	const [isModalVisible, setModalVisible] = useState(false);

	const handleToggleModal = () => {
		setModalVisible((prevState) => !prevState);
	};

	const base64Icon = `data:image/png;base64,${croppedImg}`;

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
	const [value, setValue] = useState(selectedSortOption
		? selectedSortOption.id : convertedList[0].value);

	const [minPrice, setMinPrice] = useState(min === null ? '' : min);
	const [maxPrice, setMaxPrice] = useState(max === null ? '' : max);
	const [diversity, setDiversity] = useState(config.DIVERSITY);

	const handleDropdownOptionSelect = () => {
		updateDiversity(diversity);

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
					style={styles.productImage}
				/>

				<TouchableOpacity
					onPress={handleToggleModal}
				>
					<Icon
						name="funnel-outline"
						type="ionicon"
						size={30}
						color={COLORS.white}
					/>
				</TouchableOpacity>
			</View>

			<Modal
				animationType="fades"
				transparent
				visible={isModalVisible}
				onRequestClose={handleToggleModal}
			>
				<ModalResultsFilter
					convertedPlaceList={convertedPlaceList}
					setShop={setShop}
					shop={shop}
					convertedList={convertedList}
					setValue={setValue}
					value={value}
					setDiversity={setDiversity}
					diversity={diversity}
					setMinPrice={setMinPrice}
					minPrice={minPrice}
					setMaxPrice={setMaxPrice}
					maxPrice={maxPrice}
					onClose={handleToggleModal}
					onSubmit={handleDropdownOptionSelect}
				/>
			</Modal>
		</View>
	);
}

export default ResultsHeader;
