import {
	View, TouchableOpacity, Text, StyleSheet,
	ImageBackground, Alert,
} from 'react-native';
import { IconButton } from '@react-native-material/core';
import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';

import {
	COLORS, SHADOWS, FONTS, SIZES,
} from '../../constants';

const styles = StyleSheet.create({
	square: {
		width: '47%',
		margin: 5,
		aspectRatio: 1,
		backgroundColor: COLORS.primary,
		borderRadius: SIZES.base,
		...SHADOWS.light,
	},
	textContainer: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		backgroundColor: 'rgba(52, 52, 52, 0.6)',
	},
	category: {
		textAlign: 'center',
		color: COLORS.white,
		fontFamily: FONTS.light,
		fontSize: SIZES.large,
		marginHorizontal: 5,
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
	optionContainer: {
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: 1,
	},
	dropdownContainer: {
		position: 'absolute',
		width: '90%',
		top: 50, // Adjust the position as needed
		right: 10, // Adjust the position as needed
		backgroundColor: COLORS.white,
		borderRadius: 8,
		padding: 10,
		elevation: 3,
	},
	dropdownItem: {
		paddingVertical: SIZES.base,
		paddingHorizontal: 2,
	},
	dropdownText: {
		fontFamily: FONTS.regular,
		fontSize: SIZES.medium,
	},
});

function CollectionCard({ navigation }) {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const handleToggleDropdown = () => {
		setDropdownOpen((prevState) => !prevState);
	};

	return (
		<TouchableOpacity
			style={styles.square}
			onPress={() => navigation.navigate('CollectionDetails')}
			disabled={dropdownOpen}
		>
			<ImageBackground
				source={{ uri: 'https://t3.ftcdn.net/jpg/01/38/94/62/360_F_138946263_EtW7xPuHRJSfyl4rU2WeWmApJFYM0B84.jpg' }}
				style={styles.imageBackground}
				imageStyle={{ borderRadius: SIZES.base }}
			>
				<View style={styles.textContainer}>
					<Text
						style={styles.category}
						numberOfLines={3}
					>
						Collection Name
					</Text>
				</View>
				<View style={styles.optionContainer}>
					<IconButton
						icon={(
							<Entypo
								name="dots-three-vertical"
								size={18}
								color={COLORS.white}
							/>
						)}
						contentContainerStyle={{
							opacity: 0.8,
						}}
						onPress={handleToggleDropdown}
					/>
				</View>
			</ImageBackground>

			{dropdownOpen && (
				<View style={styles.dropdownContainer}>
					<TouchableOpacity style={styles.dropdownItem}>
						<Text style={styles.dropdownText}>Đổi tên BST</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.dropdownItem}
						onPress={() => {
							handleToggleDropdown();
							Alert.alert(
								'Cảnh báo',
								'Bạn muốn xóa bộ sưu tập này?',
								[
									{ text: 'Đúng', onPress: () => console.log('Delete') },
									{ text: 'Không', style: 'cancel', onPress: () => console.log('Cancel Delete') },
								],
							);
						}}
					>
						<Text style={[styles.dropdownText, { color: COLORS.red }]}>Xóa BST</Text>
					</TouchableOpacity>
				</View>
			)}
		</TouchableOpacity>
	);
}

export default CollectionCard;
