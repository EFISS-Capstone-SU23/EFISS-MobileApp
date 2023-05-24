import React, { useState } from 'react';
import {
	View, Text, StyleSheet,
	SafeAreaView, Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import { COLORS, FONTS, SIZES } from '../../constants';

const OPTIONS = [
	{
		id: 1,
		action: 'Chụp ảnh',
	},
	{
		id: 2,
		action: 'Chọn ảnh từ thư viện',
	},
	{
		id: 3,
		action: 'Quay lại',
	},
];

function ModalPicker({ changeModalVisibility, navigation }) {
	const [image, setImage] = useState(null);

	// This function is triggered when the "Select an image" button pressed
	const showImagePicker = async () => {
		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			quality: 1,
			base64: true,
		});

		if (!result.canceled) {
			setImage(result.assets[0].base64);

			navigation.navigate('Results', { imageUrl: result.assets[0].base64 });
		}
	};

	const onPressItem = (option) => {
		changeModalVisibility(false);
		switch (option) {
		case 1:
			navigation.navigate('TakePicture');
			break;
		case 2:
			showImagePicker();
			break;
		default:
			break;
		}
	};

	const option = OPTIONS.map((item, index) => (
		<View
			style={{
				margin: SIZES.base,
			}}
			key={index}
		>
			<Button
				onPress={() => onPressItem(item.id)}
				color={COLORS.primary}
				style={styles.option}
				title={item.action}
			/>
		</View>
	));

	return (
		<SafeAreaView
			style={styles.container}
		>
			<View style={styles.modal}>
				{option}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal: {
		backgroundColor: COLORS.white,
		borderRadius: 10,
		borderColor: COLORS.gray,
		borderWidth: 1,
		paddingVertical: SIZES.base,
		paddingHorizontal: SIZES.font,
		justifyContent: 'space-between', // Space between vertically
		flexDirection: 'column', // Optional: Default is column
	},
});

export default ModalPicker;
