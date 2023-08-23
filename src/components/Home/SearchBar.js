import {
	View, Text, TouchableOpacity, TextInput,
	StyleSheet, ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@rneui/themed';

import {
	COLORS, FONTS, SHADOWS,
} from '../../constants';

const styles = StyleSheet.create({
	headerTitle: {
		color: COLORS.secondary,
		fontFamily: FONTS.regular,
		fontSize: 23,
		maxWidth: '80%',
	},
	inputContainer: {
		height: 60,
		width: '100%',
		backgroundColor: COLORS.white,
		borderRadius: 10,
		position: 'absolute',
		top: 90,
		flexDirection: 'row',
		paddingHorizontal: 20,
		alignItems: 'center',
		...SHADOWS.dark,
	},
	btnIcon: {
		width: 25,
		height: 25,
	},
});

function SearchBar({ onPicture, navigation }) {
	const [text, setText] = useState('');

	const handleSubmit = () => {
		if (text && text.length > 0) {
			navigation.navigate('TextResults', { query: text });
		} else {
			ToastAndroid.showWithGravity(
				'Vui lòng nhập từ khóa',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
		}
		setText('');
	};

	return (
		<View style={{ backgroundColor: COLORS.primary, height: 120, paddingHorizontal: 20 }}>
			<View style={{ flex: 1 }}>
				<Text style={styles.headerTitle}>Discover Style at the Speed of Light with EFISS!</Text>
				<View style={styles.inputContainer}>
					<TouchableOpacity onPress={handleSubmit}>
						<Icon
							name="search-outline"
							type="ionicon"
							size={28}
							color={COLORS.secondary}
						/>
					</TouchableOpacity>

					<TextInput
						placeholder="Bạn đang tìm kiếm sản phẩm gì?"
						style={{ flex: 1, marginHorizontal: 5, color: COLORS.secondary }}
						value={text}
						onChangeText={(value) => setText(value)}
						onSubmitEditing={handleSubmit}
					/>

					<TouchableOpacity onPress={onPicture}>
						<Icon
							name="camera-outline"
							type="ionicon"
							size={28}
							color={COLORS.secondary}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

export default SearchBar;
