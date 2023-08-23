import {
	View, StyleSheet, TouchableHighlight,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import FastImage from 'react-native-fast-image';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@rneui/themed';
import { Text } from '@react-native-material/core';
import {
	COLORS, SIZES, SHADOWS,
} from '../../constants';
import { formatNumber } from '../../utils/utils';

const cardWidth = SIZES.WIDTH / 2 - 20;

const styles = StyleSheet.create({
	card: {
		height: 220,
		width: cardWidth,
		marginHorizontal: 10,
		marginBottom: 10,
		marginTop: 50,
		borderRadius: 15,
		elevation: 13,
		backgroundColor: COLORS.white,
	},
	addToCartBtn: {
		height: 30,
		width: 30,
		borderRadius: 20,
		backgroundColor: COLORS.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function ProductCard({ product, navigation }) {
	return (
		<TouchableHighlight
			underlayColor={COLORS.white}
			activeOpacity={0.9}
			onPress={() => navigation.navigate('Details', { productId: product.id ? product.id : product._id })}
		>
			<View style={styles.card}>
				<View style={{ alignItems: 'center', top: -30 }}>
					<FastImage
						source={{
							uri: product.images[0] ? product.images[0] : 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png',
							priority: FastImage.priority.normal,
						}}
						resizeMode={FastImage.resizeMode.cover}
						style={{
							height: 120, width: 120, ...SHADOWS.dark, borderRadius: 10,
						}}
					/>
				</View>
				<View style={{ marginHorizontal: 10 }}>
					<Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: SIZES.font, fontWeight: 'bold' }}>
						{product.title}
					</Text>
					<Text style={{ fontSize: SIZES.base, color: COLORS.grey, marginTop: 2 }}>
						{product.shopName}
					</Text>
				</View>

				<View
					style={{
						marginTop: 10,
						marginHorizontal: 10,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Text style={{ fontSize: 18, fontWeight: 'bold' }}>
						{formatNumber(product.price)}
					</Text>
					<View style={styles.addToCartBtn}>
						<Icon name="add" size={20} color={COLORS.white} />
					</View>
				</View>
			</View>
		</TouchableHighlight>
	);
}

export default React.memo(ProductCard);
