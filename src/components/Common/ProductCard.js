import {
	View, Image, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { productHistorySet } from '../../actions/productActions';
import {
	COLORS, SHADOWS, SIZES, FONTS,
} from '../../constants';

const styles = StyleSheet.create({
	container: {
		width: '46%',
		backgroundColor: COLORS.white,
		borderColor: COLORS.gray,
		marginBottom: SIZES.small,
		margin: SIZES.base,
		...SHADOWS.dark,
	},
	productImage: {
		height: '100%',
	},
	productTitle: {
		fontSize: SIZES.font,
		fontFamily: FONTS.semiBold,
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
		color: COLORS.secondary,
		fontFamily: FONTS.semiBold,
		fontSize: 10,
	},
	groupContainer: {
		marginBottom: SIZES.base / 4,
	},
	group: {
		color: COLORS.secondary,
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.small,
		opacity: 0.5,
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
			<View
				style={{ width: '100%', padding: SIZES.small }}
			>
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
					<View style={styles.priceContainer}>
						<Entypo name="credit" size={SIZES.small} color={COLORS.primary} />
						<Text style={styles.productPrice}>
							{product.price}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

export default ProductCard;
