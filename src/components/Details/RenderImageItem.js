import { View, StyleSheet } from 'react-native';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import FastImage from 'react-native-fast-image';

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
			<FastImage
				// Move the key prop to the Image component
				source={{
					uri: item,
					priority: FastImage.priority.normal,
				}}
				style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
			/>
		</View>
	);
}

export default RenderImageItem;
