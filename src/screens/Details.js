import {
	View, StatusBar, ScrollView, ToastAndroid, ActivityIndicator,
	FlatList, Animated, Linking, StyleSheet, Modal, TouchableOpacity,
} from 'react-native';
import {
	Text, IconButton, Button, Badge,
} from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import Clipboard from '@react-native-clipboard/clipboard';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@rneui/themed';

import { COLORS, SIZES, FONTS } from '../constants';
import { ErrorView, RenderImageItem } from '../components';
import { PRODUCT_COLLECTION_DETAILS_ADD_RESET, PRODUCT_COLLECTION_DETAILS_REMOVE_RESET } from '../constants/productConstants';
import { formatNumber } from '../utils/utils';
import ModalAddToCollection from '../components/Results/ModalAddToCollection';
import { collectionsLoad, productGetById, productHistorySet } from '../actions/productActions';

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: COLORS.white,
		position: 'relative',
	},
	imgContainer: {
		width: '100%',
		backgroundColor: COLORS.black,
		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 20,
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 4,
		paddingTop: 5,
	},
	btnAction: {
		fontSize: 20,
		color: COLORS.primary,
		padding: 5,
		backgroundColor: COLORS.white,
	},
	imgIndicatorContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: SIZES.base,
		marginBottom: SIZES.base,
	},
	imgIndicator: (opacity) => ({
		width: '2%',
		height: 2.4,
		backgroundColor: COLORS.white,
		opacity,
		marginHorizontal: SIZES.base / 2,
		borderRadius: 100,
	}),
	returnContainer: {
		position: 'absolute',
		top: 5,
		left: 15,
		zIndex: 1,
	},
	wishlistContainer: {
		position: 'absolute',
		top: 5,
		right: 15,
		zIndex: 1,
	},
	touchableOpacity: {
		borderRadius: 20,
		backgroundColor: COLORS.white,
	},
	infoContainer: {
		paddingHorizontal: 16,
		marginTop: 6,
		marginBottom: SIZES.HEIGHT * (10 / 100),
	},
	groupContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 2,
	},
	groupIcon: {
		fontSize: 18,
		color: COLORS.primary,
		marginRight: 6,
	},
	groupLabel: {
		fontSize: SIZES.font,
		color: COLORS.black,
		letterSpacing: 1,
		opacity: 0.8,
	},
	titleContainer: {
		flexDirection: 'row',
		marginVertical: 4,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 24,
		fontFamily: FONTS.bold,
		letterSpacing: 0.5,
		marginVertical: 4,
		color: COLORS.black,
		maxWidth: '85%',
	},
	linkIcon: {
		fontSize: 28,
		color: COLORS.black,
		marginRight: 6,
		backgroundColor: COLORS.primary,
		padding: 12,
		borderRadius: 28,
	},
	description: {
		fontSize: SIZES.small,
		color: COLORS.black,
		fontFamily: FONTS.medium,
		letterSpacing: 1,
		opacity: 0.5,
		lineHeight: 20,
		maxWidth: '84%',
		marginBottom: 18,
	},
	locationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 14,
		borderBottomColor: COLORS.backroundLight,
		borderBottomWidth: 1,
		paddingBottom: 20,
	},
	location: {
		flexDirection: 'row',
		width: '80%',
		alignItems: 'center',
	},
	locationSection: {
		color: COLORS.primary,
		backgroundColor: COLORS.primary,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 12,
		borderRadius: 100,
		marginRight: 10,
	},
	price: {
		width: 'auto',
		fontFamily: FONTS.medium,
		color: COLORS.secondary,
		fontSize: SIZES.large,
	},
	priceContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: SIZES.base,
	},
	floatButtonContainer: {
		position: 'absolute',
		bottom: 5,
		height: '8%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	floatButton: {
		width: '86%',
		backgroundColor: COLORS.primary,
		borderRadius: 20,
		justifyContent: 'center',
	},
	floatButtonLabel: {
		fontSize: 12,
		fontFamily: FONTS.bold,
		letterSpacing: 1,
		color: COLORS.white,
		textTransform: 'uppercase',
	},
});

function Details({ route, navigation }) {
	const dispatch = useDispatch();

	const userSignin = useSelector((state) => state.userSignin);
	const { userToken } = userSignin;

	// product data extracted from the results screen
	const { productId } = route.params;

	// image carousel swipe configuration
	const scrollX = new Animated.Value(0);
	const position = Animated.divide(scrollX, SIZES.WIDTH);

	const [isModalVisible, setModalVisible] = useState(false);

	const handleToggleModal = () => {
		setModalVisible((prevState) => !prevState);
	};

	const loadCollections = useSelector((state) => state.loadCollections);
	const {
		collections,
	} = loadCollections;

	const getProductById = useSelector((state) => state.getProductById);
	const {
		error, loading, product,
	} = getProductById;

	// as the screen shows up, load the list of collections from backend storage
	useEffect(() => {
		dispatch(productGetById(productId));
		if (userToken !== undefined && userToken !== null) {
			dispatch(collectionsLoad());
		}
	}, [dispatch]);

	useEffect(() => {
		if (product) {
			dispatch(productHistorySet(product));
		}
	}, [product]);

	// if the product is added/removed successfully,
	// then change color of the heart icon and toast a message
	const addCollectionDetails = useSelector((state) => state.addCollectionDetails);
	const { successAddCollectionDetails, errorAddCollectionDetails } = addCollectionDetails;
	useEffect(() => {
		if (successAddCollectionDetails) {
			ToastAndroid.showWithGravity(
				'Đã thêm vào bộ sưu tập',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
			dispatch({ type: PRODUCT_COLLECTION_DETAILS_ADD_RESET });
		}
		if (errorAddCollectionDetails) {
			ToastAndroid.showWithGravity(
				'Lỗi. Không thể thêm sản phẩm vào bộ sưu tập',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
			dispatch({ type: PRODUCT_COLLECTION_DETAILS_REMOVE_RESET });
		}
	}, [successAddCollectionDetails, errorAddCollectionDetails]);

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{loading ? (
				<ActivityIndicator style={styles.container} size="large" color={COLORS.primary} />
			) : error ? (
				<ErrorView navigation={navigation} />
			) : (
				<View style={styles.container}>
					<StatusBar backgroundColor={COLORS.black} barStyle="dark-content" />
					<ScrollView>
						<View style={styles.imgContainer}>
							<View style={styles.returnContainer}>
								<IconButton
									onPress={() => navigation.goBack()}
									icon={(
										<Icon
											name="arrow-back-outline"
											type="ionicon"
											size={24}
											color={COLORS.black}
										/>
									)}
									contentContainerStyle={{
										backgroundColor: COLORS.button,
										opacity: 0.8,
									}}
								/>
							</View>
							{userToken !== undefined && userToken !== null && (
								<View style={styles.wishlistContainer}>
									<IconButton
										onPress={handleToggleModal}
										icon={(
											<Icon
												name="heart-outline"
												type="ionicon"
												size={24}
												color={COLORS.black}
											/>
										)}
										contentContainerStyle={{
											backgroundColor: COLORS.button,
											opacity: 0.8,
										}}
									/>
								</View>
							)}
							<FlatList
								data={product.images ? product.images : null}
								horizontal
								keyExtractor={(item, index) => index.toString()}
								renderItem={({ item }) => (
									<RenderImageItem item={item} />
								)}
								showsHorizontalScrollIndicator={false}
								decelerationRate={0.8}
								snapToInterval={SIZES.WIDTH}
								bounces={false}
								onScroll={Animated.event(
									[{ nativeEvent: { contentOffset: { x: scrollX } } }],
									{ useNativeDriver: false },
								)}
							/>
							<View style={styles.imgIndicatorContainer}>
								{
									product.images
										? product.images.map((img, index) => {
											const opacity = position.interpolate({
												inputRange: [index - 1, index, index + 1],
												outputRange: [0.2, 1, 0.2],
												extrapolate: 'clamp',
											});

											return (
												<Animated.View key={index} style={styles.imgIndicator(opacity)} />
											);
										}) : null
								}
							</View>
						</View>
						<View style={styles.infoContainer}>
							{product?.categories && (
								<View style={styles.groupContainer}>
									<Icon
										name="shirt"
										type="ionicon"
										style={styles.groupIcon}
										color={COLORS.primary}
									/>
									<Text style={styles.groupLabel}>
										{product.categories.length > 0 ? product.categories.join(', ') : 'Sản phẩm thời trang'}
									</Text>
								</View>
							)}
							<View style={styles.titleContainer}>
								<Text variant="button" style={styles.title}>
									{product.title}
								</Text>
								<TouchableOpacity
									onPress={() => {
										Clipboard.setString(product.title);
										ToastAndroid.show(
											'Đã lưu vào clipboard',
											ToastAndroid.SHORT,
											ToastAndroid.BOTTOM,
										);
									}}
								>
									<Icon
										name="attach-outline"
										type="ionicon"
										style={styles.linkIcon}
									/>
								</TouchableOpacity>
							</View>
							<View style={styles.priceContainer}>
								<Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.large }}>Giá: </Text>
								<Badge
									label={`${formatNumber(product.price)} VND`}
									color={COLORS.primary}
									labelStyle={styles.price}
									style={{
										height: SIZES.extraLarge,
									}}
								/>
							</View>
							<View style={styles.locationContainer}>
								<View style={styles.location}>
									<View style={styles.locationSection}>
										<Icon
											name="cart-outline"
											type="ionicon"
											style={{ fontSize: 28, color: COLORS.black }}
										/>
									</View>
									<Text variant="overline" style={{ fontSize: SIZES.font }}>
										{product.shopName}
									</Text>
								</View>
								<Icon
									name="chevron-forward-outline"
									type="ionicon"
									style={{ fontSize: 28 }}
									color={COLORS.primary}
								/>
							</View>
							<Text style={styles.description}>
								{product.description}
							</Text>
						</View>
					</ScrollView>

					<View style={styles.floatButtonContainer}>
						<Button
							title="Đi tới cửa hàng"
							uppercase={false}
							color={COLORS.primary}
							onPress={() => { Linking.openURL(product.url); }}
							style={styles.floatButton}
						/>
					</View>

					{/* Scroll View Modal */}
					<Modal
						animationType="fades"
						transparent
						visible={isModalVisible}
						onRequestClose={handleToggleModal}
					>
						<ModalAddToCollection
							collections={collections}
							onClose={handleToggleModal}
							productId={product._id}
						/>
					</Modal>
				</View>
			)}
		</>
	);
}

export default Details;
