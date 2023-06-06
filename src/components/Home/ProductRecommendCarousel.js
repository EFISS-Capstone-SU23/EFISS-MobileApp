import {
	View, Text, StyleSheet, ActivityIndicator, FlatList,
} from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { FONTS, SIZES, COLORS } from '../../constants';
import CarouselCard from '../Common/CarouselCard';
import { productHistoryLoad } from '../../actions/productActions';

const styles = StyleSheet.create({
	container: {
		margin: SIZES.small,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerTitle: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.large,
		color: COLORS.primary,
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
	const historyProduct = useSelector((state) => state.loadProductHistory);
	const { products, loading, error } = historyProduct;
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			dispatch(productHistoryLoad());
		}
	}, [dispatch, isFocused]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Có thể bạn sẽ thích</Text>
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
