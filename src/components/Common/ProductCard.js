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
		borderRadius: SIZES.font,
		borderColor: COLORS.gray,
		borderWidth: 0.5,
		marginBottom: SIZES.small,
		margin: SIZES.base,
		...SHADOWS.dark,
	},
	productImage: {
		height: '100%',
		borderTopLeftRadius: SIZES.small,
		borderTopRightRadius: SIZES.small,
	},
	productTitle: {
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.small,
	},
	priceSection: {
		marginTop: SIZES.font,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	priceContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	productPrice: {
		color: COLORS.primary,
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.small,
		marginLeft: SIZES.base / 2,
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
						navigation.navigate('Details', { data: product });
					}}
				>
					<Image
						source={{
							uri: product.images[0],
						}}
						resizeMode="contain"
						style={styles.productImage}
					/>
				</TouchableOpacity>
			</View>
			<View
				style={{ width: '100%', padding: SIZES.small }}
			>
				<View>
					<Text
						style={styles.productTitle}
						numberOfLines={1}
						onPress={() => {
							dispatch(productHistorySet(product));
							navigation.navigate('Details', { data: product });
						}}
					>
						{product.title}
					</Text>
				</View>
				<View style={styles.priceSection}>
					<View style={styles.priceContainer}>
						<Entypo name="colours" size={SIZES.small} color={COLORS.primary} />
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
