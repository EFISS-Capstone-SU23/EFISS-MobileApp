import {
	View, Text, StyleSheet, FlatList,
} from 'react-native';
import { ActivityIndicator } from '@react-native-material/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { productHistoryLoad } from '../../actions/productActions';
import { FONTS, SIZES, COLORS } from '../../constants';
import CarouselCard from '../Common/CarouselCard';

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
		color: COLORS.white,
	},
	headerBtn: {
		fontSize: SIZES.small,
		fontFamily: FONTS.medium,
		color: COLORS.primary,
		backgroundColor: COLORS.white,
		borderRadius: SIZES.small,
		padding: SIZES.base / 2,
	},
	cardsContainer: {
		marginTop: SIZES.medium,
	},
});

function ProductHistoryCarousel({ navigation }) {
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
		<View
			style={{
				backgroundColor: COLORS.primary,
			}}
		>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Sản phẩm bạn xem gần đây</Text>
				</View>

				<View style={styles.cardsContainer}>
					{loading ? (
						<ActivityIndicator size="large" color={COLORS.primary} />
					) : error ? (
						<Text style={{ textAlign: 'center', color: COLORS.white }}>Bạn chưa xem sản phẩm nào gần đây</Text>
					) : (products.length === 0) ? (
						<Text style={{ textAlign: 'center', color: COLORS.white }}>Bạn chưa xem sản phẩm nào gần đây</Text>
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
		</View>
	);
}

export default ProductHistoryCarousel;
