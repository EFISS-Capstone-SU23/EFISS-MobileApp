import {
	View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';

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

const getProductRecommend = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		setIsLoading(true);

		try {
			const value = await AsyncStorage.getItem('product_history');
			if (value !== null) {
				const productHistory = JSON.parse(value);
				setProducts(productHistory.reverse());
				setIsLoading(false);
			} else {
				setProducts([]);
				setIsLoading(false);
			}
			setError(null);
		} catch (errorCatch) {
			setError(errorCatch);
			console.log(errorCatch);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { products, isLoading, error };
};

function ProductRecommendCarousel({ navigation }) {
	const { products, isLoading, error } = getProductRecommend();

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Có thể bạn sẽ thích</Text>
				<TouchableOpacity>
					<Text style={styles.headerBtn}>Xem thêm</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.cardsContainer}>
				{isLoading ? (
					<ActivityIndicator size="large" color={COLORS.primary} />
				) : error ? (
					<Text style={{ textAlign: 'center', color: COLORS.white }}>EFISS chưa có gợi ý nào dành cho bạn.</Text>
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
