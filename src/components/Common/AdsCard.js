/* eslint-disable global-require */
import {
	View, StyleSheet, ImageBackground, Linking,
} from 'react-native';
import { Button } from '@react-native-material/core';
import React from 'react';

import {
	SIZES, COLORS, FONTS,
} from '../../constants';

const styles = StyleSheet.create({
	imgContainer: {
		width: 300,
		marginHorizontal: SIZES.base,
		borderRadius: SIZES.base,
	},
	imageBackground: {
		flex: 1,
		height: 150,
	},
	textContainer: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(52, 52, 52, 0.1)',
		borderRadius: 10,
	},
	category: {
		marginLeft: SIZES.medium,
		color: COLORS.white,
		fontFamily: FONTS.light,
		fontSize: SIZES.extraLarge,
	},
	btnAction: {
		borderWidth: 1,
		borderColor: COLORS.white,
		padding: SIZES.base,
	},
});

function AdsCard({ data, index }) {
	let imageSource = null;

	switch (index) {
	case 0:
		imageSource = require('../../assets/banners/banner-1.jpg');
		break;
	case 1:
		imageSource = require('../../assets/banners/banner-2.jpg');
		break;
	case 2:
		imageSource = require('../../assets/banners/banner-3.jpg');
		break;
	default:
		imageSource = require('../../assets/banners/banner-3.jpg');
		break;
	}

	return (
		<View style={styles.imgContainer}>
			<ImageBackground
				// eslint-disable-next-line global-require
				source={imageSource}
				style={styles.imageBackground}
				imageStyle={{ borderRadius: SIZES.base }}
			>
				<View style={styles.textContainer}>
					<Button
						variant="outlined"
						uppercase={false}
						title="Xem cửa hàng"
						style={{
							width: '50%',
							marginLeft: SIZES.medium,
							backgroundColor: 'rgba(52, 52, 52, 0.8)',
							marginBottom: 10,
						}}
						color={COLORS.white}
						onPress={() => { Linking.openURL(data.link); }}
					/>
				</View>
			</ImageBackground>
		</View>
	);
}

export default AdsCard;
