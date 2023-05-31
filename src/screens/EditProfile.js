import {
	View, Text, TouchableOpacity, Image, TextInput, StyleSheet, SafeAreaView,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import { AuthContext } from '../context/AuthContext';
import { COLORS, FONTS, SIZES } from '../constants';

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: COLORS.primary,
		padding: 20,
	},
	backButton: {
		position: 'absolute',
		left: 20,
		top: 10,
		padding: 10,
		backgroundColor: COLORS.white,
		borderRadius: 10,
	},
	headerTitle: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.medium,
		color: COLORS.white,
		marginLeft: 12,
	},
	avatar: {
		height: 170,
		width: 170,
		borderRadius: 85,
		borderWidth: 2,
		borderColor: COLORS.primary,
	},
	cameraIcon: {
		position: 'absolute',
		bottom: 0,
		right: 10,
		zIndex: 9999,
	},
	inputField: {
		flexDirection: 'column',
		marginBottom: SIZES.base,
	},
	inputTitle: {
		fontFamily: FONTS.bold,
		color: COLORS.primary,
	},
	textInputContainer: {
		height: 44,
		width: '100%',
		borderColor: COLORS.lightGray,
		borderWidth: 1,
		borderRadius: 4,
		paddingHorizontal: 12,
		paddingVertical: 6,
		justifyContent: 'center',
	},
	saveButton: {
		backgroundColor: COLORS.primary,
		height: 44,
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: SIZES.extraLarge,
	},
});

function EditProfile({ navigation }) {
	const {
		userInfo,
	} = useContext(AuthContext);

	const [selectedImage, setSelectedImage] = useState(userInfo.image);
	const [email, setEmail] = useState(userInfo.email);
	const [firstName, setFirstName] = useState(userInfo.firstName);
	const [lastName, setLastName] = useState(userInfo.lastName);

	// This function is triggered when the avatar is pressed
	const handleImageSelection = async () => {
		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
		}
	};

	return (
		// eslint-disable-next-line react/self-closing-comp
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.backButton}
				>
					<MaterialIcons
						name="keyboard-arrow-left"
						size={24}
						color={COLORS.primary}
					/>
				</TouchableOpacity>

				<Text style={styles.headerTitle}>
					Chỉnh sửa hồ sơ cá nhân
				</Text>
			</View>

			<ScrollView>
				<View style={{ alignItems: 'center', marginVertical: 22 }}>
					<TouchableOpacity onPress={handleImageSelection}>
						<Image
							source={{ uri: selectedImage }}
							style={styles.avatar}
						/>

						<View style={styles.cameraIcon}>
							<MaterialIcons
								name="photo-camera"
								size={32}
								color={COLORS.primary}
							/>
						</View>
					</TouchableOpacity>
				</View>

				<View style={{ marginHorizontal: 22 }}>
					<View style={styles.inputField}>
						<Text style={styles.inputTitle}>Họ và tên đệm:</Text>
						<View style={styles.textInputContainer}>
							<TextInput
								value={lastName}
								onChangeText={(text) => setLastName(text)}
								color={COLORS.black}
								editable
							/>
						</View>
					</View>

					<View style={styles.inputField}>
						<Text style={styles.inputTitle}>Tên của bạn:</Text>
						<View style={styles.textInputContainer}>
							<TextInput
								value={firstName}
								onChangeText={(text) => setFirstName(text)}
								color={COLORS.black}
								editable
							/>
						</View>
					</View>

					<View style={styles.inputField}>
						<Text style={styles.inputTitle}>Email</Text>
						<View style={styles.textInputContainer}>
							<TextInput
								value={email}
								onChangeText={(text) => setEmail(text)}
								color={COLORS.black}
								editable
							/>
						</View>
					</View>

					<TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
						<Text style={{ color: COLORS.white }}>
							Lưu thay đổi
						</Text>
					</TouchableOpacity>

				</View>

			</ScrollView>
		</SafeAreaView>
	);
}

export default EditProfile;
