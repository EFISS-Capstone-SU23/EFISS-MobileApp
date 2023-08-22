import {
	View, TouchableOpacity, StyleSheet,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import FastImage from 'react-native-fast-image';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { Badge, Text } from '@react-native-material/core';
import {
	COLORS, SIZES, FONTS,
} from '../../constants';
import { formatNumber } from '../../utils/utils';

const styles = StyleSheet.create({
	container: {
		width: '47%',
		backgroundColor: COLORS.white,
		margin: 5,
		borderTopLeftRadius: SIZES.base,
		borderTopRightRadius: SIZES.base,
	},
	productImage: {
		height: '100%',
		borderTopLeftRadius: SIZES.base,
		borderTopRightRadius: SIZES.base,
	},
	productTitle: {
		fontSize: SIZES.medium,
		fontFamily: FONTS.bold,
		color: COLORS.black,
	},
	priceSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: 5,
	},
	priceContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 5,
	},
	productPrice: {
		color: COLORS.white,
		fontFamily: FONTS.medium,
		fontSize: 12,
	},
	groupContainer: {
		marginVertical: 2,
	},
	group: {
		color: COLORS.secondary,
		fontFamily: FONTS.light,
		fontSize: SIZES.small,
		opacity: 0.8,
	},
	ratingContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 5,
	},
	productRating: {
		color: COLORS.secondary,
		fontFamily: FONTS.bold,
		fontSize: 10,
		marginLeft: 2,
	},
});

function ProductCard({ product, navigation }) {
	// Generate a random number between 1 and 100
	const randomValue = Math.random() * 100;

	// Set isSponsored based on the random number
	const isSponsored = randomValue <= 20;

	return (
		<View style={styles.container}>
			<View style={{ width: '100%', height: 150 }}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Details', { productId: product.id ? product.id : product._id });
					}}
				>
					<FastImage
						source={{
							uri: product.images[0] ? product.images[0] : 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png',
							priority: FastImage.priority.normal,
						}}
						resizeMode={FastImage.resizeMode.cover}
						style={styles.productImage}
					/>
				</TouchableOpacity>
			</View>
			<View style={{ width: '100%', paddingHorizontal: 5 }}>
				<View style={{ marginVertical: 5 }}>
					<Text
						variant="subtitle2"
						numberOfLines={1}
						onPress={() => {
							navigation.navigate('Details', { productId: product.id ? product.id : product._id });
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
							labelStyle={styles.productPrice}
						/>
					</View>
					{isSponsored && (
						<View style={styles.ratingContainer}>
							<Entypo name="star" size={SIZES.small} color={COLORS.yellow} />
							<Text style={styles.productRating}>
								Sponsored
							</Text>
						</View>
					)}
				</View>
			</View>
		</View>
	);
}

export default React.memo(ProductCard);
