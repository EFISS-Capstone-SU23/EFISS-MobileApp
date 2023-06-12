import {
	View, Text, StyleSheet,
} from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { IconButton } from '@react-native-material/core';

import {
	COLORS, FONTS, SIZES,
} from '../../constants';

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
});

function ResultsHeader({ navigation }) {
	return (
		<View style={{ backgroundColor: COLORS.primary, padding: SIZES.base }}>
			<View style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingHorizontal: 5,
			}}
			>
				<IconButton onPress={() => navigation.goBack()} icon={<Entypo name="chevron-left" color={COLORS.white} size={28} />} />

				<Text style={styles.text}>
					Kết quả
				</Text>

				<IconButton onPress={() => {}} icon={<Entypo name="bar-graph" color={COLORS.white} size={28} />} />
			</View>

		</View>
	);
}

export default ResultsHeader;
