import React, { useEffect, useState } from 'react';
import {
	View, Text, SafeAreaView, StyleSheet, ActivityIndicator,
	FlatList, StatusBar, RefreshControl, Modal,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { COLORS, SIZES, FONTS } from '../constants';
import { CollectionCard, CollectionsHeader, ModalAddCollection } from '../components';
import { wishlistLoad } from '../actions/productActions';
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
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.white,
	},
});

function Collections({ navigation }) {
	const dispatch = useDispatch();

	const userSignin = useSelector((state) => state.userSignin);
	const { userToken } = userSignin;
	const loadWishlist = useSelector((state) => state.loadWishlist);
	const {
		loading, error, products, totalPages,
	} = loadWishlist;

	const [refreshControl, setRefreshControl] = useState(false);

	const [pageNum, setPageNum] = useState(1);
	const [items, setItems] = useState([]);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	useEffect(() => {
		dispatch(wishlistLoad(1));
	}, [dispatch]);

	useEffect(() => {
		if (products) {
			setItems(products);
		}
	}, [products]);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const changeModalVisibility = (bool) => {
		setIsModalVisible(bool);
	};

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
					<View style={{ alignItems: 'center' }}>
						<FlatList
							data={items}
							renderItem={({ item }) => (
								<CollectionCard product={item} navigation={navigation} />
							)}
							numColumns={2}
							keyExtractor={(item) => item?._id}
							contentContainerStyle={{
								columnGap: SIZES.medium,
							}}
							ListHeaderComponent={(
								<CollectionsHeader
									navigation={navigation}
									onAdd={() => changeModalVisibility(true)}
								/>
							)}
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
										dispatch(wishlistLoad(1));
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
										console.log('Collection List Load error: ', err);
									} finally {
										setIsLoadingMore(false);
									}
								}
							}}
							onEndReachedThreshold={0.2}
						/>
						<Modal
							transparent
							animationType="fade"
							visible={isModalVisible}
							onRequestClose={() => changeModalVisibility(false)}
						>
							<ModalAddCollection changeModalVisibility={changeModalVisibility} />
						</Modal>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
}

export default Collections;
