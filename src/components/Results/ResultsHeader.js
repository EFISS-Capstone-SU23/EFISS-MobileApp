import {
	View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { IconButton } from '@react-native-material/core';

import {
	COLORS, FONTS, SIZES,
} from '../../constants';
import { config } from '../../../config';

const styles = StyleSheet.create({
	button: {
		marginRight: 10,
		backgroundColor: COLORS.white,
		borderRadius: 20,
		color: COLORS.primary,
		padding: 12,
	},
	text: {
		fontFamily: FONTS.semiBold,
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
		top: 50, // Adjust the position as needed
		right: 10, // Adjust the position as needed
		backgroundColor: COLORS.white,
		borderRadius: 8,
		padding: 10,
		elevation: 3,
	},
	dropdownItem: {
		paddingVertical: SIZES.small,
		paddingHorizontal: SIZES.base,
	},
	dropdownText: {
		fontFamily: FONTS.regular,
		fontSize: SIZES.large,
	},
});

const SORT_OPTIONS = [
	{
		id: 1,
		title: 'Giá: từ thấp đến cao',
		value: config.SORT_BY_PRICE_ASC,
	},
	{
		id: 2,
		title: 'Giá: từ cao đến thấp',
		value: config.SORT_BY_PRICE_DESC,
	},
];

function ResultsHeader({ navigation, handleSort }) {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const handleToggleDropdown = () => {
		setDropdownOpen((prevState) => !prevState);
	};

	const handleDropdownOptionSelect = (option) => {
		// Perform action based on the selected option
		handleSort(option);
		setDropdownOpen(false);
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
				<IconButton onPress={() => navigation.goBack()} icon={<Entypo name="chevron-left" color={COLORS.white} size={28} />} />

				<Text style={styles.text}>Kết quả</Text>

				<TouchableOpacity onPress={handleToggleDropdown}>
					<Entypo name="bar-graph" color={COLORS.white} size={28} />
				</TouchableOpacity>
			</View>

			{dropdownOpen && (
				<View style={styles.dropdownContainer}>
					<Text style={[styles.dropdownItem, { fontFamily: FONTS.semiBold }]}>Sắp xếp theo: </Text>
					{SORT_OPTIONS.map((option, index) => (
						<TouchableOpacity
							style={styles.dropdownItem}
							onPress={() => handleDropdownOptionSelect(option.value)}
							key={index}
						>
							<Text style={styles.dropdownText}>{option.title}</Text>
						</TouchableOpacity>
					))}
				</View>
			)}
		</View>
	);
}

export default ResultsHeader;
