import {
	View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const getProductHistory = () => {
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

function ProductHistoryCarousel({ navigation }) {
	const { products, isLoading, error } = getProductHistory();

	const result = 	error ? (
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
	);

	return (
		<View
			style={{
				backgroundColor: COLORS.primary,
			}}
		>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Sản phẩm bạn xem gần đây</Text>
					{!error && (
						<TouchableOpacity>
							<Text style={styles.headerBtn}>Xem thêm</Text>
						</TouchableOpacity>
					)}

				</View>

				<View style={styles.cardsContainer}>
					{isLoading ? (
						<ActivityIndicator size="large" color={COLORS.primary} />
					) : result}
				</View>
			</View>
		</View>
	);
}

export default ProductHistoryCarousel;
