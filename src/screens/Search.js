import React from 'react';
import {
	StyleSheet,
	SafeAreaView,
	ToastAndroid,
	PermissionsAndroid,
	Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
	Pressable, AppBar, VStack, Divider,
} from '@react-native-material/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as ImagePicker from 'react-native-image-crop-picker';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@rneui/themed';

import { COLORS, FONTS, SIZES } from '../constants';
import { checkImageSize } from '../utils/utils';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	header: {
		backgroundColor: COLORS.primary,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	button: {
		aspectRatio: 1,
		width: '40%',
		backgroundColor: COLORS.primary,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: SIZES.base,
	},
	buttonTitle: {
		textAlign: 'center',
		marginTop: SIZES.base,
		fontFamily: FONTS.regular,
		fontSize: SIZES.font,
	},
	connector: {
		fontFamily: FONTS.regular,
		color: COLORS.black,
		fontSize: SIZES.extraLarge,
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

function Search() {
	const navigation = useNavigation();

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

	return (
		<SafeAreaView style={styles.container}>
			<AppBar
				title="Tìm kiếm bằng hình ảnh"
				style={styles.header}
				titleStyle={{
					color: COLORS.secondary,
					textAlign: 'center',
					fontFamily: FONTS.medium,
				}}
			/>
			<VStack fill m={4} spacing={6} center>
				<VStack w="100%" center>
					<Pressable style={styles.button} onPress={takePicture}>
						<Icon
							name="camera-outline"
							type="ionicon"
							size={36}
							color={COLORS.secondary}
						/>
					</Pressable>
					<Text style={styles.buttonTitle}>Chụp ảnh</Text>
				</VStack>
				<Divider style={{ marginTop: SIZES.large }} leadingInset={16} />
				<Text style={styles.connector}>Hoặc</Text>
				<Divider style={{ marginTop: SIZES.large }} leadingInset={16} />
				<VStack w="100%" center>
					<Pressable style={styles.button} onPress={showImagePicker}>
						<Icon
							name="images-outline"
							type="ionicon"
							size={36}
							color={COLORS.secondary}
						/>
					</Pressable>
					<Text style={styles.buttonTitle}>Chọn từ thư viện</Text>
				</VStack>
			</VStack>
		</SafeAreaView>
	);
}

export default Search;
