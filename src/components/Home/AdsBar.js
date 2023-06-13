import {
	View, StyleSheet, FlatList,
} from 'react-native';
import React, { useRef, useEffect } from 'react';

import { SIZES, FONTS, COLORS } from '../../constants';
import AdsCard from '../Common/AdsCard';

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

const ADS = [
	{
		id: 1,
		name: 'Uniqlo',
		image: 'https://kenh14cdn.com/thumb_w/600/pr/2022/photo1650422521501-16504225223311599178458-63786054031463.jpg',
		url: 'https://www.uniqlo.com/vn/vi/',
	},
	{
		id: 2,
		name: 'Boo',
		image: 'https://perfecthome.vn/data/uploads/images/1602920464_boo-2.png',
		url: 'https://boo.vn/',
	},
	{
		id: 3,
		name: 'Zara',
		image: 'https://img.vietnamfinance.vn/thumbs/700x0/upload/news/quynhanh/2023/3/1/Zara.jpeg',
		url: 'https://www.zara.com/vn/',
	},
];

function AdsBar() {
	const flatListRef = useRef(null);
	let i = 0;

	useEffect(() => {
		const scrollFlatList = () => {
			flatListRef?.current?.scrollToIndex({ animated: true, index: i });
			i = (i + 1) % ADS.length;
		};

		const intervalId = setInterval(scrollFlatList, 3000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<View>
			<View style={styles.container}>
				<View style={styles.cardsContainer}>
					<FlatList
						ref={flatListRef}
						data={ADS}
						renderItem={({ item }) => (
							<AdsCard data={item} />
						)}
						keyExtractor={(item) => item.id}
						showsHorizontalScrollIndicator={false}
						bounces={false}
						horizontal
					/>
				</View>
			</View>
		</View>
	);
}

export default AdsBar;
