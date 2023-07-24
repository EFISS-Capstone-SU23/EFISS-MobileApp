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
			<IconButton
				onPress={() => navigation.goBack()}
				icon={<Entypo name="chevron-left" color={COLORS.white} size={30} />}
			/>

			<Text style={styles.text}>
				Danh sách bộ sưu tập
			</Text>

			<IconButton
				onPress={onAdd}
				icon={<Entypo name="add-to-list" color={COLORS.white} size={30} />}
			/>
		</View>
	);
}

export default CollectionsHeader;
