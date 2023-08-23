import {
	View, Text, StyleSheet, TouchableOpacity, ImageBackground,
} from 'react-native';
import React from 'react';

import {
	COLORS, SHADOWS, SIZES, FONTS,
} from '../../constants';

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginHorizontal: SIZES.base,
		marginVertical: SIZES.medium,
	},
	headerTitle: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.extraLarge,
		color: COLORS.black,
	},
	categoryContainer: {
		marginHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	square: {
		width: '25%',
		aspectRatio: 1,
		backgroundColor: COLORS.primary,
		borderRadius: SIZES.base,
		...SHADOWS.light,
		marginHorizontal: 3,
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
});

const categories = [
	{ title: 'Quần jeans', image: 'https://sc04.alicdn.com/kf/HTB1ejCGb1UXBuNjt_a0q6AysXXao.jpg' },
	{ title: 'Áo sơ mi', image: 'https://product.hstatic.net/200000074827/product/pocketearth.jpg_d3b2677797ce4446ad770035d7110dbe_master.jpg' },
	{ title: 'T-Shirt', image: 'https://pyxis.nymag.com/v1/imgs/657/8a8/c1104839c662b60d6690c67c0ed50219ff-bic-black-tshirts.rsquare.w1200.jpg' },
	{ title: 'Váy-đầm', image: 'https://product.hstatic.net/1000304367/product/_dsc0368-3_5b4f7ce86ae94ed09ef3afd1c0fc33cd_master.jpg' },
];

function Category() {
	return (
		<>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Danh mục sản phẩm</Text>
			</View>
			<View style={styles.categoryContainer}>
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
			</View>
		</>
	);
}

export default Category;
