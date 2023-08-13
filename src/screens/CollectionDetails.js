import React, { useEffect, useState } from 'react';
import {
	View, Text, SafeAreaView, StyleSheet, ActivityIndicator,
	FlatList, StatusBar, RefreshControl, ToastAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { COLORS, SIZES, FONTS } from '../constants';
import { CollectionDetailsHeader, NoResultsFound } from '../components';
import { collectionDetailsLoad } from '../actions/productActions';
import { config } from '../../config';
import CollectionDetailsCard from '../components/CollectionDetails/CollectionDetailsCard';
import { PRODUCT_COLLECTION_DETAILS_REMOVE_RESET } from '../constants/productConstants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	footer: {
		textAlign: 'center',
		fontFamily: FONTS.semiBold,
		color: COLORS.primary,
		marginVertical: SIZES.medium,
	},
});

function CollectionDetails({ navigation, route }) {
	const dispatch = useDispatch();

	// product data extracted from the results screen
	const { id } = route.params;

	const userSignin = useSelector((state) => state.userSignin);
	const { userToken } = userSignin;
	const loadCollectionDetails = useSelector((state) => state.loadCollectionDetails);
	const {
		loading, error, products, totalPages,
	} = loadCollectionDetails;

	const [refreshControl, setRefreshControl] = useState(false);

	const [pageNum, setPageNum] = useState(1);
	const [items, setItems] = useState([]);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	// as the screen shows up, load the list of products from backend storage
	useEffect(() => {
		dispatch(collectionDetailsLoad(id, 1));
	}, [dispatch]);

	// if the list of products is successfully loaded, set the list data to the item variable.
	useEffect(() => {
		if (products) {
			setItems(products);
		}
	}, [products]);

	// if the user add success, reload screen
	const removeCollectionDetails = useSelector((state) => state.removeCollectionDetails);
	const { successRemoveCollectionDetails } = removeCollectionDetails;

	useEffect(() => {
		if (successRemoveCollectionDetails) {
			dispatch(collectionDetailsLoad(id, 1));
			setPageNum(1);
			ToastAndroid.showWithGravity(
				'Đã xóa sản phẩm khỏi bộ sưu tập',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
			dispatch({ type: PRODUCT_COLLECTION_DETAILS_REMOVE_RESET });
		}
	}, [successRemoveCollectionDetails]);

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
					<ActivityIndicator style={styles.container} size="large" color={COLORS.primary} />
				) : error ? (
					<Text>Something went wrong</Text>
				) : (
					<FlatList
						data={items}
						renderItem={({ item }) => (
							<CollectionDetailsCard collectionId={id} product={item} navigation={navigation} />
						)}
						numColumns={2}
						keyExtractor={(item) => item?.id}
						contentContainerStyle={{ columnGap: SIZES.medium }}
						ListHeaderComponent={<CollectionDetailsHeader navigation={navigation} />}
						// eslint-disable-next-line react/no-unstable-nested-components
						ListFooterComponent={() => (
							isLoadingMore ? <Text style={styles.footer}>Đang tải...</Text> : null
						)}
						stickyHeaderIndices={[0]}
						showsVerticalScrollIndicator={false}
						refreshControl={(
							<RefreshControl
								refreshing={refreshControl}
								onRefresh={() => {
									setRefreshControl(true);
									dispatch(collectionDetailsLoad(id, 1));
									setPageNum(1);
									setRefreshControl(false);
								}}
							/>
						)}
						onEndReached={async () => {
							if (!isLoadingMore && totalPages && pageNum + 1 <= totalPages) {
								setIsLoadingMore(true);
								try {
									const updatedRouter = config.COLLECTION_DETAILS_PAGINATION_ROUTER
										.replace(/:id/g, id)
										.replace(/:pageSize/g, 10)
										.replace(/:pageNum/g, pageNum + 1);
									const { data } = await axios.get(`${config.BE_BASE_API}/${updatedRouter}`, {
										headers: {
											Authorization: `Bearer ${userToken}`,
										},
									});
									setPageNum(pageNum + 1);
									setItems([...items, ...data.products.productsList]);
								} catch (err) {
									console.log('collectionDetailsLoadMore error: ', err);
								} finally {
									setIsLoadingMore(false);
								}
							}
						}}
						onEndReachedThreshold={0.2}
						ListEmptyComponent={<NoResultsFound />}
					/>
				)}
			</View>
		</SafeAreaView>
	);
}

export default CollectionDetails;
