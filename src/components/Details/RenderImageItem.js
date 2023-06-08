import { View, Image, StyleSheet } from 'react-native';
import React from 'react';

import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
	imgContainer: {
		width: SIZES.WIDTH,
		height: (SIZES.HEIGHT * 2) / 5,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.black,
	},
});

function RenderImageItem({ item }) {
	return (
		<View style={styles.imgContainer}>
			<Image
				// Move the key prop to the Image component
				source={{ uri: item }}
				style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
			/>
		</View>
	);
}

export default RenderImageItem;
