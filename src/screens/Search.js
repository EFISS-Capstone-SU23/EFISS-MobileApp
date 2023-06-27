import React from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	ToastAndroid,
	PermissionsAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-native-material/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as ImagePicker from 'react-native-image-crop-picker';

import { COLORS, SIZES } from '../constants';

const OPTIONS = [
	{
		id: 1,
		action: 'Chụp ảnh',
	},
	{
		id: 2,
		action: 'Chọn ảnh từ thư viện',
	},
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal: {
		backgroundColor: COLORS.white,
		borderColor: COLORS.gray,
		borderWidth: 1,
		paddingVertical: SIZES.base,
		paddingHorizontal: SIZES.font,
		justifyContent: 'space-between',
		flexDirection: 'column',
	},
});

const checkCameraPermission = async () => {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.CAMERA,
			{
				title: 'Quyền truy cập camera',
				message: 'EFISS cần truy cập Camera của bạn',
				buttonPositive: 'OK',
			},
		);

		if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
			ToastAndroid.show(
				'Không thể truy cập Camera. Vào Cài đặt để cấp quyền',
				ToastAndroid.LONG,
			);
			return false;
		}

		return true;
	} catch (error) {
		ToastAndroid.showWithGravity(
			error.message,
			ToastAndroid.LONG,
			ToastAndroid.BOTTOM,
		);
		return false;
	}
};

const checkPickerPermission = async () => {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
			{
				title: 'Quyền truy kho ảnh',
				message: 'EFISS cần truy cập kho ảnh của bạn',
				buttonPositive: 'OK',
			},
		);

		if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
			ToastAndroid.show(
				'Không thể truy cập kho ảnh. Vào Cài đặt để cấp quyền',
				ToastAndroid.LONG,
			);
			return false;
		}

		return true;
	} catch (error) {
		ToastAndroid.showWithGravity(
			error.message,
			ToastAndroid.LONG,
			ToastAndroid.BOTTOM,
		);
		return false;
	}
};

function Search() {
	const navigation = useNavigation();

	const showImagePicker = async () => {
		const hasStoragePermission = await checkPickerPermission();

		if (!hasStoragePermission) {
			return;
		}

		try {
			const image = await ImagePicker.openPicker({
				cropping: true,
				enableRotationGesture: false,
				cropperCircleOverlay: false,
				cropperToolbarTitle: 'Cắt ảnh',
				includeBase64: true,
			});
			navigation.navigate('Results', { imageUrl: image.data });
		} catch (error) {
			ToastAndroid.showWithGravity(
				error.message,
				ToastAndroid.LONG,
				ToastAndroid.BOTTOM,
			);
		}
	};

	const takePicture = async () => {
		const hasCameraPermission = await checkCameraPermission();

		if (!hasCameraPermission) {
			return;
		}

		try {
			const image = await ImagePicker.openCamera({
				cropping: true,
				enableRotationGesture: false,
				cropperCircleOverlay: false,
				cropperToolbarTitle: 'Cắt ảnh',
				includeBase64: true,
			});
			navigation.navigate('Results', { imageUrl: image.data });
		} catch (error) {
			ToastAndroid.showWithGravity(
				error.message,
				ToastAndroid.LONG,
				ToastAndroid.BOTTOM,
			);
		}
	};

	const onPressItem = (option) => {
		switch (option) {
		case 1:
			takePicture();
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
				titleStyle={{
					color: COLORS.white,
				}}
			/>
		</View>
	));

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.modal}>{option}</View>
		</SafeAreaView>
	);
}

export default Search;