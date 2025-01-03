import {
	View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@rneui/themed';

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
		backgroundColor: COLORS.button,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: SIZES.base,
	},
	actionTitle: {
		color: COLORS.black,
		fontFamily: FONTS.medium,
		marginLeft: SIZES.base,
		fontSize: SIZES.medium,
	},
});

function Action({ icon, title, onPress }) {
	return (
		<TouchableOpacity style={styles.action} onPress={onPress}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={styles.iconContainer}>
					<Icon
						name={icon}
						type="ionicon"
						size={28}
						color={COLORS.black}
					/>
				</View>
				<Text style={styles.actionTitle}>{title}</Text>
			</View>
			<Icon
				name="chevron-forward-outline"
				type="ionicon"
				size={28}
				color={COLORS.button}
			/>
		</TouchableOpacity>
	);
}

export default Action;
