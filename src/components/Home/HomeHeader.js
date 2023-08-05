import {
	View, Text, Image, TouchableOpacity, StyleSheet, ToastAndroid,
} from 'react-native';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { HStack, IconButton } from '@react-native-material/core';
import { Entypo } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

import {
	COLORS, FONTS, SIZES, assets,
} from '../../constants';

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
		fontFamily: FONTS.semiBold,
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
	loginBtn: {
		color: COLORS.primary,
		fontFamily: FONTS.semiBold,
	},
});

function HomeHeader({
	onPicture, onLogin, onProfile, navigation,
}) {
	const userSignin = useSelector((state) => state.userSignin);
	const { userToken } = userSignin;

	const [text, setText] = useState('');

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={{ marginTop: SIZES.font }}>
					<Text style={styles.motto}>
						EFISS
					</Text>
				</View>
				<View style={{ marginTop: SIZES.font }}>
					{userToken ? (
						<HStack spacing={6}>
							<IconButton onPress={onProfile} icon={<Entypo name="v-card" size={SIZES.extraLarge} color={COLORS.primary} />} />
						</HStack>
					) : (
						<TouchableOpacity onPress={onLogin}>
							<Text style={styles.loginBtn}>Đăng nhập</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>

			<View style={{ marginTop: SIZES.font }}>
				<View style={styles.searchContainer}>
					<TouchableOpacity onPress={() => {
						if (text && text.length > 0) {
							navigation.navigate('TextResults', { query: text });
						} else {
							ToastAndroid.showWithGravity(
								'Vui lòng nhập từ khóa',
								ToastAndroid.SHORT,
								ToastAndroid.BOTTOM,
							);
						}
					}}
					>
						<Image
							source={assets.search}
							resizeMode="contain"
							style={styles.btnIcon}
						/>
					</TouchableOpacity>
					<TextInput
						placeholder="Bạn đang tìm kiếm sản phẩm gì?"
						style={styles.textInput}
						value={text}
						onChangeText={(value) => setText(value)}
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
