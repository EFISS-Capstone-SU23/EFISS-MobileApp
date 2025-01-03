import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	View, SafeAreaView, StyleSheet, ActivityIndicator,
	FlatList, StatusBar, RefreshControl,
} from 'react-native';
import axios from 'axios';

import {
	ProductCard, TextResultsHeader, NoResultsFound, ErrorView,
} from '../components';
import { productsTextSearch } from '../actions/productActions';
import ResultsFooter from '../components/Results/ResultsFooter';
import { COLORS, SIZES } from '../constants';
import { config } from '../../config';

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

function TextResults({ route, navigation }) {
	const { query } = route.params;
	const dispatch = useDispatch();
	const searchTextProducts = useSelector((state) => state.searchTextProducts);
	const {
		loading, error, totalPages, products,
	} = searchTextProducts;

	const [text, setText] = useState(query);
	const [items, setItems] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [refreshControl, setRefreshControl] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const [sortBy, setSortBy] = useState(config.SORT_BY_DEFAULT);
	const [shop, setShop] = useState(config.SELECT_FROM_BOTH);
	const [minPrice, setMinPrice] = useState(null);
	const [maxPrice, setMaxPrice] = useState(null);
	const changeSort = (sortOption, shopSelection, minimumPrice, maximumPrice) => {
		setSortBy(sortOption);
		setShop(shopSelection);
		setPageNum(1);
		setMinPrice(minimumPrice);
		setMaxPrice(maximumPrice);
		dispatch(productsTextSearch(text, 1, sortOption, shopSelection, minimumPrice, maximumPrice));
	};

	const newSearch = (val) => {
		setText(val);
		setSortBy(config.SORT_BY_DEFAULT);
		setShop(config.SELECT_FROM_BOTH);
		setPageNum(1);
		setMinPrice(null);
		setMaxPrice(null);
		dispatch(productsTextSearch(val, 1, config.SORT_BY_DEFAULT, shop, null, null));
	};

	useEffect(() => {
		dispatch(productsTextSearch(query, pageNum, sortBy, shop, minPrice, maxPrice));
	}, [dispatch, query]);

	useEffect(() => {
		if (products) {
			setItems(products);
		}
	}, [products]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor={COLORS.primary} />
			<View style={styles.resultsContainer}>
				{loading ? (
					<ActivityIndicator style={styles.container} size="large" color={COLORS.primary} />
				) : error ? (
					<ErrorView navigation={navigation} />
				) : (
					<View style={items.length > 4 ? {} : { flex: 1 }}>
						<FlatList
							data={items}
							renderItem={({ item }) => (
								<ProductCard product={item} navigation={navigation} />
							)}
							numColumns={2}
							keyExtractor={(item) => item?._id}
							columnWrapperStyle={{ justifyContent: 'space-between' }}
							contentContainerStyle={{ columnGap: SIZES.medium, flex: 1 }}
							ListHeaderComponent={
								// eslint-disable-next-line max-len
								<TextResultsHeader navigation={navigation} query={text} handleSort={changeSort} sortBy={sortBy} min={minPrice} max={maxPrice} handleSearch={newSearch} place={shop} />
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
										dispatch(productsTextSearch(query, 1));
										setPageNum(1);
										setRefreshControl(false);
									}}
								/>
							)}
							onEndReached={async () => {
								if (!isLoadingMore && (pageNum + 1) <= totalPages) {
									setIsLoadingMore(true);
									try {
										let updatedRouter = config.TEXT_SEARCH_ROUTER
											.replace(/:query/g, query)
											.replace(/:pageSize/g, config.PAGE_SIZE)
											.replace(/:pageNum/g, pageNum + 1)
											.replace(/:sortBy/g, sortBy);

										if (minPrice !== null && minPrice !== '') {
											updatedRouter += `&minPrice=${minPrice}`;
										}

										if (maxPrice !== null && maxPrice !== '') {
											updatedRouter += `&maxPrice=${maxPrice}`;
										}

										const { data } = await axios.get(`${config.BE_BASE_API}/${updatedRouter}`);
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
							ListEmptyComponent={<NoResultsFound />}
							removeClippedSubviews
						/>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
}

export default TextResults;
