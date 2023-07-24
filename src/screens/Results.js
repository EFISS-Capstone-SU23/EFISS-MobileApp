import React, { useEffect, useState } from 'react';
import {
	View, SafeAreaView, StyleSheet, ActivityIndicator,
	FlatList, StatusBar, RefreshControl,
} from 'react-native';
import {
	Text,
} from '@react-native-material/core';
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
		backgroundColor: COLORS.white,
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
	const [remainingImageURLs, setRemainingImageURLs] = useState([]);
	const [totalPages, setTotalPages] = useState(1);

	const [sortBy, setSortBy] = useState(config.SORT_BY_RELEVANCE);
	const changeSort = (sortOption) => {
		setSortBy(sortOption);
		setPageNum(1);
		dispatch(productsSearch(imageUrl, config.PAGE_SIZE, sortOption, ['']));
	};

	useEffect(() => {
		dispatch(productsSearch(imageUrl, config.PAGE_SIZE, sortBy, ['']));
	}, [dispatch, imageUrl]);

	useEffect(() => {
		if (products) {
			setItems(products.searchResults);
			setRemainingImageURLs(products.remainingImageUrls);
			const totalProducts = products.searchResults.length + products.remainingImageUrls.length;
			setTotalPages(Math.ceil(totalProducts / config.PAGE_SIZE));
		}
	}, [products]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor={COLORS.primary} />
			<View style={styles.resultsContainer}>
				{loading ? (
					<ActivityIndicator style={styles.container} size="large" color={COLORS.primary} />
				) : error ? (
					<View>
						<Text>Something went wrong</Text>
					</View>
				) : (
					<View>
						<FlatList
							data={items}
							renderItem={({ item }) => (
								<ProductCard product={item} navigation={navigation} />
							)}
							numColumns={2}
							keyExtractor={(item) => item?._id}
							contentContainerStyle={{ columnGap: SIZES.medium }}
							ListHeaderComponent={
								<ResultsHeader navigation={navigation} handleSort={changeSort} />
							}
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
										dispatch(productsSearch(imageUrl, config.PAGE_SIZE, sortBy, ['']));
										setPageNum(1);
										setRefreshControl(false);
									}}
								/>
							)}
							onEndReached={async () => {
								if (!isLoadingMore && (pageNum + 1) <= totalPages) {
									setIsLoadingMore(true);
									const startId = (pageNum - 1) * config.PAGE_SIZE;
									const endId = startId + config.PAGE_SIZE;
									const itemsToLoadIds = remainingImageURLs.slice(startId, endId);
									try {
										const { data } = await axios.post(
											`${config.BE_BASE_API}/${config.LOAD_MORE_BY_URL}`,
											{
												imageUrls: itemsToLoadIds,
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
							onEndReachedThreshold={0.2}
						/>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
}

export default Results;
