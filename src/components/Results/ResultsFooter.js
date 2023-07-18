import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { FONTS, COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
	footer: {
		textAlign: 'center',
		fontFamily: FONTS.semiBold,
		color: COLORS.primary,
		marginVertical: SIZES.medium,
	},
});

function ResultsFooter() {
	return (
		<View>
			<Text style={styles.footer}>Đang tải...</Text>
		</View>
	);
}

export default ResultsFooter;
