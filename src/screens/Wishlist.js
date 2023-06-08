import React, { useEffect, useContext, useState } from 'react';
import {
	View, Text, SafeAreaView, StyleSheet, ActivityIndicator, FlatList, StatusBar, RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { COLORS, SIZES, FONTS } from '../constants';
import { WishlistHeader, ProductCard } from '../components';
import { wishlistLoad } from '../actions/productActions';
import { AuthContext } from '../context/AuthContext';
import { config } from '../../config';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	footer: {
		textAlign: 'center',
		fontFamily: FONTS.bold,
		color: COLORS.primary,
		marginVertical: SIZES.medium,
	},
});

function Wishlist({ navigation }) {
	const dispatch = useDispatch();
	const { userToken } = useContext(AuthContext);
	const loadWishlist = useSelector((state) => state.loadWishlist);
	const {
		loading, error, products, totalPages,
	} = loadWishlist;

	const [items, setItems] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [refreshControl, setRefreshControl] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	useEffect(() => {
		dispatch(wishlistLoad(userToken, 1));
	}, [dispatch]);

	useEffect(() => {
		if (products) {
			setItems(products);
		}
	}, [products]);

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
						ListHeaderComponent={<WishlistHeader navigation={navigation} />}
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
									dispatch(wishlistLoad(userToken, 1));
									setPageNum(1);
									setRefreshControl(false);
								}}
							/>
						)}
						onEndReached={async () => {
							if (!isLoadingMore && totalPages && pageNum + 1 <= totalPages) {
								setIsLoadingMore(true);
								try {
									const { data } = await axios.get(`${config.BE_BASE_API}/${config.WISHLIST_ROUTER}?pageSize=8&pageNumber=${pageNum + 1}`, {
										headers: {
											Authorization: `Bearer ${userToken}`,
										},
									});
									console.log('loaded: ', pageNum + 1);
									setPageNum(pageNum + 1);
									setItems([...items, ...data.products]);
								} catch (err) {
									console.log('wishlistLoad error: ', err);
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

export default Wishlist;
