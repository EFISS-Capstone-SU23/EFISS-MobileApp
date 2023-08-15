import {
	View, Text, StyleSheet,
} from 'react-native';
import { IconButton } from '@react-native-material/core';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

import {
	COLORS, FONTS, SIZES,
} from '../../constants';

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.primary,
		padding: SIZES.base,
		flexDirection: 'row',
		alignItems: 'center',
	},
	button: {
		borderRadius: 20,
		color: COLORS.primary,
		padding: 12,
	},
	text: {
		flex: 0.9,
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.large,
		color: COLORS.black,
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
		width: '40%',
		top: 60, // Adjust the position as needed
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

function CollectionDetailsHeader({ navigation }) {
	return (
		<View style={styles.container}>
			<IconButton
				onPress={() => navigation.goBack()}
				icon={<Entypo name="chevron-left" color={COLORS.black} size={24} />}
			/>

			<Text style={styles.text}>
				Danh sách sản phẩm
			</Text>
		</View>
	);
}

export default CollectionDetailsHeader;
