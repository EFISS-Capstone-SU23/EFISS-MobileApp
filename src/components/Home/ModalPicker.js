import React from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	ToastAndroid,
	PermissionsAndroid,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from 'react-native';
import { Button } from '@react-native-material/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@rneui/themed';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as ImagePicker from 'react-native-image-crop-picker';

import { COLORS, SHADOWS, SIZES } from '../../constants';
import { checkImageSize } from '../../utils/utils';

const OPTIONS = [
	{
		id: 1,
		action: 'Chụp Ảnh',
	},
	{
		id: 2,
		action: 'Chọn Từ Thư Viện',
	},
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(52, 52, 52, 0.6)',
	},
	modal: {
		backgroundColor: COLORS.white,
		paddingVertical: SIZES.medium,
		paddingHorizontal: 30,
		justifyContent: 'space-between',
		flexDirection: 'column',
		borderRadius: 5,
		...SHADOWS.medium,
	},
	closeButton: {
		position: 'absolute',
		top: 2,
		right: 2,
		zIndex: 1, // To make the button appear above the modal content
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
				title: 'Quyền truy cập thư viện ảnh',
				message: 'EFISS cần truy cập thư viện ảnh của bạn',
				buttonPositive: 'OK',
			},
		);

		if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
			ToastAndroid.show(
				'Không thể truy cập thư viện ảnh. Vào Cài đặt để cấp quyền',
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

function ModalPicker({ changeModalVisibility, navigation }) {
	const showImagePicker = async () => {
		const hasStoragePermission = await checkPickerPermission();

		if (!hasStoragePermission) {
			return;
		}

		try {
			const selectedImage = await ImagePicker.openPicker({
				mediaType: 'photo',
			});
			if (checkImageSize(selectedImage?.width, selectedImage?.height)) {
				const image = await ImagePicker.openCropper({
					path: selectedImage.path,
					includeBase64: true,
					cropperToolbarTitle: 'Cắt ảnh',
				});
				navigation.navigate('Results', { imageUrl: image.data });
			} else {
				ToastAndroid.show('Vui lòng chọn ảnh có kích thước tối đa dưới 5MB.', ToastAndroid.LONG);
			}
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
		changeModalVisibility(false);
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
				uppercase={false}
				titleStyle={{
					color: COLORS.white,
					letterSpacing: 2,
				}}
			/>
		</View>
	));

	const closeModal = () => {
		changeModalVisibility(false);
	};

	return (
		<TouchableWithoutFeedback onPress={closeModal}>
			<SafeAreaView style={styles.container}>
				<View style={styles.modal}>
					<TouchableOpacity onPress={closeModal} style={styles.closeButton}>
						<Icon
							name="close-outline"
							type="ionicon"
							size={28}
						/>
					</TouchableOpacity>
					{option}
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

export default ModalPicker;
