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
	},
	button: {
		borderRadius: 20,
		color: COLORS.primary,
		padding: 12,
	},
	text: {
		flex: 1,
		fontFamily: FONTS.semiBold,
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
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.white,
	},
});

function CollectionsHeader({ navigation, onAdd }) {
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
				Danh sách bộ sưu tập
			</Text>

			<TouchableOpacity
				onPress={onAdd}
			>
				<Icon
					name="add-outline"
					type="ionicon"
					size={30}
					color={COLORS.white}
				/>
			</TouchableOpacity>
		</View>
	);
}

export default CollectionsHeader;
