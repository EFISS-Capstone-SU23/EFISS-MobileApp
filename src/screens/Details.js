import {
	View, StatusBar, ScrollView, TouchableOpacity,
	FlatList, Animated, Linking, StyleSheet, ToastAndroid,
} from 'react-native';
import { Text } from '@react-native-material/core';
import React, { useContext, useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { COLORS, SIZES } from '../constants';
import { RenderImageItem } from '../components';
import { AuthContext } from '../context/AuthContext';
import { wishlistAdd, wishlistRemove } from '../actions/productActions';
import { config } from '../../config';
import { PRODUCT_WISHLIST_ADD_RESET, PRODUCT_WISHLIST_REMOVE_RESET } from '../constants/productConstants';

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
		fontSize: 18,
		color: COLORS.primary,
		padding: 12,
		borderRadius: 10,
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
		marginVertical: 14,
	},
	groupIcon: {
		fontSize: 18,
		color: COLORS.primary,
		marginRight: 6,
	},
	groupLabel: {
		fontSize: SIZES.font,
		color: COLORS.black,
	},
	titleContainer: {
		flexDirection: 'row',
		marginVertical: 4,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 24,
		fontWeight: 600,
		letterSpacing: 0.5,
		marginVertical: 4,
		color: COLORS.black,
		maxWidth: '84%',
	},
	linkIcon: {
		fontSize: 18,
		color: COLORS.primary,
		marginRight: 6,
		backgroundColor: COLORS.backroundLight,
		padding: 12,
		borderRadius: 20,
	},
	description: {
		fontSize: SIZES.small,
		color: COLORS.black,
		fontWeight: '400',
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
		backgroundColor: COLORS.backroundLight,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 12,
		borderRadius: 100,
		marginRight: 10,
	},
	priceContainer: {
		fontSize: 18,
		fontWeight: '500',
		maxWidth: '84%',
		color: COLORS.black,
		marginBottom: 4,
	},
	floatButtonContainer: {
		position: 'absolute',
		bottom: 10,
		height: '8%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	floatButton: {
		width: '86%',
		height: '90%',
		backgroundColor: COLORS.primary,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	floatButtonLabel: {
		fontSize: 12,
		fontWeight: '500',
		letterSpacing: 1,
		color: COLORS.white,
		textTransform: 'uppercase',
	},
});

function Details({ route, navigation }) {
	const { userToken } = useContext(AuthContext);
	const dispatch = useDispatch();
	// product data extracted from the results screen
	const { productData } = route.params;

	// image carousel swipe configuration
	const scrollX = new Animated.Value(0);
	const position = Animated.divide(scrollX, SIZES.WIDTH);

	const [inWishlist, setInWishlist] = useState(false);
	const isInWishlist = async (token, productId) => {
		try {
			const { data } = await axios.get(`${config.BE_BASE_API}/${config.WISHLIST_ROUTER}/${productId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setInWishlist(data.existed);
		} catch (error) {
			console.log('isInWishlist error: ', error);
		}
	};
	useEffect(() => {
		if (userToken) {
			isInWishlist(userToken, productData._id);
		}
	}, [dispatch]);

	// if the product is added/removed successfully,
	// then change color of the heart icon and toast a message
	const addWishlist = useSelector((state) => state.addWishlist);
	const { successAddWishlist } = addWishlist;
	const removeWishlist = useSelector((state) => state.removeWishlist);
	const { successRemoveWishlist } = removeWishlist;
	useEffect(() => {
		if (successAddWishlist) {
			isInWishlist(userToken, productData._id);
			ToastAndroid.showWithGravity(
				'Đã thêm vào wishlist',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
			dispatch({ type: PRODUCT_WISHLIST_ADD_RESET });
		}
		if (successRemoveWishlist) {
			isInWishlist(userToken, productData._id);
			ToastAndroid.showWithGravity(
				'Đã xóa khỏi wishlist',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
			dispatch({ type: PRODUCT_WISHLIST_REMOVE_RESET });
		}
	}, [successAddWishlist, successRemoveWishlist]);

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={COLORS.black} barStyle="dark-content" />
			<ScrollView>
				<View style={styles.imgContainer}>
					<View style={styles.returnContainer}>
						<TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.goBack()}>
							<Entypo name="chevron-left" style={styles.btnAction} />
						</TouchableOpacity>
					</View>
					{userToken !== null && (
						<View style={styles.wishlistContainer}>
							<TouchableOpacity
								style={styles.touchableOpacity}
								onPress={() => {
									if (!inWishlist) dispatch(wishlistAdd(userToken, productData._id));
									else dispatch(wishlistRemove(userToken, productData._id));
								}}
							>
								<Entypo
									name={inWishlist ? 'heart' : 'heart-outlined'}
									style={styles.btnAction}
								/>
							</TouchableOpacity>
						</View>
					)}
					<FlatList
						data={productData.images ? productData.images : null}
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
							productData.images
								? productData.images.map((img, index) => {
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
					<View style={styles.groupContainer}>
						<Entypo name="shopping-cart" style={styles.groupIcon} />
						<Text style={styles.groupLabel}>
							{productData.group}
						</Text>
					</View>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>
							{productData.title}
						</Text>
						<Entypo name="link" style={styles.linkIcon} />
					</View>
					<Text style={styles.description}>
						{productData.description}
					</Text>
					<View style={styles.locationContainer}>
						<View style={styles.location}>
							<View style={styles.locationSection}>
								<Entypo name="location-pin" style={{ fontSize: 16, color: COLORS.primary }} />
							</View>
							<Text>
								Rustaveli Ave 57,
								{'\n'}
								17-001, Batume
							</Text>
						</View>
						<Entypo name="chevron-right" style={{ fontSize: 22, color: COLORS.primary }} />
					</View>
					<View style={{ paddingHorizontal: 16 }}>
						<Text style={styles.priceContainer}>
							<Entypo name="credit" style={{ fontSize: 22, color: COLORS.primary }} />
							{productData.price}
						</Text>
					</View>
				</View>
			</ScrollView>

			<View style={styles.floatButtonContainer}>
				<TouchableOpacity
					style={styles.floatButton}
					onPress={() => { Linking.openURL(productData.url); }}
				>
					<Text style={styles.floatButtonLabel}>
						Đi tới cửa hàng
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default Details;
