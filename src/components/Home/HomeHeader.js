import {
	View, Text, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import {
	COLORS, FONTS, SIZES, assets,
} from '../../constants';

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.primary,
		padding: SIZES.font,
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
	avatar: {
		width: '100%',
		height: '100%',
		borderRadius: 60,
		borderColor: COLORS.white,
		borderWidth: 1,
		backgroundColor: COLORS.white,
	},
});

function HomeHeader({ onSearch, onPicture }) {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={{ marginVertical: SIZES.font }}>
					<Text style={styles.greeting}>
						EFISS
					</Text>
					<Text
						style={{
							fontFamily: FONTS.bold,
							fontSize: SIZES.large,
							color: COLORS.white,
							marginTop: SIZES.base / 2,
						}}
					>
						Let’s Fashion Talks!
					</Text>
				</View>
			</View>

			<View style={{ marginTop: SIZES.font }}>
				<View style={{
					width: '100%',
					borderRadius: SIZES.extraLarge,
					backgroundColor: COLORS.white,
					flexDirection: 'row',
					paddingHorizontal: SIZES.font,
					paddingVertical: SIZES.font,
				}}
				>
					<TouchableOpacity onPress={onSearch}>
						<Image
							source={assets.search}
							resizeMode="contain"
							style={{
								width: 25,
								height: 25,
								marginRight: SIZES.base / 2,
							}}
						/>
					</TouchableOpacity>
					<TextInput
						placeholder="Bạn đang tìm kiếm sản phẩm gì?"
						style={{ flex: 1, marginLeft: SIZES.base / 2, color: COLORS.gray }}
						onChangeText={() => { }}
					/>
					<TouchableOpacity onPress={onPicture}>
						<Image
							source={assets.camera}
							resizeMode="contain"
							style={{
								width: 25,
								height: 25,
								marginRight: SIZES.base / 2,
							}}
						/>
					</TouchableOpacity>
				</View>
			</View>

		</View>
	);
}

export default HomeHeader;
