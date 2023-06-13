import {
	View, Text, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import React, { useContext } from 'react';
import { HStack, IconButton } from '@react-native-material/core';
import { Entypo } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

import {
	COLORS, FONTS, SIZES, assets,
} from '../../constants';
import { AuthContext } from '../../context/AuthContext';

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.white,
		paddingHorizontal: SIZES.font,
		paddingBottom: SIZES.font,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	greeting: {
		fontFamily: FONTS.regular,
		fontSize: SIZES.small,
		color: COLORS.white,
	},
	motto: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.large * 2,
		color: COLORS.primary,
	},
	avatar: {
		width: '100%',
		height: '100%',
		borderRadius: 60,
		borderColor: COLORS.white,
		borderWidth: 1,
		backgroundColor: COLORS.white,
	},
	searchContainer: {
		width: '100%',
		borderWidth: 1,
		borderRadius: SIZES.base,
		backgroundColor: COLORS.white,
		flexDirection: 'row',
		paddingHorizontal: SIZES.font,
		paddingVertical: SIZES.font,
	},
	btnIcon: {
		width: 25,
		height: 25,
		marginRight: SIZES.base / 2,
	},
	textInput: {
		flex: 1,
		marginLeft: SIZES.base / 2,
		color: COLORS.gray,
	},
});

function HomeHeader({
	onSearch, onPicture, onWishlist,
}) {
	const {
		userToken,
	} = useContext(AuthContext);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={{ marginTop: SIZES.font }}>
					<Text style={styles.motto}>
						EFISS
					</Text>
				</View>
				<View style={{ marginTop: SIZES.font }}>
					<HStack spacing={6}>
						{userToken && (
							<IconButton onPress={onWishlist} icon={<Entypo name="heart" size={SIZES.extraLarge} color={COLORS.black} />} />
						)}
						<IconButton icon={<Entypo name="bell" size={SIZES.extraLarge} color={COLORS.black} />} />
						<IconButton icon={<Entypo name="back-in-time" size={SIZES.extraLarge} color={COLORS.black} />} />
					</HStack>
				</View>
			</View>

			<View style={{ marginTop: SIZES.font }}>
				<View style={styles.searchContainer}>
					<TouchableOpacity onPress={onSearch}>
						<Image
							source={assets.search}
							resizeMode="contain"
							style={styles.btnIcon}
						/>
					</TouchableOpacity>
					<TextInput
						placeholder="Bạn đang tìm kiếm sản phẩm gì?"
						style={styles.textInput}
						onChangeText={() => { }}
					/>
					<TouchableOpacity onPress={onPicture}>
						<Image
							source={assets.camera}
							resizeMode="contain"
							style={styles.btnIcon}
						/>
					</TouchableOpacity>
				</View>
			</View>

		</View>
	);
}

export default HomeHeader;
