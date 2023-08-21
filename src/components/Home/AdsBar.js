import {
	View, StyleSheet, FlatList, ActivityIndicator, Text,
} from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SIZES, FONTS, COLORS } from '../../constants';
import AdsCard from '../Common/AdsCard';
import { bannerAdsGet } from '../../actions/productActions';

const styles = StyleSheet.create({
	container: {
		marginHorizontal: SIZES.base,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerTitle: {
		fontFamily: FONTS.semiBold,
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

function AdsBar() {
	const dispatch = useDispatch();
	const getBannerAds = useSelector((state) => state.getBannerAds);
	const { ads, loading, error } = getBannerAds;

	const [items, setItems] = useState([]);

	useEffect(() => {
		dispatch(bannerAdsGet());
	}, [dispatch]);

	const flatListRef = useRef(null);
	let i = 0;

	useEffect(() => {
		const scrollFlatList = () => {
			flatListRef?.current?.scrollToIndex({ animated: true, index: i });
			i = (i + 1) % (ads?.length || 1);
		};

		const intervalId = setInterval(scrollFlatList, 3000);

		return () => {
			clearInterval(intervalId);
		};
	}, [ads]);

	useEffect(() => {
		if (ads) {
			setItems(ads.map((obj) => obj.bannerAds));
		}
	}, [ads]);

	return (
		<View style={{ marginVertical: 40, marginTop: 70 }}>
			{loading ? (
				<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
					<ActivityIndicator size="large" color={COLORS.primary} />
				</View>
			) : error ? (
				<Text style={{ textAlign: 'center', color: COLORS.black }}>Quảng cáo chưa có sẵn dành cho bạn</Text>
			) : (
				<View style={styles.container}>
					<View style={styles.cardsContainer}>
						<FlatList
							ref={flatListRef}
							data={items}
							renderItem={({ item }) => (
								<AdsCard data={item} />
							)}
							keyExtractor={(item) => item.id.toString()} // Convert ID to string
							showsHorizontalScrollIndicator={false}
							bounces={false}
							horizontal
						/>
					</View>
				</View>
			)}
		</View>
	);
}

export default AdsBar;
