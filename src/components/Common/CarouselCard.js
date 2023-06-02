import {
	View, Image, Text, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import {
	COLORS, SHADOWS, SIZES, FONTS,
} from '../../constants';
import { productHistorySet } from '../../actions/productActions';

const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	card: {
		flex: 1,
		width: (WIDTH * 2) / 5,
		backgroundColor: COLORS.white,
		borderRadius: SIZES.font,
		borderColor: COLORS.gray,
		borderWidth: 1,
		margin: SIZES.base,
		...SHADOWS.medium,
		shadowColor: COLORS.white,
	},
	titleContainer: {
		flex: 1,
	},
	title: {
		fontSize: SIZES.font,
		fontFamily: FONTS.semiBold,
		color: COLORS.black,
	},
	priceContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	price: {
		color: COLORS.primary,
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.small,
		marginLeft: SIZES.base / 2,
	},
	button: {
		height: 30,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.primary,
		borderRadius: SIZES.small,
	},
});

function CarouselCard({ product, navigation }) {
	const dispatch = useDispatch();

	return (
		<View style={styles.card}>
			<View style={{ width: '100%', height: 150, justifyContent: 'center' }}>
				<TouchableOpacity onPress={() => {
					dispatch(productHistorySet(product));
					navigation.navigate('Details', { data: product });
				}}
				>
					<Image
						source={{
							uri: `https://storage.googleapis.com/efiss/data${product.images[0].substring(1)}`,
						}}
						resizeMode="contain"
						style={{
							height: '100%', borderTopLeftRadius: SIZES.small, borderTopRightRadius: SIZES.small, padding: SIZES.base,
						}}
					/>
				</TouchableOpacity>
			</View>
			<View style={{ padding: SIZES.base, borderTopColor: COLORS.black, borderTopWidth: 0.5 }}>
				<View style={styles.titleContainer}>
					<Text
						style={styles.title}
						numberOfLines={1}
						onPress={() => {
							dispatch(productHistorySet(product));
							navigation.navigate('Details', { data: product });
						}}
					>
						{product.title}
					</Text>
				</View>
				<View style={styles.priceContainer}>
					<Entypo name="colours" size={SIZES.small} color={COLORS.primary} />
					<Text style={styles.price}>
						{product.price.replace(/(\r\n|\n|\r)/gm, ' ')}
					</Text>
				</View>
			</View>
		</View>
	);
}

export default CarouselCard;
