import {
	View, Image, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { Badge } from '@react-native-material/core';

import { productHistorySet } from '../../actions/productActions';
import {
	COLORS, SIZES, FONTS,
} from '../../constants';
import { formatNumber } from '../../utils/utils';

const styles = StyleSheet.create({
	container: {
		width: '46%',
		backgroundColor: COLORS.white,
		borderColor: COLORS.gray,
		marginBottom: SIZES.small,
		margin: SIZES.base,
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
		marginBottom: SIZES.base / 4,
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
		fontFamily: FONTS.semiBold,
		fontSize: 12,
		marginLeft: 2,
	},
});

function ProductCard({ product, navigation }) {
	const dispatch = useDispatch();

	return (
		<View style={styles.container}>
			<View style={{ width: '100%', height: 150 }}>
				<TouchableOpacity
					onPress={() => {
						dispatch(productHistorySet(product));
						navigation.navigate('Details', { productData: product });
					}}
				>
					<Image
						source={{
							uri: product.images[0] ? product.images[0] : 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png',
						}}
						resizeMode="cover"
						style={styles.productImage}
					/>
				</TouchableOpacity>
			</View>
			<View style={{ width: '100%', padding: SIZES.base }}>
				<View style={styles.groupContainer}>
					<Text style={styles.group}>
						{product.group}
					</Text>
				</View>
				<View>
					<Text
						style={styles.productTitle}
						numberOfLines={1}
						onPress={() => {
							dispatch(productHistorySet(product));
							navigation.navigate('Details', { productData: product });
						}}
					>
						{product.title}
					</Text>
				</View>
				<View style={styles.priceSection}>
					<View style={styles.ratingContainer}>
						<Entypo name="star" size={SIZES.small} color={COLORS.yellow} />
						<Text style={styles.productRating}>
							4.5
						</Text>
					</View>
					<View style={styles.priceContainer}>
						<Badge
							label={formatNumber(product.price)}
							color={COLORS.primary}
							labelStyle={styles.productPrice}
						/>
					</View>
				</View>
			</View>
		</View>
	);
}

export default ProductCard;
