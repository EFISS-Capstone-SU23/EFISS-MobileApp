import { View, StyleSheet } from 'react-native';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import FastImage from 'react-native-fast-image';

import { COLORS, SIZES } from '../../constants';
import { config } from '../../../config';

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
				source={{
					uri: config.IS_LOCAL ? item.replace('https://storage.googleapis.com', config.IMG_STORAGE_URL) : item,
					priority: FastImage.priority.normal,
				}}
				resizeMode={FastImage.resizeMode.contain}
				style={{ width: '100%', height: '100%' }}
			/>

		</View>
	);
}

export default RenderImageItem;
