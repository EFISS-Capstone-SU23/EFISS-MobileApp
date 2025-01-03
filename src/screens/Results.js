import React, { useEffect, useState } from 'react';
import {
	View, SafeAreaView, StyleSheet, ActivityIndicator,
	FlatList, StatusBar, RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { COLORS, SIZES } from '../constants';
import {
	ResultsHeader, ProductCard, NoResultsFound, ErrorView,
} from '../components';
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

	const [croppedImg, setCroppedImg] = useState(null);

	const [items, setItems] = useState([]);
	const [segment, setSegment] = useState(1);
	const [refreshControl, setRefreshControl] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [remainingImageURLs, setRemainingImageURLs] = useState([]);
	const [totalPages, setTotalPages] = useState(1);

	const [sortBy, setSortBy] = useState(config.SORT_BY_RELEVANCE);
	const [shop, setShop] = useState(config.SELECT_FROM_BOTH);
	const [minPrice, setMinPrice] = useState(null);
	const [maxPrice, setMaxPrice] = useState(null);
	const changeSort = (sortOption, shopSelection, minimumPrice, maximumPrice) => {
		console.log('selection: ', shopSelection);
		setSortBy(sortOption);
		setShop(shopSelection);
		setSegment(1);
		setMinPrice(minimumPrice);
		setMaxPrice(maximumPrice);
		dispatch(productsSearch(imageUrl, config.PAGE_SIZE, sortOption, shopSelection, [''], minimumPrice, maximumPrice));
	};

	useEffect(() => {
		dispatch(productsSearch(imageUrl, config.PAGE_SIZE, sortBy, shop, [''], minPrice, maxPrice));
	}, [dispatch, imageUrl]);

	useEffect(() => {
		if (products) {
			setCroppedImg(products.croppedImage);
			setItems(products.searchResults);
			setRemainingImageURLs(products.remainingImageUrls);
			setTotalPages(Math.ceil(products.remainingImageUrls.length / config.PAGE_SIZE));
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
							renderItem={({ item, index }) => (
								<ProductCard product={item} navigation={navigation} index={index} />
							)}
							numColumns={2}
							columnWrapperStyle={{ justifyContent: 'space-between' }}
							keyExtractor={(item) => item?._id}
							contentContainerStyle={{
								columnGap: SIZES.medium,
								flex: 1,
							}}
							ListHeaderComponent={
								// eslint-disable-next-line max-len
								<ResultsHeader navigation={navigation} handleSort={changeSort} sortBy={sortBy} min={minPrice} max={maxPrice} croppedImg={croppedImg} place={shop} />
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
										dispatch(productsSearch(imageUrl, config.PAGE_SIZE, sortBy, shop, [''], minPrice, maxPrice));
										setSegment(1);
										setRefreshControl(false);
									}}
								/>
							)}
							onEndReached={async () => {
								if (!isLoadingMore && segment <= totalPages) {
									setIsLoadingMore(true);
									const startId = (segment - 1) * config.PAGE_SIZE;
									const endId = startId + config.PAGE_SIZE;
									const itemsToLoadIds = remainingImageURLs.slice(startId, endId);
									try {
										const { data } = await axios.post(
											`${config.BE_BASE_API}/${config.LOAD_MORE_BY_URL}`,
											{
												imageUrls: itemsToLoadIds,
											},
										);
										setSegment(segment + 1);
										setItems([...items, ...data.products]);
									} catch (err) {
										console.log('Load more results error: ', err);
									} finally {
										setIsLoadingMore(false);
									}
								}
							}}
							onEndReachedThreshold={0.2}
							removeClippedSubviews
							ListEmptyComponent={<NoResultsFound />}
						/>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
}

export default Results;
