import React, { useEffect, useState } from 'react';
import {
	View, Text, SafeAreaView, StyleSheet, ActivityIndicator,
	FlatList, StatusBar, RefreshControl, Modal, ToastAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, SIZES, FONTS } from '../constants';
import {
	CollectionCard, CollectionsHeader, ModalAddCollection, NoResultsFound,
} from '../components';
import { collectionsLoad } from '../actions/productActions';
import {
	PRODUCT_COLLECTIONS_ADD_RESET, PRODUCT_COLLECTIONS_REMOVE_RESET, PRODUCT_COLLECTIONS_UPDATE_RESET,
} from '../constants/productConstants';

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

	const loadCollections = useSelector((state) => state.loadCollections);
	const {
		loading, error, collections,
	} = loadCollections;

	const [refreshControl, setRefreshControl] = useState(false);
	const [items, setItems] = useState([]);

	// as the screen shows up, load the list of collections from backend storage
	useEffect(() => {
		dispatch(collectionsLoad());
	}, [dispatch]);

	// if the list of collections is successfully loaded, set the list data to the item variable.
	useEffect(() => {
		if (collections) {
			setItems(collections);
		}
	}, [collections]);

	// Handle the add collection action, show the add modal
	const [isAddModalVisible, setIsAddModalVisible] = useState(false);
	const changeAddModalVisibility = (bool) => {
		setIsAddModalVisible(bool);
	};

	// if the user add success, reload screen
	const addCollections = useSelector((state) => state.addCollections);
	const { successAddCollections } = addCollections;

	// if the user remove success, reload screen
	const removeCollections = useSelector((state) => state.removeCollections);
	const { successRemoveCollections } = removeCollections;

	// if the user update success, reload screen
	const updateCollections = useSelector((state) => state.updateCollections);
	const { successUpdateCollections } = updateCollections;

	useEffect(() => {
		if (successAddCollections) {
			dispatch(collectionsLoad());
			ToastAndroid.showWithGravity(
				'Tạo bộ sưu tập mới thành công',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
			dispatch({ type: PRODUCT_COLLECTIONS_ADD_RESET });
			changeAddModalVisibility(false);
		}
		if (successRemoveCollections) {
			dispatch(collectionsLoad());
			ToastAndroid.showWithGravity(
				'Đã xóa bộ sưu tập',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
			dispatch({ type: PRODUCT_COLLECTIONS_REMOVE_RESET });
		}
		if (successUpdateCollections) {
			dispatch(collectionsLoad());
			ToastAndroid.showWithGravity(
				'Đã cập nhật tên bộ sưu tập',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
			dispatch({ type: PRODUCT_COLLECTIONS_UPDATE_RESET });
		}
	}, [successAddCollections, successRemoveCollections, successUpdateCollections]);

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
					<View style={{ flex: 1 }}>
						<FlatList
							data={items}
							renderItem={({ item }) => (
								<CollectionCard
									collection={item}
									navigation={navigation}
								/>
							)}
							numColumns={2}
							keyExtractor={(item) => item?.id}
							contentContainerStyle={{
								columnGap: SIZES.medium,
							}}
							ListHeaderComponent={(
								<CollectionsHeader
									navigation={navigation}
									onAdd={() => changeAddModalVisibility(true)}
								/>
							)}
							stickyHeaderIndices={[0]}
							showsVerticalScrollIndicator={false}
							refreshControl={(
								<RefreshControl
									refreshing={refreshControl}
									onRefresh={() => {
										setRefreshControl(true);
										dispatch(collectionsLoad());
										setRefreshControl(false);
									}}
								/>
							)}
							onEndReachedThreshold={0.2}
							ListEmptyComponent={<NoResultsFound />}
						/>
						<Modal
							transparent
							animationType="fade"
							visible={isAddModalVisible}
							onRequestClose={() => changeAddModalVisibility(false)}
						>
							<ModalAddCollection changeModalVisibility={changeAddModalVisibility} />
						</Modal>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
}

export default Collections;
