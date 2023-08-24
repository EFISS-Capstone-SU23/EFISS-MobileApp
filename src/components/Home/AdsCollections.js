import {
	View, Text, StyleSheet, FlatList,
} from 'react-native';
import { ActivityIndicator } from '@react-native-material/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { collectionAdsGet } from '../../actions/productActions';
import { FONTS, SIZES, COLORS } from '../../constants';
import CarouselCard from '../Common/CarouselCard';

const styles = StyleSheet.create({
	container: {
		marginHorizontal: SIZES.base,
		marginVertical: SIZES.medium,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerTitle: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.extraLarge,
		color: COLORS.black,
	},
	headerBtn: {
		fontSize: SIZES.small,
		fontFamily: FONTS.medium,
		color: COLORS.primary,
		backgroundColor: COLORS.white,
		borderRadius: SIZES.small,
		padding: SIZES.base / 2,
	},
	cardsContainer: {
		marginTop: SIZES.medium,
	},
});

function AdsCollections({ navigation }) {
	const dispatch = useDispatch();
	const getCollectionAds = useSelector((state) => state.getCollectionAds);
	const { ads, loading, error } = getCollectionAds;
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused && (ads === null || ads === undefined)) {
			dispatch(collectionAdsGet());
		}
	}, [dispatch, isFocused]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>{ads ? ads?.collectionAds?.name : 'Bộ sưu tập dành cho bạn'}</Text>
			</View>

			<View style={styles.cardsContainer}>
				{loading ? (
					<ActivityIndicator size="large" color={COLORS.primary} />
				) : error ? (
					<Text style={{ textAlign: 'center', color: COLORS.black, fontFamily: FONTS.regular }}>EFISS chưa có bộ sưu tập nào cho bạn</Text>
				) : (ads?.collectionAds?.products?.length === 0) ? (
					<Text style={{ textAlign: 'center', color: COLORS.black, fontFamily: FONTS.regular }}>EFISS chưa có bộ sưu tập nào cho bạn</Text>
				) : (
					<FlatList
						data={ads?.collectionAds?.products}
						renderItem={({ item }) => (
							<CarouselCard product={item} navigation={navigation} />
						)}
						keyExtractor={(item) => item._id}
						showsHorizontalScrollIndicator={false}
						horizontal
					/>
				)}
			</View>
		</View>
	);
}

export default AdsCollections;
