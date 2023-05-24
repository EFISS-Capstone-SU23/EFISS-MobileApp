import React, { useEffect } from 'react';
import {
	View, Text, SafeAreaView, StyleSheet, ActivityIndicator, FlatList, StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, SIZES, FONTS } from '../constants';
import { ResultsHeader, ProductCard } from '../components';
import { productsSearch } from '../actions/productActions';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

function Results({ route, navigation }) {
	const { imageUrl } = route.params;
	const dispatch = useDispatch();
	const searchProducts = useSelector((state) => state.searchProducts);
	const { loading, error, products } = searchProducts;

	useEffect(() => {
		dispatch(productsSearch(imageUrl));
	}, [dispatch, imageUrl]);

	const result = error ? (
		<Text>Something went wrong</Text>
	) : (
		<FlatList
			data={products.searchResults}
			renderItem={({ item }) => (
				<ProductCard product={item} navigation={navigation} />
			)}
			numColumns={2}
			keyExtractor={(item) => item?._id}
			contentContainerStyle={{ columnGap: SIZES.medium }}
			ListHeaderComponent={<ResultsHeader navigation={navigation} />}
			ListFooterComponent={<Text style={{ textAlign: 'center', fontFamily: FONTS.bold, color: COLORS.primary }}>Không còn sản phẩm nào phù hợp</Text>}
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}
		/>
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor={COLORS.primary} />
			<View
				style={{
					flex: 1,
					justifyContent: 'space-between',
					width: '100%',
				}}
			>
				{loading ? (
					<ActivityIndicator style={styles.container} size="large" colors={COLORS.primary} />
				) : result}

			</View>
		</SafeAreaView>
	);
}

export default Results;
