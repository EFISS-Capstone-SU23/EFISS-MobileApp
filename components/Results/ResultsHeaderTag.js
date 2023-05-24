import {
	View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

import { COLORS, SIZES } from '../../constants';

function ResultsHeaderTag({ tag, handlePress }) {
	return (
		<TouchableOpacity
			style={styles.tab}
			onPress={handlePress}
		>
			<Entypo name={tag.icon} size={16} style={{ marginRight: 5 }} color={COLORS.white} />
			<Text
				style={{
					color: COLORS.white,
				}}
			>
				{tag.title}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	tab: {
		paddingVertical: SIZES.small / 2,
		paddingHorizontal: SIZES.small,
		borderRadius: SIZES.medium,
		borderWidth: 1,
		borderColor: COLORS.white,
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export default ResultsHeaderTag;
