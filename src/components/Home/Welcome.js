import {
	View, Text, StyleSheet, FlatList,
} from 'react-native';
import { ActivityIndicator } from '@react-native-material/core';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FONTS, SIZES, COLORS } from '../../constants';
import CarouselCard from '../Common/CarouselCard';

const styles = StyleSheet.create({
	container: {
		marginHorizontal: SIZES.small,
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

const getNewProduct = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		setIsLoading(true);

		try {
			const response = await axios.get('https://fakestoreapi.com/products?limit=3');

			setProducts(response.data);
			setIsLoading(false);
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

function Welcome() {
	const { products, isLoading, error } = getNewProduct();

	const result = error ? (
		<Text>Something went wrong</Text>
	) : (
		<FlatList
			data={products}
			renderItem={({ item }) => (
				<CarouselCard product={item} />
			)}
			keyExtractor={(item) => item.id}
			showsHorizontalScrollIndicator={false}
			horizontal
		/>
	);

	return (
		<View style={styles.container}>
			<View style={styles.cardsContainer}>
				{isLoading ? (
					<ActivityIndicator size="large" color={COLORS.primary} />
				) : result}
			</View>
		</View>
	);
}

export default Welcome;
