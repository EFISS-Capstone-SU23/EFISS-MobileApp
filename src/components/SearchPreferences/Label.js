import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const styles = StyleSheet.create({
	root: {
		alignItems: 'center',
		padding: 8,
		backgroundColor: COLORS.primary,
		borderRadius: 4,
	},
	text: {
		fontSize: 16,
		color: '#fff',
	},
});

function Label({ text, ...restProps }) {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<View style={styles.root} {...restProps}>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
}

export default memo(Label);
