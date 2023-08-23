import {
	View, Text, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import FastImage from 'react-native-fast-image';
import { Badge } from '@react-native-material/core';
import React from 'react';

import {
	COLORS, SIZES, FONTS,
} from '../../constants';
import { formatNumber } from '../../utils/utils';

const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	card: {
		flex: 1,
		width: (WIDTH * 2) / 5,
		marginRight: SIZES.small,
		borderRadius: SIZES.base,
	},
	titleContainer: {
		flex: 1,
	},
	title: {
		fontSize: SIZES.medium,
		fontFamily: FONTS.regular,
		color: COLORS.black,
	},
	priceSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 2,
	},
	priceContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	price: {
		color: COLORS.black,
		fontFamily: FONTS.medium,
		fontSize: 12,
	},
	ratingContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 5,
	},
	rating: {
		color: COLORS.secondary,
		fontFamily: FONTS.bold,
		fontSize: 12,
		marginLeft: 2,
	},
	button: {
		height: 30,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.primary,
		borderRadius: SIZES.small,
	},
	groupContainer: {
		marginBottom: SIZES.base / 4,
	},
	group: {
		color: COLORS.secondary,
		fontFamily: FONTS.light,
		fontSize: 10,
		opacity: 0.8,
	},
});

function CarouselCard({ product, navigation }) {
	return (
		<View style={styles.card}>
			<View style={{ width: '100%', height: 150, justifyContent: 'center' }}>
				<TouchableOpacity onPress={() => {
					navigation.navigate('Details', { productId: product.id });
				}}
				>
					<FastImage
						source={{
							uri: product?.images[0],
							priority: FastImage.priority.normal,
						}}
						resizeMode={FastImage.resizeMode.cover}
						style={{
							height: '100%',
							borderTopLeftRadius: SIZES.base,
							borderTopRightRadius: SIZES.base,
						}}
					/>
				</TouchableOpacity>
			</View>
			<View style={{ padding: 2 }}>
				<View style={styles.titleContainer}>
					<Text
						style={styles.title}
						numberOfLines={1}
						onPress={() => {
							navigation.navigate('Details', { productId: product.id });
						}}
					>
						{product.title}
					</Text>
				</View>
				<View style={styles.groupContainer}>
					<Text style={styles.group}>
						{product.shopName}
					</Text>
				</View>
				<View style={styles.priceSection}>
					<View style={styles.priceContainer}>
						<Badge
							label={formatNumber(product.price)}
							color={COLORS.primary}
							labelStyle={styles.price}
						/>
					</View>
				</View>
			</View>
		</View>
	);
}

export default CarouselCard;
