import {
	View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@rneui/themed';

import {
	COLORS, FONTS, SIZES,
} from '../../constants';

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.primary,
		padding: SIZES.medium,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	button: {
		borderRadius: 20,
		color: COLORS.primary,
		padding: 12,
	},
	text: {
		flex: 0.9,
		fontFamily: FONTS.medium,
		fontSize: SIZES.large,
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

			<Text style={styles.text}>
				Danh sách sản phẩm
			</Text>
		</View>
	);
}

export default CollectionDetailsHeader;
