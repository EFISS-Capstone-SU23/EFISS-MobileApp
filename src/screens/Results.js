import React, { useEffect, useState } from 'react';
import {
	View, Text, SafeAreaView, StyleSheet, ActivityIndicator,
	FlatList, StatusBar, RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { COLORS, SIZES } from '../constants';
import { ResultsHeader, ProductCard } from '../components';
import { productsSearch } from '../actions/productActions';
import { config } from '../../config';
import ResultsFooter from '../components/Results/ResultsFooter';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.secondary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	resultsContainer: {
		flex: 1,
		justifyContent: 'space-between',
		width: '100%',
	},
});

function Results({ route, navigation }) {
	const { imageUrl } = route.params;
	const dispatch = useDispatch();
	const searchProducts = useSelector((state) => state.searchProducts);
	const { loading, error, products } = searchProducts;

	const [items, setItems] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [refreshControl, setRefreshControl] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [remainingProductIds, setRemainingProductIds] = useState([]);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		dispatch(productsSearch(imageUrl));
	}, [dispatch, imageUrl]);

	useEffect(() => {
		if (products) {
			setItems(products.searchResults);
			setRemainingProductIds(products.remainingProductIds);
			const totalProducts = products.searchResults.length + products.remainingProductIds.length;
			console.log(totalProducts);
			setTotalPages(Math.ceil(totalProducts / 10));
		}
	}, [products]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor={COLORS.primary} />
			<View style={styles.resultsContainer}>
				{loading ? (
					<ActivityIndicator style={styles.container} size="large" colors={COLORS.primary} />
				) : error ? (
					<Text>Something went wrong</Text>
				) : (
					<FlatList
						data={items}
						renderItem={({ item }) => (
							<ProductCard product={item} navigation={navigation} />
						)}
						numColumns={2}
						keyExtractor={(item) => item?._id}
						contentContainerStyle={{ columnGap: SIZES.medium }}
						ListHeaderComponent={<ResultsHeader navigation={navigation} />}
						// eslint-disable-next-line react/no-unstable-nested-components
						ListFooterComponent={() => (
							isLoadingMore ? <ResultsFooter /> : null
						)}
						stickyHeaderIndices={[0]}
						showsVerticalScrollIndicator={false}
						refreshControl={(
							<RefreshControl
								refreshing={refreshControl}
								onRefresh={() => {
									setRefreshControl(true);
									dispatch(productsSearch(imageUrl));
									setPageNum(1);
									setRefreshControl(false);
								}}
							/>
						)}
						onEndReached={async () => {
							if (!isLoadingMore && (pageNum + 1) <= totalPages) {
								setIsLoadingMore(true);
								const startId = (pageNum - 1) * 10;
								const endId = startId + 10;
								const itemsToLoadIds = remainingProductIds.slice(startId, endId);
								try {
									const { data } = await axios.post(
										`${config.BE_BASE_API}/product/list`,
										{
											idList: itemsToLoadIds,
										},
									);
									setPageNum(pageNum + 1);
									setItems([...items, ...data.products]);
								} catch (err) {
									console.log('Load more results error: ', err);
								} finally {
									setIsLoadingMore(false);
								}
							}
						}}
						onEndReachedThreshold={0.1}
					/>
				)}
			</View>
		</SafeAreaView>
	);
}

export default Results;
