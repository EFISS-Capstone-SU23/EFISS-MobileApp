import React, { useEffect, useContext } from 'react';
import {
	View, Text, SafeAreaView, StyleSheet, ActivityIndicator, FlatList, StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { COLORS, SIZES, FONTS } from '../constants';
import { WishlistHeader, ProductCard } from '../components';
import { wishlistLoad } from '../actions/productActions';
import { AuthContext } from '../context/AuthContext';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	footer: {
		textAlign: 'center',
		fontFamily: FONTS.bold,
		color: COLORS.primary,
		marginTop: SIZES.medium,
	},
});

function Wishlist({ navigation }) {
	const dispatch = useDispatch();
	const { userToken } = useContext(AuthContext);
	const loadWishlist = useSelector((state) => state.loadWishlist);
	const { loading, error, products } = loadWishlist;
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			dispatch(wishlistLoad(userToken));
		}
	}, [dispatch, isFocused]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor={COLORS.primary} />
			<View
				style={{
					flex: 1,
					justifyContent: 'space-between',
					width: '100%',
				}}
			>
				{loading ? (
					<ActivityIndicator style={styles.container} size="large" colors={COLORS.primary} />
				) : error ? (
					<Text>Something went wrong</Text>
				) : (
					<FlatList
						data={products}
						renderItem={({ item }) => (
							<ProductCard product={item} navigation={navigation} />
						)}
						numColumns={2}
						keyExtractor={(item) => item?._id}
						contentContainerStyle={{ columnGap: SIZES.medium }}
						ListHeaderComponent={<WishlistHeader navigation={navigation} />}
						ListFooterComponent={<Text style={styles.footer}>Không còn kết quả nào khác</Text>}
						stickyHeaderIndices={[0]}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</View>
		</SafeAreaView>
	);
}

export default Wishlist;
