import {
	View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { ActivityIndicator } from '@react-native-material/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@rneui/themed';

import { FONTS, SIZES, COLORS } from '../../constants';
import CarouselCard from '../Common/CarouselCard';
import { productRecommendLoad } from '../../actions/productActions';

const styles = StyleSheet.create({
	container: {
		marginHorizontal: SIZES.base,
		marginVertical: SIZES.medium,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerTitle: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.extraLarge,
		color: COLORS.black,
	},
	headerBtn: {
		fontSize: SIZES.small,
		fontFamily: FONTS.medium,
		color: COLORS.white,
		backgroundColor: COLORS.primary,
		borderRadius: SIZES.small,
		padding: SIZES.base / 2,
	},
	cardsContainer: {
		marginTop: SIZES.medium,
	},
});

function ProductRecommendCarousel({ navigation }) {
	const dispatch = useDispatch();
	const recommendProduct = useSelector((state) => state.loadProductRecommend);
	const { products, loading, error } = recommendProduct;

	useEffect(() => {
		dispatch(productRecommendLoad());
	}, [dispatch]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Có thể bạn sẽ thích</Text>
				<TouchableOpacity onPress={() => dispatch(productRecommendLoad())}>
					<Icon
						name="refresh-outline"
						type="ionicon"
						size={30}
						color={COLORS.primary}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.cardsContainer}>
				{loading ? (
					<ActivityIndicator size="large" color={COLORS.primary} />
				) : error ? (
					<Text style={{ textAlign: 'center', color: COLORS.black }}>EFISS chưa có gợi ý nào dành cho bạn.</Text>
				) : (products.length === 0) ? (
					<Text style={{ textAlign: 'center', color: COLORS.black }}>EFISS chưa có gợi ý nào dành cho bạn.</Text>
				) : (
					<FlatList
						data={products}
						renderItem={({ item }) => (
							<CarouselCard product={item} navigation={navigation} />
						)}
						keyExtractor={(item) => item._id}
						showsHorizontalScrollIndicator={false}
						horizontal
					/>
				)}
			</View>
		</View>
	);
}

export default ProductRecommendCarousel;
