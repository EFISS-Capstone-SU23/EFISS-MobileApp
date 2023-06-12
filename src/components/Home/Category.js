import {
	View, Text, StyleSheet, TouchableOpacity, ImageBackground,
} from 'react-native';
import { HStack, VStack } from '@react-native-material/core';
import React from 'react';

import {
	COLORS, FONTS, SHADOWS, SIZES,
} from '../../constants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: SIZES.base,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: SIZES.base,
	},
	headerTitle: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.extraLarge,
		color: COLORS.black,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: SIZES.base / 4,
	},
	square: {
		width: '25%',
		aspectRatio: 1,
		backgroundColor: COLORS.primary,
		borderRadius: SIZES.base,
		...SHADOWS.light,
	},
	textContainer: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		backgroundColor: 'rgba(52, 52, 52, 0.4)',
		borderRadius: 10,
	},
	category: {
		textAlign: 'center',
		color: COLORS.white,
		fontFamily: FONTS.light,
		fontSize: SIZES.medium,
	},
	imageBackground: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		aspectRatio: 1,
		borderRadius: SIZES.base,
	},
});

const categories = [
	{ title: 'Quần jeans', image: 'https://sc04.alicdn.com/kf/HTB1ejCGb1UXBuNjt_a0q6AysXXao.jpg' },
	{ title: 'Áo sơ mi', image: 'https://product.hstatic.net/200000074827/product/pocketearth.jpg_d3b2677797ce4446ad770035d7110dbe_master.jpg' },
	{ title: 'T-Shirt', image: 'https://pyxis.nymag.com/v1/imgs/657/8a8/c1104839c662b60d6690c67c0ed50219ff-bic-black-tshirts.rsquare.w1200.jpg' },
	{ title: 'Váy-đầm', image: 'https://product.hstatic.net/1000304367/product/_dsc0368-3_5b4f7ce86ae94ed09ef3afd1c0fc33cd_master.jpg' },
	{ title: 'Đồ trẻ em', image: 'https://www.frugalmomeh.com/wp-content/uploads/2015/09/IMG_5125.jpg' },
	{ title: 'Sports', image: 'https://www.highsnobiety.com/static-assets/thumbor/01DZMj6YWBgzeWdSnrgpcXN5AdE=/1600x2400/www.highsnobiety.com/static-assets/wp-content/uploads/2017/04/03170214/athleisure-brands-6.jpg' },
	{ title: 'Áo khoác', image: 'https://www.armybox.vn/wp-content/uploads/2019/12/Ao-khoac-nam-3-lop-chong-tham-3.jpg' },
	{ title: 'Đồ bơi', image: 'https://salt.tikicdn.com/ts/tmp/fc/eb/9d/2aefe9d8ae1e711218349c054c3aea89.png' },
];

function Category() {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Danh mục sản phẩm</Text>
			</View>
			<VStack spacing={5} center m={SIZES.base}>
				<HStack spacing={5}>
					{categories.slice(0, 4).map((category, index) => (
						<TouchableOpacity key={index} style={styles.square}>
							<ImageBackground
								source={{ uri: category.image }}
								style={styles.imageBackground}
								imageStyle={{ borderRadius: SIZES.base }}
							>
								<View style={styles.textContainer}>
									<Text style={styles.category}>{category.title}</Text>
								</View>
							</ImageBackground>
						</TouchableOpacity>
					))}
				</HStack>
				<HStack spacing={5}>
					{categories.slice(4, 8).map((category, index) => (
						<TouchableOpacity key={index} style={styles.square}>
							<ImageBackground
								source={{ uri: category.image }}
								style={styles.imageBackground}
								imageStyle={{ borderRadius: SIZES.base }}
							>
								<View style={styles.textContainer}>
									<Text style={styles.category}>{category.title}</Text>
								</View>
							</ImageBackground>
						</TouchableOpacity>
					))}
				</HStack>
			</VStack>
		</View>
	);
}

export default Category;
