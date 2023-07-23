import {
	View, Image, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { Badge, Text, IconButton } from '@react-native-material/core';

import { productHistorySet, collectionDetailsRemove } from '../../actions/productActions';
import {
	COLORS, SIZES, FONTS,
} from '../../constants';
import { formatNumber } from '../../utils/utils';

const styles = StyleSheet.create({
	container: {
		width: '47%',
		backgroundColor: COLORS.white,
		margin: 5,
		borderTopLeftRadius: SIZES.base,
		borderTopRightRadius: SIZES.base,
	},
	productImage: {
		height: '100%',
		borderTopLeftRadius: SIZES.base,
		borderTopRightRadius: SIZES.base,
	},
	productTitle: {
		fontSize: SIZES.medium,
		fontFamily: FONTS.semiBold,
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
		color: COLORS.white,
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
		fontFamily: FONTS.semiBold,
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

function CollectionDetailsCard({ collectionId, product, navigation }) {
	const dispatch = useDispatch();

	return (
		<View style={styles.container}>
			<View style={{ width: '100%', height: 150 }}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Details', { productId: product.id });
					}}
				>
					<Image
						source={{
							uri: product.imagesList[0] ? product.imagesList[0] : 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png',
						}}
						resizeMode="cover"
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
				<View style={styles.groupContainer}>
					<Text style={styles.group}>
						{product.group}
					</Text>
				</View>
				<View style={{ marginBottom: SIZES.base }}>
					<Text
						variant="subtitle2"
						numberOfLines={1}
						onPress={() => {
							dispatch(productHistorySet(product));
							navigation.navigate('Details', { productId: product.id });
						}}
					>
						{product.title}
					</Text>
				</View>
				<View style={styles.priceSection}>
					<View style={styles.ratingContainer}>
						<Entypo name="star" size={SIZES.small} color={COLORS.yellow} />
						<Text style={styles.productRating}>
							4.5
						</Text>
					</View>
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
