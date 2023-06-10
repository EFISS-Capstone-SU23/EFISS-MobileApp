import {
	View, Image, Text, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import {
	COLORS, SIZES, FONTS,
} from '../../constants';
import { productHistorySet } from '../../actions/productActions';

const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	card: {
		flex: 1,
		width: (WIDTH * 2) / 5,
		margin: SIZES.base,
		borderRadius: 5,
	},
	titleContainer: {
		flex: 1,
	},
	title: {
		fontSize: SIZES.small,
		fontFamily: FONTS.semiBold,
		color: COLORS.black,
	},
	priceContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	price: {
		color: COLORS.secondary,
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.small,
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
		marginBottom: SIZES.base / 2,
	},
	group: {
		color: COLORS.secondary,
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.small,
	},
});

function CarouselCard({ product, navigation }) {
	const dispatch = useDispatch();

	return (
		<View style={styles.card}>
			<View style={{ width: '100%', height: 150, justifyContent: 'center' }}>
				<TouchableOpacity onPress={() => {
					dispatch(productHistorySet(product));
					navigation.navigate('Details', { productData: product });
				}}
				>
					<Image
						source={{
							uri: product.images[0],
						}}
						resizeMode="cover"
						style={{
							height: '100%',
						}}
					/>
				</TouchableOpacity>
			</View>
			<View style={{ paddingTop: SIZES.base }}>
				<View style={styles.groupContainer}>
					<Text style={styles.group}>
						{product.group}
					</Text>
				</View>
				<View style={styles.titleContainer}>
					<Text
						style={styles.title}
						numberOfLines={1}
						onPress={() => {
							dispatch(productHistorySet(product));
							navigation.navigate('Details', { productData: product });
						}}
					>
						{product.title}
					</Text>
				</View>
				<View style={styles.priceContainer}>
					<Entypo name="credit" size={SIZES.small} color={COLORS.primary} />
					<Text style={styles.price}>
						{product.price}
					</Text>
				</View>
			</View>
		</View>
	);
}

export default CarouselCard;
