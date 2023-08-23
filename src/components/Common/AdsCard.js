import {
	View, Text, StyleSheet, ImageBackground, Linking,
} from 'react-native';
import { Button } from '@react-native-material/core';
import React from 'react';

import {
	SIZES, COLORS, FONTS,
} from '../../constants';

const styles = StyleSheet.create({
	imgContainer: {
		width: (SIZES.WIDTH * 4) / 5,
		marginHorizontal: SIZES.base,
		borderRadius: SIZES.base,
	},
	imageBackground: {
		flex: 1,
		height: SIZES.HEIGHT / 5,
	},
	textContainer: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		backgroundColor: 'rgba(52, 52, 52, 0.6)',
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

function AdsCard({ data }) {
	return (
		<View style={styles.imgContainer}>
			<ImageBackground
				source={{ uri: data.bannerUrl }}
				style={styles.imageBackground}
				imageStyle={{ borderRadius: SIZES.base }}
			>
				<View style={styles.textContainer}>
					<Text style={styles.category}>{data.name}</Text>
					<Button
						variant="outlined"
						uppercase={false}
						title="Xem cửa hàng"
						style={{ width: '50%', marginLeft: SIZES.medium, marginTop: SIZES.base }}
						color={COLORS.white}
						onPress={() => { Linking.openURL(data.destinationUrl); }}
					/>
				</View>
			</ImageBackground>
		</View>
	);
}

export default AdsCard;
