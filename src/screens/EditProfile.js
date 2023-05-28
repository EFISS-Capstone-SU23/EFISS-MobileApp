import {
	View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Modal,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';

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
	datePickerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	datePicker: {
		margin: 20,
		backgroundColor: COLORS.primary,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
		padding: 35,
		width: '90%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	closeButton: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.white,
		padding: 5,
	},
	saveButton: {
		backgroundColor: COLORS.primary,
		height: 44,
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

function EditProfile({ navigation }) {
	const [selectedImage, setSelectedImage] = useState('https://tinhdaunhuy.com/wp-content/uploads/2015/08/default-avatar.jpg');
	const [name, setName] = useState('John Doe');
	const [email, setEmail] = useState('johndoe@gmail.com');
	const [phone, setPhone] = useState('0963487538');
	const [password, setPassword] = useState('iachay567');
	const [birthday, setBirthday] = useState('2001/02/05');

	const [openDatePicker, setOpenDatePicker] = useState(false);

	// set the last date selection allowed on the datepicker is today.
	const today = new Date();
	const lastDateAllowed = getFormatedDate(
		today.setDate(today.getDate() + 1),
		'YYYY/MM/DD',
	);

	// This function opens/closes the datepicker
	const handleOnPressDatePicker = () => {
		setOpenDatePicker(!openDatePicker);
	};

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

	// This function render the datepicker layout
	function renderDatePicker() {
		// Show the date picker
		return (
			<Modal
				animationType="slide"
				transparent
				visible={openDatePicker}
			>
				<View style={styles.datePickerContainer}>
					<View style={styles.datePicker}>
						<DatePicker
							mode="calendar"
							maximumDate={lastDateAllowed}
							selected={birthday}
							current={birthday}
							onSelectedChange={(date) => setBirthday(date)}
							options={{
								backgroundColor: COLORS.primary,
								textHeaderColor: COLORS.white,
								textDefaultColor: COLORS.white,
								selectedTextColor: COLORS.primary,
								mainColor: COLORS.white,
								textSecondaryColor: COLORS.white,
								borderColor: 'rgba(122,146,165,0.1)',
							}}
						/>

						<TouchableOpacity
							onPress={handleOnPressDatePicker}
							style={styles.closeButton}
						>
							<Text style={{ color: COLORS.white }}>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}

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
						<Text style={styles.inputTitle}>Tên người dùng</Text>
						<View style={styles.textInputContainer}>
							<TextInput
								value={name}
								onChangeText={(text) => setName(text)}
								color={COLORS.primary}
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
								color={COLORS.primary}
								editable
							/>
						</View>
					</View>

					<View style={styles.inputField}>
						<Text style={styles.inputTitle}>Ngày sinh</Text>
						<TouchableOpacity
							onPress={handleOnPressDatePicker}
							style={styles.textInputContainer}
						>
							<Text style={{ color: COLORS.primary }}>{birthday}</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.inputField}>
						<Text style={styles.inputTitle}>Số điện thoại</Text>
						<View style={styles.textInputContainer}>
							<TextInput
								value={phone}
								onChangeText={(text) => setPhone(text)}
								color={COLORS.primary}
								editable
							/>
						</View>
					</View>

					<View style={styles.inputField}>
						<Text style={styles.inputTitle}>Mật khẩu</Text>
						<View style={styles.textInputContainer}>
							<TextInput
								value={password}
								onChangeText={(text) => setPassword(text)}
								color={COLORS.primary}
								editable
								secureTextEntry
							/>
						</View>
					</View>

					<TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
						<Text style={{ color: COLORS.white }}>
							Lưu thay đổi
						</Text>
					</TouchableOpacity>

					{renderDatePicker()}

				</View>

			</ScrollView>
		</SafeAreaView>
	);
}

export default EditProfile;
