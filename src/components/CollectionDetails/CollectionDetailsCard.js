import {
	View, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import FastImage from 'react-native-fast-image';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { Badge, Text, IconButton } from '@react-native-material/core';

import { productHistorySet, collectionDetailsRemove } from '../../actions/productActions';
import {
	COLORS, SIZES, FONTS,
} from '../../constants';
import { formatNumber } from '../../utils/utils';
import { config } from '../../../config';

const cardWidth = SIZES.WIDTH / 2 - 20;

const styles = StyleSheet.create({
	container: {
		width: cardWidth,
		backgroundColor: COLORS.white,
		borderRadius: SIZES.medium,
	},
	productImage: {
		height: '100%',
		borderTopLeftRadius: SIZES.base,
		borderTopRightRadius: SIZES.base,
		elevation: 5,
	},
	productTitle: {
		fontSize: SIZES.medium,
		fontFamily: FONTS.bold,
		color: COLORS.black,
	},
	priceSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	priceContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 5,
	},
	productPrice: {
		color: COLORS.secondary,
		fontFamily: FONTS.medium,
		fontSize: 12,
	},
	groupContainer: {
		marginBottom: SIZES.base / 4,
	},
	group: {
		color: COLORS.secondary,
		fontFamily: FONTS.light,
		fontSize: SIZES.small,
		opacity: 0.8,
	},
	ratingContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 5,
	},
	productRating: {
		color: COLORS.secondary,
		fontFamily: FONTS.bold,
		fontSize: 12,
		marginLeft: 2,
	},
	optionContainer: {
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: 1,
	},
});

function CollectionDetailsCard({
	collectionId, product, navigation, index,
}) {
	const dispatch = useDispatch();
	const even = (index + 1) % 2 === 0;

	return (
		// eslint-disable-next-line max-len
		<View style={[styles.container, { marginLeft: !even ? 15 : 0, marginRight: even ? 15 : 0, marginTop: 10 }]}>
			<View style={{ width: '100%', height: 150 }}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Details', { productId: product.id });
					}}
				>
					<FastImage
						source={{
							uri: config.IS_LOCAL
								? product.imagesList[0]?.replace(
									'https://storage.googleapis.com',
									config.IMG_STORAGE_URL,
								)
								: product.imagesList[0] || 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png',
							priority: FastImage.priority.normal,
						}}
						resizeMode={FastImage.resizeMode.cover}
						style={styles.productImage}
					/>

					<View style={styles.optionContainer}>
						<IconButton
							icon={(
								<Entypo
									name="squared-cross"
									size={24}
									color={COLORS.red}
								/>
							)}
							contentContainerStyle={{
								opacity: 0.8,
								backgroundColor: COLORS.white,
							}}
							onPress={() => {
								Alert.alert(
									'Cảnh báo',
									'Bạn muốn xóa sản phẩm này khỏi bộ sưu tập?',
									[
										{ text: 'Đúng', onPress: () => dispatch(collectionDetailsRemove(collectionId, product.id)) },
										{ text: 'Không', style: 'cancel' },
									],
								);
							}}
						/>
					</View>
				</TouchableOpacity>
			</View>
			<View style={{ width: '100%', padding: SIZES.base }}>
				<View style={{ marginBottom: SIZES.base }}>
					<Text
						variant="subtitle2"
						numberOfLines={2}
						onPress={() => {
							dispatch(productHistorySet(product));
							navigation.navigate('Details', { productId: product.id });
						}}
					>
						{product.title}
					</Text>
				</View>
				<View style={styles.priceSection}>
					<View style={styles.priceContainer}>
						<Badge
							label={formatNumber(product.price)}
							color={COLORS.primary}
							labelStyle={styles.productPrice}
						/>
					</View>
				</View>
			</View>
		</View>
	);
}

export default React.memo(CollectionDetailsCard);
