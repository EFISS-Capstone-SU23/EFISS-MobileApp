import {
	View, Text, StatusBar, TouchableOpacity,
	FlatList, Animated, Linking, StyleSheet,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { COLORS, FONTS, SIZES } from '../constants';
import { RenderImageItem } from '../components';
import { AuthContext } from '../context/AuthContext';
import { wishlistAdd, wishlistRemove } from '../actions/productActions';
import { config } from '../../config';
import { PRODUCT_WISHLIST_ADD_RESET, PRODUCT_WISHLIST_REMOVE_RESET } from '../constants/productConstants';

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		position: 'relative',
	},
	scrollSection: {
		width: '100%',
		backgroundColor: COLORS.black,
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 4,
	},
	buttonBar: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: SIZES.base,
		paddingLeft: 16,
		marginBottom: SIZES.base,
		paddingBottom: SIZES.base,
		backgroundColor: COLORS.primary,
	},
	button: {
		fontSize: SIZES.large,
		padding: 12,
		backgroundColor: COLORS.white,
		borderRadius: 20,
	},
	imgContainer: {
		width: SIZES.WIDTH,
		height: (SIZES.HEIGHT * 2) / 5,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.black,
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
	category: {
		fontSize: SIZES.font,
		color: COLORS.black,
		fontFamily: FONTS.regular,
	},
	titleContainer: {
		flexDirection: 'row',
		marginVertical: 4,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: SIZES.extraLarge,
		color: COLORS.tertiary,
		fontFamily: FONTS.bold,
		letterSpacing: 0.5,
		marginVertical: 4,
		maxWidth: '84%',
	},
	copyButton: {
		fontSize: SIZES.extraLarge,
		color: COLORS.primary,
		marginRight: 6,
		backgroundColor: COLORS.lightGray,
		padding: 8,
		borderRadius: 100,
	},
	price: {
		fontSize: SIZES.medium,
		fontFamily: FONTS.semiBold,
		maxWidth: '85%',
		color: COLORS.primary,
		opacity: 0.7,
	},
	locationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: SIZES.medium,
		borderTopColor: COLORS.primary,
		borderTopWidth: 1,
		borderBottomColor: COLORS.primary,
		borderBottomWidth: 1,
		paddingVertical: SIZES.base,
	},
	location: {
		color: COLORS.primary,
		backgroundColor: COLORS.lightGray,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 12,
		borderRadius: 100,
		marginRight: 10,
	},
	description: {
		fontSize: SIZES.font,
		color: COLORS.black,
		fontFamily: FONTS.regular,
		letterSpacing: 1,
		opacity: 0.5,
		lineHeight: 20,
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
			dispatch({ type: PRODUCT_WISHLIST_ADD_RESET });
		}
		if (successRemoveWishlist) {
			isInWishlist(userToken, productData._id);
			dispatch({ type: PRODUCT_WISHLIST_REMOVE_RESET });
		}
	}, [successAddWishlist, successRemoveWishlist]);

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={COLORS.primary} />
			<ScrollView>
				<View style={styles.scrollSection}>
					<View style={styles.buttonBar}>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Entypo name="chevron-left" style={styles.button} color={COLORS.primary} />
						</TouchableOpacity>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								paddingHorizontal: SIZES.medium,
							}}
						>
							{userToken !== null && (
								<TouchableOpacity
									style={{ marginLeft: 5 }}
									onPress={() => {
										if (!inWishlist) dispatch(wishlistAdd(userToken, productData._id));
										else dispatch(wishlistRemove(userToken, productData._id));
									}}
								>
									<Entypo name="heart" color={inWishlist ? COLORS.red : COLORS.black} style={styles.button} />
								</TouchableOpacity>
							)}

							<TouchableOpacity
								style={{ marginLeft: 5 }}
								onPress={() => { Linking.openURL(productData.url); }}
							>
								<Entypo name="share" style={styles.button} color={COLORS.primary} />
							</TouchableOpacity>
						</View>
					</View>
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
				<View style={{ margin: SIZES.font }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Entypo
							name="shopping-cart"
							style={{ fontSize: SIZES.large, color: COLORS.primary, marginRight: 6 }}
						/>
						<Text style={styles.category}>
							{productData.group}
						</Text>
					</View>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>
							{productData.title}
						</Text>
						<Ionicons name="link-outline" style={styles.copyButton} />
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Entypo name="credit" style={{ fontSize: SIZES.medium, color: COLORS.quaternary }} />
						<Text style={styles.price}>
							{productData.price}
						</Text>
					</View>
					<View style={styles.locationContainer}>
						<View style={{ flexDirection: 'row', width: '80%', alignItems: 'center' }}>
							<View style={styles.location}>
								<Entypo name="location-pin" style={{ fontSize: SIZES.medium, color: COLORS.primary }} />
							</View>
							<Text>Hanoi</Text>
						</View>
						<Entypo name="chevron-right" style={{ fontSize: 22, color: COLORS.primary }} />
					</View>
					<View>
						<Text style={{ fontSize: SIZES.medium, color: COLORS.primary, fontFamily: FONTS.bold }}>
							Mô tả sản phẩm:
						</Text>
						<Text style={styles.description}>
							{productData.description}
						</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

export default Details;
