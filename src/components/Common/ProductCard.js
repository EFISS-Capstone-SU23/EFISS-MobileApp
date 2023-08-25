import {
	View, StyleSheet, TouchableHighlight,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import FastImage from 'react-native-fast-image';
import React from 'react';
import { Badge, Text } from '@react-native-material/core';
import {
	COLORS, SIZES, FONTS,
} from '../../constants';
import { formatNumber } from '../../utils/utils';

const cardWidth = SIZES.WIDTH / 2 - 20;

const styles = StyleSheet.create({
	card: {
		height: 220,
		width: cardWidth,
		marginHorizontal: 10,
		marginBottom: 5,
		marginTop: 20,
		borderRadius: 15,
		elevation: 5,
		backgroundColor: COLORS.white,
	},
	productShopName: {
		fontSize: SIZES.base,
		color: COLORS.grey,
		marginTop: 2,
		fontFamily: FONTS.semiBold,
	},
	addToCartBtn: {
		height: 30,
		width: 30,
		borderRadius: 20,
		backgroundColor: COLORS.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function ProductCard({ product, navigation }) {
	// Generate a random number between 1 and 100
	const randomValue = Math.random() * 100;

	// Set isSponsored based on the random number
	const isSponsored = randomValue <= 10;

	return (
		<TouchableHighlight
			underlayColor={COLORS.white}
			activeOpacity={0.9}
			onPress={() => navigation.navigate('Details', { productId: product.id ? product.id : product._id })}
		>
			<View style={styles.card}>
				<View style={{ alignItems: 'center', top: -10 }}>
					<FastImage
						source={{
							uri: product.images[0] ? product.images[0].replace('product_images', 'thumbnail') : 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png',
							priority: FastImage.priority.normal,
						}}
						resizeMode={FastImage.resizeMode.cover}
						style={{
							height: 120, width: 120, borderRadius: 5, elevation: 5,
						}}
					/>
				</View>
				<View style={{ marginHorizontal: 10, marginTop: 10 }}>
					<Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: SIZES.font, fontFamily: FONTS.semiBold }}>
						{product.title}
					</Text>
					<Text style={styles.productShopName}>
						{product.shopName}
					</Text>
				</View>

				<View
					style={{
						marginTop: 10,
						marginHorizontal: 10,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Text style={{ fontSize: SIZES.font, fontFamily: FONTS.regular }}>
						{formatNumber(product.price)}
					</Text>
					{isSponsored && (
						<Badge
							label="Sponsored"
							color={COLORS.yellow}
							labelStyle={{
								fontSize: SIZES.small,
								fontFamily: FONTS.light,
							}}
						/>
					)}
				</View>
			</View>
		</TouchableHighlight>
	);
}

export default React.memo(ProductCard);
