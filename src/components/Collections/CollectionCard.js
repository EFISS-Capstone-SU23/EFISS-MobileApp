import {
	View, TouchableOpacity, Text, StyleSheet,
	ImageBackground, Alert, TouchableWithoutFeedback,
} from 'react-native';
import { IconButton } from '@react-native-material/core';
import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
	COLORS, SHADOWS, FONTS, SIZES,
} from '../../constants';
import { collectionsRemove } from '../../actions/productActions';
import ModalUpdateCollection from './ModalUpdateCollection';

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
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'transparent',
	},
});

function CollectionCard({ navigation, collection }) {
	const dispatch = useDispatch();

	const [dropdownOpen, setDropdownOpen] = useState(false);

	const handleToggleDropdown = () => {
		setDropdownOpen((prevState) => !prevState);
	};

	const handleOverlayPress = () => {
		setDropdownOpen(false);
	};

	const [updateModalOpen, setUpdateModalOpen] = useState(false);

	const handleUpdateModalOpen = () => {
		setUpdateModalOpen((prevState) => !prevState);
	};

	return (
		<TouchableOpacity
			style={styles.square}
			onPress={() => navigation.navigate('CollectionDetails', { id: collection.id })}
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
						{collection.name}
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
				<>
					<TouchableWithoutFeedback onPress={handleOverlayPress}>
						<View style={styles.overlay} />
					</TouchableWithoutFeedback>

					<View style={styles.dropdownContainer}>
						<TouchableOpacity
							style={styles.dropdownItem}
							onPress={() => {
								handleToggleDropdown();
								handleUpdateModalOpen();
							}}
						>
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
										{ text: 'Đúng', onPress: () => dispatch(collectionsRemove(collection.id)) },
										{ text: 'Không', style: 'cancel' },
									],
								);
							}}
						>
							<Text style={[styles.dropdownText, { color: COLORS.red }]}>Xóa BST</Text>
						</TouchableOpacity>
					</View>
				</>
			)}

			{updateModalOpen && (
				<ModalUpdateCollection
					name={collection.name}
					id={collection.id}
					onClose={handleUpdateModalOpen}
				/>
			)}
		</TouchableOpacity>
	);
}

export default CollectionCard;
