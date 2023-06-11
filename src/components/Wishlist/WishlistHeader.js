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
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	button: {
		marginRight: 10,
		borderRadius: 20,
		color: COLORS.primary,
		padding: 12,
	},
	text: {
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.extraLarge,
		color: COLORS.white,
		textAlign: 'center',
		flex: 0.85,
	},
	tabsContainer: {
		width: '100%',
		marginTop: SIZES.base,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

function WishlistHeader({ navigation }) {
	return (
		<View style={styles.container}>
			<IconButton
				onPress={() => navigation.goBack()}
				icon={<Entypo name="chevron-left" color={COLORS.white} size={30} />}
			/>

			<Text style={styles.text}>
				Wishlist
			</Text>
		</View>
	);
}

export default WishlistHeader;
