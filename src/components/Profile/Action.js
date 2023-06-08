import {
	View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import React from 'react';

import { Entypo } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../constants';

const styles = StyleSheet.create({
	action: {
		marginTop: SIZES.base,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: SIZES.font,
		padding: SIZES.base,
	},
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 6,
		backgroundColor: COLORS.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	actionTitle: {
		color: COLORS.black,
		fontFamily: FONTS.semiBold,
		marginLeft: SIZES.base,
		fontSize: SIZES.medium,
	},
});

function Action({ icon, title, onPress }) {
	return (
		<TouchableOpacity style={styles.action} onPress={onPress}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={styles.iconContainer}>
					<Entypo name={icon} size={28} color={COLORS.white} />
				</View>
				<Text style={styles.actionTitle}>{title}</Text>
			</View>
			<Entypo name="chevron-right" size={28} color={COLORS.primary} />
		</TouchableOpacity>
	);
}

export default Action;